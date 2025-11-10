import React from 'react'
import Settings from '../screens/Settings'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
  const navigate = useNavigate()
  return <Settings onBack={() => navigate(-1)} />
}
