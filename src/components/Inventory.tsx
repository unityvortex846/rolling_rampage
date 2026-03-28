import { useMemo } from 'react'
import type { GameState } from '../types'
import { AURA_MAP } from '../data/auras'
import { RARITY_MAP, RARITIES } from '../data/rarities'

interface Props {
  state: GameState
}

const TIER_ORDER = RARITIES.map((r) => r.tier).reverse() // rarest first

export function Inventory({ state }: Props) {
  const sorted = useMemo(() => {
    return [...state.inventory].sort((a, b) => {
      const tierA = TIER_ORDER.indexOf(AURA_MAP[a.definitionId]?.tier ?? 'Common')
      const tierB = TIER_ORDER.indexOf(AURA_MAP[b.definitionId]?.tier ?? 'Common')
      return tierA - tierB
    })
  }, [state.inventory])

  if (sorted.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Inventory</h2>
        <p className="text-gray-600 text-sm text-center py-6">No auras yet. Start rolling!</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
        Inventory <span className="text-gray-600 font-normal normal-case">({sorted.length})</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1">
        {sorted.map((owned, i) => {
          const def = AURA_MAP[owned.definitionId]
          const rarity = def ? RARITY_MAP[def.tier] : null
          if (!def || !rarity) return null
          return (
            <div
              key={i}
              className="rounded-xl p-2 border text-center"
              style={{
                borderColor: rarity.color + '55',
                background: `linear-gradient(135deg, rgba(0,0,0,0.6), ${rarity.color}11)`,
              }}
            >
              <span
                className={`text-xs font-bold ${rarity.textClass}`}
              >
                {rarity.label}
              </span>
              <p className="text-white text-xs font-semibold mt-0.5 leading-tight">{def.name}</p>
              <p className={`text-xs mt-0.5 ${rarity.textClass}`}>
                +{rarity.chance.toLocaleString()}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
