import { useState } from 'react'
import { GAUNTLETS } from '../data/gauntlets'
import { RARITY_MAP } from '../data/rarities'

export function GauntletPanel() {
  const [toast, setToast] = useState<string | null>(null)

  function handleClick(name: string) {
    setToast(`${name} — Coming Soon!`)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 relative">
      <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Gauntlets</h2>

      <div className="flex flex-col gap-3">
        {GAUNTLETS.map((g) => (
          <button
            key={g.id}
            onClick={() => handleClick(g.name)}
            className="text-left bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-700 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">
                {g.name}
              </p>
              <span className="text-xs text-gray-500 bg-gray-900 rounded px-2 py-0.5">Locked</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
              {g.requiredAuras.map((req, i) => {
                const r = RARITY_MAP[req.tier]
                return (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 rounded-full ${r.bgClass} ${r.textClass}`}
                  >
                    {req.count}× {req.tier}
                  </span>
                )
              })}
            </div>

            <p className="text-gray-500 text-xs">Reward: {g.rewardDescription}</p>
          </button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-sm px-4 py-2 rounded-xl shadow-lg whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  )
}
