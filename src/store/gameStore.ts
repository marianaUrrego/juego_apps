import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LevelId = 'forest' | 'cementery' | 'library' | string

interface GameState {
  nivelActual: LevelId
  nivelesDesbloqueados: LevelId[]
  mejorPuntajePorNivel: Record<string, number>
  ultimoPuntaje: number | null
  // timer/status
  timeRemaining: number
  status: 'idle' | 'playing' | 'won' | 'lost'
  // scores log
  scores: ScoreEntry[]
  // actions
  setNivelActual: (level: LevelId) => void
  desbloquearNivel: (level: LevelId) => void
  registrarPuntaje: (level: LevelId, score: number) => void
  setUltimoPuntaje: (score: number | null) => void
  // timer actions
  startLevel: (durationSec: number) => void
  decrement: () => void
  setWon: () => void
  setLost: () => void
  resetLevel: () => void
  // scores actions
  addScore: (entry: ScoreEntry) => void
}

export type ScoreResult = 'win' | 'lose'
export type ScoreEntry = {
  id: string
  levelId: string
  score: number
  result: ScoreResult
  createdAt: string
}

export const useGameStore = create<GameState>()(persist((set, get) => ({
  nivelActual: 'forest',
  nivelesDesbloqueados: ['cementery', 'library', 'forest'],
  mejorPuntajePorNivel: {},
  ultimoPuntaje: null,
  timeRemaining: 0,
  status: 'idle',
  scores: [],
  setNivelActual: (level) => set({ nivelActual: level }),
  desbloquearNivel: (level) => {
    const cur = get().nivelesDesbloqueados
    if (!cur.includes(level)) set({ nivelesDesbloqueados: [...cur, level] })
  },
  registrarPuntaje: (level, score) => {
    const best = get().mejorPuntajePorNivel[level] ?? 0
    if (score > best) set({ mejorPuntajePorNivel: { ...get().mejorPuntajePorNivel, [level]: score } })
    set({ ultimoPuntaje: score })
  },
  setUltimoPuntaje: (score) => set({ ultimoPuntaje: score }),
  startLevel: (durationSec) => set({ timeRemaining: durationSec, status: 'playing' }),
  decrement: () => {
    const t = Math.max(0, get().timeRemaining - 1)
    set({ timeRemaining: t })
  },
  setWon: () => set({ status: 'won' }),
  setLost: () => set({ status: 'lost' }),
  resetLevel: () => set({ status: 'idle', timeRemaining: 0 }),
  addScore: (entry) => {
    const list = get().scores
    set({ scores: [entry, ...list].slice(0, 100) })
    // also update best table
    const prevBest = get().mejorPuntajePorNivel[entry.levelId] ?? 0
    if (entry.score > prevBest) set({ mejorPuntajePorNivel: { ...get().mejorPuntajePorNivel, [entry.levelId]: entry.score } })
    set({ ultimoPuntaje: entry.score })
  }
}), { name: 'hh_game_v1' }))
