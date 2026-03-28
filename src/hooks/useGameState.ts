import { useState, useCallback } from 'react'
import type { GameState, OwnedAura } from '../types'
import { rollAura, getEffectiveLuck, consumePotionRoll } from '../utils/roll'
import { RARITY_MAP } from '../data/rarities'
import { BEGINNER_POTION } from '../data/potions'

const STORAGE_KEY = 'rolling_rampage_state'

function createInitialState(): GameState {
  return {
    inventory: [],
    totalStats: 0,
    luckMultiplier: 1,
    activePotions: [],
    potionInventory: [],
    totalRolls: 0,
    tutorialComplete: false,
    lastRolledAura: null,
  }
}

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    return JSON.parse(raw) as GameState
  } catch {
    return createInitialState()
  }
}

function saveState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function useGameState() {
  const [state, setState] = useState<GameState>(loadState)

  const persist = useCallback((next: GameState) => {
    saveState(next)
    setState(next)
  }, [])

  const roll = useCallback(() => {
    setState((prev) => {
      const effectiveLuck = getEffectiveLuck(prev)
      const auraDefinition = rollAura(effectiveLuck)
      const rarity = RARITY_MAP[auraDefinition.tier]
      const statBonus = rarity.chance

      const owned: OwnedAura = {
        definitionId: auraDefinition.id,
        rolledAt: Date.now(),
      }

      const next: GameState = {
        ...prev,
        inventory: [...prev.inventory, owned],
        totalStats: prev.totalStats + statBonus,
        totalRolls: prev.totalRolls + 1,
        lastRolledAura: owned,
        activePotions: consumePotionRoll(prev),
      }

      saveState(next)
      return next
    })
  }, [])

  const usePotion = useCallback(
    (potionId: string) => {
      setState((prev) => {
        const potion = prev.potionInventory.find((p) => p.id === potionId)
        if (!potion) return prev

        const next: GameState = {
          ...prev,
          potionInventory: prev.potionInventory.filter((p) => p.id !== potionId),
          activePotions: [...prev.activePotions, { ...potion }],
        }
        saveState(next)
        return next
      })
    },
    []
  )

  const completeTutorial = useCallback(() => {
    setState((prev) => {
      const next: GameState = {
        ...prev,
        tutorialComplete: true,
        potionInventory: [
          ...prev.potionInventory,
          { ...BEGINNER_POTION, id: `beginner-${Date.now()}` },
        ],
      }
      saveState(next)
      return next
    })
  }, [])

  const resetGame = useCallback(() => {
    const fresh = createInitialState()
    persist(fresh)
  }, [persist])

  return { state, roll, usePotion, completeTutorial, resetGame }
}
