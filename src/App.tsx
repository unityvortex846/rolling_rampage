import { useCallback, useState } from 'react'
import { useGameState } from './hooks/useGameState'
import { TutorialModal } from './components/TutorialModal'
import { RollButton } from './components/RollButton'
import { AuraDisplay } from './components/AuraDisplay'
import { StatsPanel } from './components/StatsPanel'
import { Inventory } from './components/Inventory'
import { PotionPanel } from './components/PotionPanel'
import { GauntletPanel } from './components/GauntletPanel'
import { getEffectiveLuck } from './utils/roll'
import { AURA_MAP } from './data/auras'
import { RARITY_MAP } from './data/rarities'

type Tab = 'inventory' | 'potions' | 'gauntlets'

export function App() {
  const { state, roll, usePotion, completeTutorial, resetGame } = useGameState()
  const [activeTab, setActiveTab] = useState<Tab>('inventory')
  const [displayKey, setDisplayKey] = useState(0)

  const effectiveLuck = getEffectiveLuck(state)

  const handleRoll = useCallback(() => {
    roll()
    setDisplayKey((k) => k + 1)
  }, [roll])

  const handleDismiss = useCallback(() => {
    // AuraDisplay handles its own visibility; nothing needed here
  }, [])

  const lastAuraDef = state.lastRolledAura
    ? AURA_MAP[state.lastRolledAura.definitionId]
    : null
  const lastRarity = lastAuraDef ? RARITY_MAP[lastAuraDef.tier] : null

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Tutorial */}
      {!state.tutorialComplete && (
        <TutorialModal onComplete={completeTutorial} />
      )}

      {/* Aura result overlay */}
      <AuraDisplay
        key={displayKey}
        aura={lastAuraDef ?? null}
        rarity={lastRarity ?? null}
        onDismiss={handleDismiss}
      />

      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight">
          <span className="text-purple-400">Rolling</span>{' '}
          <span className="text-white">Rampage</span>
        </h1>
        <button
          onClick={resetGame}
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          Reset
        </button>
      </header>

      {/* Main layout */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">

        {/* Roll section */}
        <section className="flex flex-col items-center gap-6">
          <RollButton onRoll={handleRoll} effectiveLuck={effectiveLuck} />
          <p className="text-gray-600 text-sm">
            {state.totalRolls === 0 ? 'Click to roll your first aura!' : `${state.totalRolls.toLocaleString()} rolls so far`}
          </p>
        </section>

        {/* Stats */}
        <StatsPanel state={state} />

        {/* Tabs */}
        <div>
          <div className="flex gap-1 mb-4 bg-gray-900 p-1 rounded-xl">
            {(['inventory', 'potions', 'gauntlets'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-purple-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
                {tab === 'potions' && state.potionInventory.length > 0 && (
                  <span className="ml-1.5 bg-purple-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {state.potionInventory.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === 'inventory' && <Inventory state={state} />}
          {activeTab === 'potions' && <PotionPanel state={state} onUsePotion={usePotion} />}
          {activeTab === 'gauntlets' && <GauntletPanel />}
        </div>
      </main>
    </div>
  )
}
