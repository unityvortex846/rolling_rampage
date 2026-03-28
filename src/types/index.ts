export type RarityTier =
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Epic'
  | 'Legendary'
  | 'Mythic'
  | 'Divine'
  | 'Phantom'

export interface Rarity {
  tier: RarityTier
  chance: number       // 1-in-N (e.g. 2 = 1-in-2)
  color: string        // hex color for UI
  glowColor: string    // CSS color for glow/box-shadow
  particleCount: number
  glowSize: number     // px
  label: string
  textClass: string    // tailwind text color class
  bgClass: string      // tailwind bg class for badge
}

export interface AuraDefinition {
  id: string
  name: string
  tier: RarityTier
  description: string
}

export interface OwnedAura {
  definitionId: string
  rolledAt: number     // Date.now() timestamp
}

export interface Potion {
  id: string
  name: string
  description: string
  luckMultiplier: number
  rollsRemaining: number
}

export interface GauntletDef {
  id: string
  name: string
  requiredAuras: { tier: RarityTier; count: number }[]
  rewardDescription: string
}

export interface GameState {
  inventory: OwnedAura[]
  totalStats: number
  luckMultiplier: number    // base permanent multiplier (starts at 1)
  activePotions: Potion[]
  potionInventory: Potion[] // potions not yet activated
  totalRolls: number
  tutorialComplete: boolean
  lastRolledAura: OwnedAura | null
}
