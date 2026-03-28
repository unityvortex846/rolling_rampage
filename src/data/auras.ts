import type { AuraDefinition } from '../types'

export const AURAS: AuraDefinition[] = [
  // Common (1-in-2)
  { id: 'dusty-wisp', name: 'Dusty Wisp', tier: 'Common', description: 'A faint shimmer of grey energy.' },
  { id: 'stone-echo', name: 'Stone Echo', tier: 'Common', description: 'The dull resonance of ancient rock.' },
  { id: 'ashen-drift', name: 'Ashen Drift', tier: 'Common', description: 'Soft ash floats lazily around you.' },

  // Uncommon (1-in-5)
  { id: 'verdant-mist', name: 'Verdant Mist', tier: 'Uncommon', description: 'A lush green haze of forest energy.' },
  { id: 'leaf-surge', name: 'Leaf Surge', tier: 'Uncommon', description: 'Spiraling leaves drawn to your presence.' },
  { id: 'moss-veil', name: 'Moss Veil', tier: 'Uncommon', description: 'A soft emerald shroud.' },

  // Rare (1-in-20)
  { id: 'tidal-flux', name: 'Tidal Flux', tier: 'Rare', description: 'The pull of the deep sea surrounds you.' },
  { id: 'azure-shroud', name: 'Azure Shroud', tier: 'Rare', description: 'Cool blue light ripples outward.' },
  { id: 'frost-vein', name: 'Frost Vein', tier: 'Rare', description: 'Ice-blue veins pulse under your skin.' },

  // Epic (1-in-100)
  { id: 'void-pulse', name: 'Void Pulse', tier: 'Epic', description: 'Reality warps slightly at your edges.' },
  { id: 'shadow-bloom', name: 'Shadow Bloom', tier: 'Epic', description: 'Dark petals blossom around your form.' },
  { id: 'arcane-halo', name: 'Arcane Halo', tier: 'Epic', description: 'A crown of violet arcane energy.' },

  // Legendary (1-in-1000)
  { id: 'solar-mantle', name: 'Solar Mantle', tier: 'Legendary', description: 'The heat of a thousand suns clings to you.' },
  { id: 'ember-crown', name: 'Ember Crown', tier: 'Legendary', description: 'Burning embers orbit your shoulders.' },
  { id: 'inferno-wake', name: 'Inferno Wake', tier: 'Legendary', description: 'You leave scorched earth wherever you step.' },

  // Mythic (1-in-10,000)
  { id: 'blood-tempest', name: 'Blood Tempest', tier: 'Mythic', description: 'A vortex of crimson fury surrounds you.' },
  { id: 'chaos-scar', name: 'Chaos Scar', tier: 'Mythic', description: 'Fractures in reality trace your silhouette.' },
  { id: 'rage-corona', name: 'Rage Corona', tier: 'Mythic', description: 'A blazing red corona burns at your core.' },

  // Divine (1-in-100,000)
  { id: 'aureate-storm', name: 'Aureate Storm', tier: 'Divine', description: 'Golden lightning cascades from above.' },
  { id: 'solaris-veil', name: 'Solaris Veil', tier: 'Divine', description: 'A divine yellow light wraps you entirely.' },
  { id: 'gilded-wrath', name: 'Gilded Wrath', tier: 'Divine', description: 'Shards of pure gold orbit your form.' },

  // Phantom (1-in-1,000,000)
  { id: 'phantom-rift', name: 'Phantom Rift', tier: 'Phantom', description: 'You exist between worlds, barely visible.' },
  { id: 'spectral-nexus', name: 'Spectral Nexus', tier: 'Phantom', description: 'All light bends toward you in eerie silence.' },
  { id: 'ethereal-dominion', name: 'Ethereal Dominion', tier: 'Phantom', description: 'The boundary between existence and void.' },
]

// Index by tier for quick lookup
export const AURAS_BY_TIER = AURAS.reduce<Record<string, AuraDefinition[]>>(
  (acc, aura) => {
    if (!acc[aura.tier]) acc[aura.tier] = []
    acc[aura.tier].push(aura)
    return acc
  },
  {}
)

export const AURA_MAP: Record<string, AuraDefinition> = Object.fromEntries(
  AURAS.map((a) => [a.id, a])
)
