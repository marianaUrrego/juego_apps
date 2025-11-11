import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

const ORDERED_LEVELS = [
  { id: 'cementery', name: 'Cementerio', order: 1 },
  { id: 'forest', name: 'Bosque Oscuro', order: 2 },
  { id: 'library', name: 'Biblioteca Embrujada', order: 3 },
]

export default function LevelSelect() {
  const navigate = useNavigate()
  const setNivelActual = useGameStore(s => s.setNivelActual)
  const unlockedLevels = useGameStore(s => s.unlockedLevels)
  return (
    <div className="page level-select">
      <header className="bar level-header">
        <div className="container">
          <div><button className="back-btn" onClick={() => navigate(-1)}>{'←'}</button></div>
          <h2 className="title-md">Selecciona Nivel</h2>
          <span />
        </div>
      </header>

      <div className="container page__body">
        <div className="levels-row">
          {ORDERED_LEVELS.map(l => {
            const unlocked = unlockedLevels >= l.order
            const disabled = !unlocked
            const subtitle = `Nivel ${l.order} · ${unlocked ? 'Desbloqueado' : 'Bloqueado'}`
            return (
              <div key={l.id} className={`level-card ${disabled ? 'is-disabled' : ''}`}>
                <div className="level-card__top">
                  <div className="icon-box" />
                  <div>
                    <div style={{ fontWeight: 700 }}>{l.name}</div>
                    <div className="subtitle">{subtitle}</div>
                  </div>
                  {unlocked && <span style={{ fontSize: 18 }}>✔</span>}
                </div>
                <div style={{ marginTop: 12 }}>
                  <button className="btn-full" onClick={() => { if (disabled) return; setNivelActual(l.id); navigate(`/game/${l.id}`) }} disabled={disabled}>
                    {disabled ? 'Bloqueado' : 'Jugar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
