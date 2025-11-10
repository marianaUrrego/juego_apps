import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Game from '../screens/Game'
import { useGameStore } from '../store/gameStore'

function normalizeLevel(id) {
  if (!id) return null
  if (id === 'graveyard') return 'cementery'
  return id
}

export default function GamePage() {
  const navigate = useNavigate()
  const { levelId } = useParams()
  const nivelActual = useGameStore(s => s.nivelActual)
  const setNivelActual = useGameStore(s => s.setNivelActual)
  const registrarPuntaje = useGameStore(s => s.registrarPuntaje)

  const level = useMemo(() => normalizeLevel(levelId) || nivelActual, [levelId, nivelActual])

  useEffect(() => {
    const n = normalizeLevel(levelId)
    if (n && n !== nivelActual) setNivelActual(n)
  }, [levelId])

  return (
    <Game
      level={level}
      onPause={() => navigate(-1)}
      onEnd={(data) => { if (typeof data?.score === 'number') registrarPuntaje(level, data.score); navigate('/scores') }}
    />
  )
}
