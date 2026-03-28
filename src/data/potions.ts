import type { Potion } from '../types'

export const BEGINNER_POTION: Potion = {
  id: 'beginner-potion',
  name: 'Beginner Potion',
  description: 'A gift for new rampagers. Grants 10,000× luck for 1 roll.',
  luckMultiplier: 10000,
  rollsRemaining: 1,
}

export const ALL_POTIONS: Potion[] = [
  BEGINNER_POTION,
  {
    id: 'minor-luck-potion',
    name: 'Minor Luck Potion',
    description: 'Grants 10× luck for 5 rolls.',
    luckMultiplier: 10,
    rollsRemaining: 5,
  },
  {
    id: 'major-luck-potion',
    name: 'Major Luck Potion',
    description: 'Grants 1,000× luck for 3 rolls.',
    luckMultiplier: 1000,
    rollsRemaining: 3,
  },
  {
    id: 'grand-luck-potion',
    name: 'Grand Luck Potion',
    description: 'Grants 100,000× luck for 1 roll.',
    luckMultiplier: 100000,
    rollsRemaining: 1,
  },
]
