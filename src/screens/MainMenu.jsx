import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import BrandBlock from '../components/BrandBlock'
import { FaTrophy, FaInfoCircle, FaCog } from 'react-icons/fa'
import styles from './MainMenu.module.scss'

export default function MainMenu() {
  const navigate = useNavigate()
  return (
    <div className="screen" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 96px)', padding: '24px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'center', maxWidth: 1100, width: '100%', margin: '0 auto' }}>
        {/* Columna izquierda: branding */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 360px' }}>
          <BrandBlock />
        </div>
        {/* Columna derecha: botones */}
        <div className="menu" style={{ display: 'grid', gap: 12, alignContent: 'center', justifyItems: 'stretch', flex: '1 1 320px', maxWidth: 360 }}>
          <button className="btn btn--primary" onClick={() => navigate('/levels')}>
            JUGAR
          </button>
          <button className="btn btn--secondary" onClick={() => navigate('/scores')}>
            <span className="icon"><FaTrophy /></span>
            <span>Puntaje</span>
          </button>
          <button className="btn btn--secondary" onClick={() => navigate('/credits')}>
            <span className="icon"><FaInfoCircle /></span>
            <span>Créditos</span>
          </button>
          <button className="btn btn--secondary" onClick={() => navigate('/settings')}>
            <span className="icon"><FaCog /></span>
            <span>Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  )
}
