import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RARITIES } from '../data/rarities'
import { AuraEffect } from './AuraEffect'
import { rollAura } from '../utils/roll'
import { RARITY_MAP } from '../data/rarities'
import type { AuraDefinition, Rarity } from '../types'

interface Props {
  onComplete: () => void
}

export function TutorialModal({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [trialAura, setTrialAura] = useState<{ def: AuraDefinition; rarity: Rarity } | null>(null)

  function handleTrialRoll() {
    const def = rollAura(1)
    const rarity = RARITY_MAP[def.tier]
    setTrialAura({ def, rarity })
  }

  function handleFinish() {
    onComplete()
  }

  const steps = [
    <StepWelcome key="welcome" onNext={() => setStep(1)} />,
    <StepRarities key="rarities" onNext={() => setStep(2)} />,
    <StepTryRoll key="try" onRoll={handleTrialRoll} result={trialAura} onFinish={handleFinish} />,
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl"
        >
          <div className="flex gap-1 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-purple-500' : 'bg-gray-700'}`}
              />
            ))}
          </div>
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <div className="text-5xl mb-4">⚡</div>
      <h1 className="text-3xl font-extrabold text-white mb-3">Welcome to Rolling Rampage</h1>
      <p className="text-gray-400 mb-6">
        Roll to collect auras of increasing rarity. The rarer the aura, the cooler the effect — and the bigger your stat boost.
      </p>
      <button
        onClick={onNext}
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl transition-colors w-full"
      >
        Let's Go
      </button>
    </div>
  )
}

function StepRarities({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">The Rarity Tiers</h2>
      <div className="space-y-1.5 mb-6 max-h-72 overflow-y-auto">
        {RARITIES.map((r) => (
          <div
            key={r.tier}
            className="flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: `${r.color}15`, borderLeft: `3px solid ${r.color}` }}
          >
            <span className={`font-bold text-sm ${r.textClass}`}>{r.label}</span>
            <span className="text-gray-400 text-xs">
              1-in-{r.chance.toLocaleString()} · +{r.chance.toLocaleString()} stats
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={onNext}
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 rounded-xl transition-colors w-full"
      >
        Got It
      </button>
    </div>
  )
}

function StepTryRoll({
  onRoll,
  result,
  onFinish,
}: {
  onRoll: () => void
  result: { def: AuraDefinition; rarity: Rarity } | null
  onFinish: () => void
}) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-white mb-2">Try Your First Roll</h2>
      <p className="text-gray-400 text-sm mb-6">Hit the button to roll a practice aura.</p>

      {!result ? (
        <button
          onClick={onRoll}
          className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-10 py-4 rounded-2xl text-xl transition-colors mb-6 w-full"
        >
          ROLL
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3 mb-6">
          <AuraEffect rarity={result.rarity} size={80} />
          <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${result.rarity.bgClass} ${result.rarity.textClass}`}>
            {result.rarity.label}
          </span>
          <p className="text-white font-bold text-lg">{result.def.name}</p>
          <p className="text-gray-400 text-sm">{result.def.description}</p>
        </div>
      )}

      {result && (
        <button
          onClick={onFinish}
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl transition-colors w-full"
        >
          Start Playing — Claim Beginner Potion!
        </button>
      )}
    </div>
  )
}
