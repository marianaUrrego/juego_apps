import React from 'react'
import Scores from '../screens/Scores'
import { useNavigate } from 'react-router-dom'

export default function ScoresPage() {
  const navigate = useNavigate()
  return <Scores onBack={() => navigate('/levels')} />
}
