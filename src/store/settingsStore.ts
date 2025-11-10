import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  volumenMusica: number
  volumenSFX: number
  mute: boolean
  difficulty: 'facil' | 'medio' | 'dificil'
  setVolumenMusica: (v: number) => void
  setVolumenSFX: (v: number) => void
  toggleMute: () => void
  setDifficulty: (d: 'facil' | 'medio' | 'dificil') => void
}

export const useSettingsStore = create<SettingsState>()(persist((set) => ({
  volumenMusica: 0.6,
  volumenSFX: 0.8,
  mute: false,
  difficulty: 'medio',
  setVolumenMusica: (v) => set({ volumenMusica: Math.max(0, Math.min(1, v)) }),
  setVolumenSFX: (v) => set({ volumenSFX: Math.max(0, Math.min(1, v)) }),
  toggleMute: () => set(s => ({ mute: !s.mute })),
  setDifficulty: (d) => set({ difficulty: d })
}), { name: 'hh_settings_v1' }))
