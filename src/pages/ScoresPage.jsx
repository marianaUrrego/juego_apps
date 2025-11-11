import React from 'react'
import Scores from '../screens/Scores'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ScoresPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from
  const handleBack = () => {
    if (from === 'home') navigate('/')
    else navigate('/levels')
  }
  return <Scores onBack={handleBack} />
}
