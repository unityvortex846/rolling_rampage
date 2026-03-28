import type { GameState } from '../types'
import { getEffectiveLuck } from '../utils/roll'

interface Props {
  state: GameState
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toLocaleString()
}

export function StatsPanel({ state }: Props) {
  const effectiveLuck = getEffectiveLuck(state)

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 flex flex-col gap-4">
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Stats</h2>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Total Stats" value={formatNumber(state.totalStats)} color="text-purple-400" />
        <Stat label="Total Rolls" value={state.totalRolls.toLocaleString()} color="text-blue-400" />
        <Stat label="Base Luck" value={`${state.luckMultiplier}×`} color="text-green-400" />
        <Stat label="Effective Luck" value={`${formatNumber(effectiveLuck)}×`} color="text-yellow-400" />
      </div>

      {state.activePotions.length > 0 && (
        <div className="mt-1">
          <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Active Potions</p>
          {state.activePotions.map((p, i) => (
            <div key={i} className="flex justify-between text-sm text-gray-300 py-1 border-b border-gray-800 last:border-0">
              <span>{p.name}</span>
              <span className="text-purple-300">{p.rollsRemaining} roll{p.rollsRemaining !== 1 ? 's' : ''} left</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-800 rounded-xl p-3">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
