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
  const setDifficulty = useGameStore(s => s.setDifficulty)
  const unlockedLevels = useGameStore(s => s.unlockedLevels)
  const [open, setOpen] = React.useState(false)
  const [pendingLevel, setPendingLevel] = React.useState(null)

  function handleChooseLevel(levelId){
    // Si está bloqueado, no hace nada (se controla desde el botón)
    setPendingLevel(levelId)
    setOpen(true)
  }

  function startWithDifficulty(d){
    if (!pendingLevel) return
    setDifficulty(d)
    setNivelActual(pendingLevel)
    setOpen(false)
    const go = pendingLevel
    setPendingLevel(null)
    navigate(`/game/${go}`)
  }

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
                  <button className="btn-full" onClick={() => { if (disabled) return; handleChooseLevel(l.id) }} disabled={disabled}>
                    {disabled ? 'Bloqueado' : 'Jugar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.55)', zIndex: 50 }}>
          <div className="panel" style={{ width: 360, maxWidth: '90vw', display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>Elige la dificultad</h3>
              <button aria-label="Cerrar" onClick={() => { setOpen(false); setPendingLevel(null) }} className="icon-btn">✕</button>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <button className="btn-full" onClick={() => startWithDifficulty('facil')}>Fácil</button>
              <button className="btn-full" onClick={() => startWithDifficulty('medio')}>Medio</button>
              <button className="btn-full" onClick={() => startWithDifficulty('dificil')}>Difícil</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn" onClick={() => { setOpen(false); setPendingLevel(null) }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
