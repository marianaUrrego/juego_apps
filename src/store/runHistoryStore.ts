import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Difficulty = 'facil' | 'medio' | 'dificil'
export type RunHistoryEntry = {
  id: string
  levelId: string
  datetime: string
  score: number
  timeSeconds: number
  difficulty: Difficulty
  result: 'win' | 'lose'
}

interface RunHistoryState {
  runs: RunHistoryEntry[]
  addRun: (entry: Omit<RunHistoryEntry, 'id' | 'datetime'> & { id?: string, datetime?: string }) => void
}

function keyOf(levelId: string, difficulty: Difficulty){
  return `${levelId}__${difficulty}`
}

export const useRunHistoryStore = create<RunHistoryState>()(persist((set, get) => ({
  runs: [],
  addRun: (entryLike) => {
    const id = entryLike.id ?? (globalThis.crypto?.randomUUID?.() || `${Date.now()}`)
    const datetime = entryLike.datetime ?? new Date().toISOString()
    const entry: RunHistoryEntry = { id, datetime, levelId: entryLike.levelId, score: entryLike.score, timeSeconds: entryLike.timeSeconds, difficulty: entryLike.difficulty, result: entryLike.result }
    const all = [entry, ...get().runs]
    // Top 10 por (levelId + difficulty) por timeSeconds ascendente
    const grouped = all.reduce<Record<string, RunHistoryEntry[]>>((acc, r) => {
      const k = keyOf(r.levelId, r.difficulty)
      ;(acc[k] ||= []).push(r)
      return acc
    }, {})
    const trimmed: RunHistoryEntry[] = []
    for (const k of Object.keys(grouped)){
      const arr = grouped[k].sort((a,b) => a.timeSeconds - b.timeSeconds).slice(0, 10)
      trimmed.push(...arr)
    }
    set({ runs: trimmed })
  }
}), { name: 'hh_run_history_v1' }))
