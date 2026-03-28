import type { Rarity } from '../types'

export const RARITIES: Rarity[] = [
  {
    tier: 'Common',
    chance: 2,
    color: '#9ca3af',
    glowColor: 'rgba(156,163,175,0.6)',
    particleCount: 4,
    glowSize: 20,
    label: 'Common',
    textClass: 'text-gray-400',
    bgClass: 'bg-gray-700',
  },
  {
    tier: 'Uncommon',
    chance: 5,
    color: '#4ade80',
    glowColor: 'rgba(74,222,128,0.7)',
    particleCount: 6,
    glowSize: 30,
    label: 'Uncommon',
    textClass: 'text-green-400',
    bgClass: 'bg-green-900',
  },
  {
    tier: 'Rare',
    chance: 20,
    color: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.75)',
    particleCount: 10,
    glowSize: 45,
    label: 'Rare',
    textClass: 'text-blue-400',
    bgClass: 'bg-blue-900',
  },
  {
    tier: 'Epic',
    chance: 100,
    color: '#c084fc',
    glowColor: 'rgba(192,132,252,0.8)',
    particleCount: 16,
    glowSize: 65,
    label: 'Epic',
    textClass: 'text-purple-400',
    bgClass: 'bg-purple-900',
  },
  {
    tier: 'Legendary',
    chance: 1000,
    color: '#fb923c',
    glowColor: 'rgba(251,146,60,0.85)',
    particleCount: 24,
    glowSize: 90,
    label: 'Legendary',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-900',
  },
  {
    tier: 'Mythic',
    chance: 10000,
    color: '#f87171',
    glowColor: 'rgba(248,113,113,0.9)',
    particleCount: 36,
    glowSize: 120,
    label: 'Mythic',
    textClass: 'text-red-400',
    bgClass: 'bg-red-900',
  },
  {
    tier: 'Divine',
    chance: 100000,
    color: '#facc15',
    glowColor: 'rgba(250,204,21,0.9)',
    particleCount: 52,
    glowSize: 160,
    label: 'Divine',
    textClass: 'text-yellow-400',
    bgClass: 'bg-yellow-900',
  },
  {
    tier: 'Phantom',
    chance: 1000000,
    color: '#67e8f9',
    glowColor: 'rgba(103,232,249,0.95)',
    particleCount: 80,
    glowSize: 220,
    label: 'Phantom',
    textClass: 'text-cyan-300',
    bgClass: 'bg-cyan-900',
  },
]

export const RARITY_MAP: Record<string, Rarity> = Object.fromEntries(
  RARITIES.map((r) => [r.tier, r])
)

// Sorted rarest → most common for rolling
export const RARITIES_DESC = [...RARITIES].sort((a, b) => b.chance - a.chance)
