import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import GamePage from '../pages/GamePage'
import ScoresPage from '../pages/ScoresPage'
import CreditsPage from '../pages/CreditsPage'
import SettingsPage from '../pages/SettingsPage'
import NotFound from '../pages/NotFound'
import LevelsPage from '../pages/LevelsPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/levels" element={<LevelsPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/game/:levelId" element={<GamePage />} />
      <Route path="/scores" element={<ScoresPage />} />
      <Route path="/credits" element={<CreditsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
