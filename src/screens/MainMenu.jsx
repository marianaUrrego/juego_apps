import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export default function MainMenu() {
  const navigate = useNavigate()
  return (
    <div className="screen">
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ width: 160, height: 160, borderRadius: 20, background: 'color-mix(in oklab, var(--c-1) 30%, transparent)', display: 'grid', placeItems: 'center', border: '1px solid color-mix(in oklab, var(--c-3) 30%, transparent)' }}>
          <img src={logo} alt="logo" style={{ width: 120, height: 120, objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: 48, margin: 0 }}>Haunted Hunt</h1>
      </div>
      <div className="menu" style={{ marginLeft: 'auto' }}>
        <button className="btn btn--primary" onClick={() => navigate('/levels')}>
          JUGAR
        </button>
        <button className="btn btn--secondary" onClick={() => navigate('/scores')}>
          <span className="icon">🏆</span>
          <span>Puntaje</span>
        </button>
        <button className="btn btn--secondary" onClick={() => navigate('/credits')}>
          <span className="icon">ℹ️</span>
          <span>Créditos</span>
        </button>
        <button className="btn btn--secondary" onClick={() => navigate('/settings')}>
          <span className="icon">⚙️</span>
          <span>Ajustes</span>
        </button>
      </div>
    </div>
  )
}
