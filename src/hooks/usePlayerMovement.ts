import { useCallback, useEffect, useRef, useState } from 'react'

export interface PlayerState {
  x: number
  y: number
  jumping: boolean
  facingLeft: boolean
}

const SPEED = 3 // px per frame

export function usePlayerMovement(worldWidth: number, worldHeight: number) {
  const [playerState, setPlayerState] = useState<PlayerState>({
    x: 0,
    y: 0,
    jumping: false,
    facingLeft: false,
  })

  const keysDown = useRef<Set<string>>(new Set())
  const rafRef = useRef<number | null>(null)
  const jumpTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const halfW = worldWidth / 2 - 30
  const halfH = worldHeight / 2 - 50

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysDown.current.add(e.key.toLowerCase())

      if ((e.key === ' ' || e.key === 'Space') && !e.repeat) {
        setPlayerState((prev) => {
          if (prev.jumping) return prev
          if (jumpTimeout.current) clearTimeout(jumpTimeout.current)
          jumpTimeout.current = setTimeout(() => {
            setPlayerState((p) => ({ ...p, jumping: false }))
          }, 600)
          return { ...prev, jumping: true }
        })
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      keysDown.current.delete(e.key.toLowerCase())
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    const loop = () => {
      const keys = keysDown.current
      let dx = 0
      let dy = 0

      if (keys.has('w') || keys.has('arrowup'))    dy -= SPEED
      if (keys.has('s') || keys.has('arrowdown'))  dy += SPEED
      if (keys.has('a') || keys.has('arrowleft'))  dx -= SPEED
      if (keys.has('d') || keys.has('arrowright')) dx += SPEED

      if (dx !== 0 || dy !== 0) {
        setPlayerState((prev) => {
          const newX = Math.max(-halfW, Math.min(halfW, prev.x + dx))
          const newY = Math.max(-halfH, Math.min(halfH, prev.y + dy))
          return {
            ...prev,
            x: newX,
            y: newY,
            facingLeft: dx < 0 ? true : dx > 0 ? false : prev.facingLeft,
          }
        })
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [halfW, halfH])

  const resetPosition = useCallback(() => {
    setPlayerState({ x: 0, y: 0, jumping: false, facingLeft: false })
  }, [])

  return { playerState, resetPosition }
}
