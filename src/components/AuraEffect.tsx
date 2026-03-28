import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { Rarity } from '../types'

interface Props {
  rarity: Rarity
  size?: number   // diameter of center orb in px
}

interface Particle {
  id: number
  angle: number
  distance: number
  delay: number
  duration: number
  size: number
}

export function AuraEffect({ rarity, size = 120 }: Props) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: rarity.particleCount }, (_, i) => ({
      id: i,
      angle: (i / rarity.particleCount) * 360 + Math.random() * 20 - 10,
      distance: rarity.glowSize * 0.4 + Math.random() * rarity.glowSize * 0.3,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2,
      size: rarity.tier === 'Phantom' ? 6 : rarity.tier === 'Divine' ? 5 : 4,
    }))
  }, [rarity])

  const isPhantom = rarity.tier === 'Phantom'

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: rarity.glowSize * 2 + size, height: rarity.glowSize * 2 + size }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size + rarity.glowSize * 1.4,
          height: size + rarity.glowSize * 1.4,
          background: `radial-gradient(circle, ${rarity.glowColor} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Phantom second outer ring */}
      {isPhantom && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size + rarity.glowSize * 1.9,
            height: size + rarity.glowSize * 1.9,
            background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)`,
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      )}

      {/* Floating particles */}
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180
        const x = Math.cos(rad) * p.distance
        const y = Math.sin(rad) * p.distance

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: isPhantom ? (p.id % 2 === 0 ? '#67e8f9' : '#ffffff') : rarity.color,
              left: '50%',
              top: '50%',
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
            }}
            animate={{
              x: [x * 0.7, x, x * 0.85, x * 0.7],
              y: [y * 0.7, y, y * 0.85, y * 0.7],
              opacity: [0.4, 1, 0.6, 0.4],
              scale: [0.8, 1.2, 0.9, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      {/* Center orb */}
      <motion.div
        className="relative z-10 rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: isPhantom
            ? `radial-gradient(circle, #ffffff 0%, #67e8f9 40%, #0e7490 100%)`
            : `radial-gradient(circle, #ffffff 0%, ${rarity.color} 50%, ${rarity.glowColor} 100%)`,
          boxShadow: `0 0 ${rarity.glowSize * 0.5}px ${rarity.glowColor}, 0 0 ${rarity.glowSize}px ${rarity.glowColor}`,
        }}
        animate={{
          boxShadow: [
            `0 0 ${rarity.glowSize * 0.5}px ${rarity.glowColor}, 0 0 ${rarity.glowSize}px ${rarity.glowColor}`,
            `0 0 ${rarity.glowSize * 0.8}px ${rarity.glowColor}, 0 0 ${rarity.glowSize * 1.5}px ${rarity.glowColor}`,
            `0 0 ${rarity.glowSize * 0.5}px ${rarity.glowColor}, 0 0 ${rarity.glowSize}px ${rarity.glowColor}`,
          ],
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
