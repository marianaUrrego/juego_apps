import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import BrandBlock from '../components/BrandBlock'
import { FaTrophy, FaInfoCircle, FaCog } from 'react-icons/fa'
import styles from './MainMenu.module.scss'

export default function MainMenu() {
  const navigate = useNavigate()
  return (
    <div className={`screen ${styles.main}`}>
      <div className={styles.main__wrapper}>
        {/* Columna izquierda: branding */}
        <div className={styles.main__left}>
          <BrandBlock />
        </div>
        {/* Columna derecha: botones */}
        <div className={`${styles.main__menu} menu`}>
          <button className="btn btn--primary" onClick={() => navigate('/levels')}>
            JUGAR
          </button>
          <button className="btn btn--secondary" onClick={() => navigate('/scores', { state: { from: 'home' } })}>
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
