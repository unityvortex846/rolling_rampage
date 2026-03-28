import type { GauntletDef } from '../types'

export const GAUNTLETS: GauntletDef[] = [
  {
    id: 'gauntlet-of-sparks',
    name: 'Gauntlet of Sparks',
    requiredAuras: [
      { tier: 'Common', count: 10 },
      { tier: 'Uncommon', count: 5 },
    ],
    rewardDescription: '5× luck boost for 10 rolls',
  },
  {
    id: 'gauntlet-of-storms',
    name: 'Gauntlet of Storms',
    requiredAuras: [
      { tier: 'Rare', count: 5 },
      { tier: 'Epic', count: 2 },
    ],
    rewardDescription: '50× luck boost for 10 rolls + rolling speed +25%',
  },
  {
    id: 'gauntlet-of-the-abyss',
    name: 'Gauntlet of the Abyss',
    requiredAuras: [
      { tier: 'Legendary', count: 3 },
      { tier: 'Mythic', count: 1 },
    ],
    rewardDescription: '10,000× luck boost for 5 rolls + rolling speed +100%',
  },
]
