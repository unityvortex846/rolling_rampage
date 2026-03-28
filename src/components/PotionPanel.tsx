import type { GameState } from '../types'

interface Props {
  state: GameState
  onUsePotion: (id: string) => void
}

function formatLuck(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`
  return `${n}`
}

export function PotionPanel({ state, onUsePotion }: Props) {
  if (state.potionInventory.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Potions</h2>
        <p className="text-gray-600 text-sm text-center py-4">No potions available.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Potions</h2>
      <div className="flex flex-col gap-2">
        {state.potionInventory.map((potion) => (
          <div
            key={potion.id}
            className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3"
          >
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-white font-semibold text-sm">{potion.name}</p>
              <p className="text-gray-400 text-xs truncate">{potion.description}</p>
              <p className="text-purple-300 text-xs mt-0.5">
                {formatLuck(potion.luckMultiplier)}× luck · {potion.rollsRemaining} roll{potion.rollsRemaining !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => onUsePotion(potion.id)}
              className="shrink-0 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              Use
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
