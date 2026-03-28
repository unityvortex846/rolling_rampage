import type { AuraDefinition, GameState, Rarity } from '../types'
import { AURAS_BY_TIER } from '../data/auras'
import { RARITIES_DESC } from '../data/rarities'

/**
 * Compute the effective luck multiplier for the current state.
 * Combines the base permanent multiplier with all active potions.
 */
export function getEffectiveLuck(state: GameState): number {
  return state.activePotions.reduce(
    (acc, potion) => acc * potion.luckMultiplier,
    state.luckMultiplier
  )
}

/**
 * Pick a random aura from the given tier's pool.
 */
function pickFromTier(tier: string): AuraDefinition {
  const pool = AURAS_BY_TIER[tier] ?? []
  if (pool.length === 0) throw new Error(`No auras defined for tier: ${tier}`)
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Roll for an aura given an effective luck multiplier.
 *
 * Algorithm:
 *   Iterate rarities from rarest → most common.
 *   For each tier T with 1-in-N chance:
 *     probability = min(1, effectiveLuck / N)
 *     if random() < probability → award this tier
 *   Common is always the final fallback.
 */
export function rollAura(effectiveLuck: number): AuraDefinition {
  for (const rarity of RARITIES_DESC) {
    const probability = Math.min(1, effectiveLuck / rarity.chance)
    if (Math.random() < probability) {
      return pickFromTier(rarity.tier)
    }
  }
  // Should never reach here since Common probability approaches 1,
  // but fall back to Common just in case.
  return pickFromTier('Common')
}

/**
 * Decrement rolls remaining on active potions and remove depleted ones.
 * Returns the updated potions array.
 */
export function consumePotionRoll(state: GameState): GameState['activePotions'] {
  return state.activePotions
    .map((p) => ({ ...p, rollsRemaining: p.rollsRemaining - 1 }))
    .filter((p) => p.rollsRemaining > 0)
}

/**
 * Get the stat bonus for a given rarity.
 * stat bonus = rarity.chance (1-in-2 = +2, 1-in-1M = +1,000,000)
 */
export function getStatBonus(rarity: Rarity): number {
  return rarity.chance
}
