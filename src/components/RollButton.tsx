import { motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
  onRoll: () => void
  effectiveLuck: number
  disabled?: boolean
}

export function RollButton({ onRoll, effectiveLuck, disabled = false }: Props) {
  const [rolling, setRolling] = useState(false)

  function handleClick() {
    if (disabled || rolling) return
    setRolling(true)
    onRoll()
    setTimeout(() => setRolling(false), 300)
  }

  const luckDisplay =
    effectiveLuck >= 1000000
      ? `${(effectiveLuck / 1000000).toFixed(1)}M`
      : effectiveLuck >= 1000
      ? `${(effectiveLuck / 1000).toFixed(1)}k`
      : effectiveLuck.toString()

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={handleClick}
        disabled={disabled || rolling}
        className="relative w-44 h-44 rounded-full font-extrabold text-2xl text-white uppercase tracking-wider select-none focus:outline-none disabled:opacity-60"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #7c3aed, #4c1d95)',
          boxShadow: '0 0 30px rgba(124,58,237,0.7), 0 0 60px rgba(124,58,237,0.4)',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        animate={
          rolling
            ? { scale: [1, 1.15, 0.95, 1], rotate: [0, 6, -6, 0] }
            : {}
        }
        transition={{ duration: 0.3 }}
      >
        <motion.span
          animate={rolling ? { opacity: [1, 0, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          ROLL
        </motion.span>
        {/* Ring decoration */}
        <span
          className="absolute inset-0 rounded-full border-4 border-purple-400 opacity-30"
          style={{ animation: 'spin 6s linear infinite' }}
        />
      </motion.button>

      {effectiveLuck > 1 && (
        <div className="text-sm text-purple-300 font-medium">
          {luckDisplay}× Luck Active
        </div>
      )}
    </div>
  )
}
