import React from 'react'
import Credits from '../screens/Credits'
import { useNavigate } from 'react-router-dom'

export default function CreditsPage() {
  const navigate = useNavigate()
  return <Credits onBack={() => navigate(-1)} />
}
