import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LevelId = 'forest' | 'cementery' | 'library' | string

export type Difficulty = 'facil' | 'medio' | 'dificil'

export function getInitialTimeByDifficulty(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'facil': return 120
    case 'medio': return 90
    case 'dificil': return 60
    default: return 120
  }
}

interface GameState {
  nivelActual: LevelId
  nivelesDesbloqueados: LevelId[]
  unlockedLevels: number
  mejorPuntajePorNivel: Record<string, number>
  ultimoPuntaje: number | null
  // timer/status
  timeRemaining: number
  status: 'idle' | 'playing' | 'won' | 'lost'
  // lives
  lives: number
  // difficulty
  difficulty: Difficulty
  // scores log
  scores: ScoreEntry[]
  // actions
  setNivelActual: (level: LevelId) => void
  desbloquearNivel: (level: LevelId) => void
  setUnlockedLevels: (n: number) => void
  registrarPuntaje: (level: LevelId, score: number) => void
  setUltimoPuntaje: (score: number | null) => void
  setDifficulty: (d: Difficulty) => void
  // timer actions
  startLevel: (durationSec: number) => void
  decrement: () => void
  setWon: () => void
  setLost: () => void
  resetLevel: () => void
  // lives actions
  loseLife: () => void
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
  nivelActual: 'cementery',
  nivelesDesbloqueados: ['cementery'],
  unlockedLevels: 1,
  mejorPuntajePorNivel: {},
  ultimoPuntaje: null,
  timeRemaining: 0,
  status: 'idle',
  lives: 3,
  difficulty: 'facil',
  scores: [],
  setNivelActual: (level) => set({ nivelActual: level }),
  desbloquearNivel: (level) => {
    const cur = get().nivelesDesbloqueados
    if (!cur.includes(level)) set({ nivelesDesbloqueados: [...cur, level] })
  },
  setUnlockedLevels: (n) => set({ unlockedLevels: Math.max(1, Math.min(3, n)) }),
  registrarPuntaje: (level, score) => {
    const best = get().mejorPuntajePorNivel[level] ?? 0
    if (score > best) set({ mejorPuntajePorNivel: { ...get().mejorPuntajePorNivel, [level]: score } })
    set({ ultimoPuntaje: score })
  },
  setUltimoPuntaje: (score) => set({ ultimoPuntaje: score }),
  setDifficulty: (d) => set({ difficulty: d }),
  startLevel: (durationSec) => set({ timeRemaining: durationSec, status: 'playing', lives: 3 }),
  decrement: () => {
    const t = Math.max(0, get().timeRemaining - 1)
    set({ timeRemaining: t })
  },
  setWon: () => set({ status: 'won' }),
  setLost: () => set({ status: 'lost' }),
  resetLevel: () => set({ status: 'idle', timeRemaining: 0, lives: 3 }),
  loseLife: () => {
    const cur = get().lives
    const next = Math.max(0, cur - 1)
    set({ lives: next })
  },
  addScore: (entry) => {
    const list = get().scores
    const trimmed = [entry, ...list].sort((a,b) => b.score - a.score).slice(0, 10)
    set({ scores: trimmed })
    // also update best table
    const prevBest = get().mejorPuntajePorNivel[entry.levelId] ?? 0
    if (entry.score > prevBest) set({ mejorPuntajePorNivel: { ...get().mejorPuntajePorNivel, [entry.levelId]: entry.score } })
    set({ ultimoPuntaje: entry.score })
  }
}), { name: 'hh_game_v2' }))
