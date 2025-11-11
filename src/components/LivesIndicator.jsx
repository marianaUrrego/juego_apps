import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useGameStore } from '../store/gameStore'

export default function LivesIndicator({ lives: livesProp }) {
  const storeLives = useGameStore(s => s.lives)
  const lives = typeof livesProp === 'number' ? livesProp : storeLives
  const total = 3
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i < lives
        return (
          <FaHeart
            key={i}
            size={18}
            color={active ? '#ff5050' : '#555'}
            style={{ opacity: active ? 1 : 0.5 }}
            aria-label={active ? 'vida' : 'vida perdida'}
          />
        )
      })}
    </div>
  )
}
