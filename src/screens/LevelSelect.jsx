import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { useRunHistoryStore } from '../store/runHistoryStore'

const ORDERED_LEVELS = [
  { id: 'cementery', name: 'Cementerio', order: 1 },
  { id: 'forest', name: 'Bosque Oscuro', order: 2 },
  { id: 'library', name: 'Biblioteca Embrujada', order: 3 },
]

export default function LevelSelect() {
  const navigate = useNavigate()
  const setNivelActual = useGameStore(s => s.setNivelActual)
  const setDifficulty = useGameStore(s => s.setDifficulty)
  const unlockedLevelsCounter = useGameStore(s => s.unlockedLevels)
  const setUnlockedLevels = useGameStore(s => s.setUnlockedLevels)
  const runs = useRunHistoryStore(s => s.runs)
  const [open, setOpen] = React.useState(false)
  const [pendingLevel, setPendingLevel] = React.useState(null)

  const hasCleared = React.useMemo(() => {
    const wonByLevel = runs.reduce((acc, r) => {
      if (r.result === 'win') acc.add(r.levelId)
      return acc
    }, new Set())
    return (levelId) => wonByLevel.has(levelId)
  }, [runs])

  // Derivar desbloqueo por reglas:
  // L1: siempre desbloqueado
  // L2: desbloqueado si L1 (cementery) completado en alguna dificultad
  // L3: desbloqueado si L2 (forest) completado en alguna dificultad
  const isUnlocked = React.useCallback((order, id) => {
    if (order === 1) return true
    if (order === 2) return hasCleared('cementery')
    if (order === 3) return hasCleared('forest')
    return false
  }, [hasCleared])

  // Mantener sincronizado el contador global si difiere de lo derivado
  React.useEffect(() => {
    const derived = 1 + (hasCleared('cementery') ? 1 : 0) + (hasCleared('forest') ? 1 : 0)
    if (derived !== unlockedLevelsCounter) {
      setUnlockedLevels(derived)
    }
  }, [hasCleared, unlockedLevelsCounter, setUnlockedLevels])

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
          <div><button className="back-btn" onClick={() => navigate('/')}>{'←'}</button></div>
          <h2 className="title-md">Selecciona Nivel</h2>
          <span />
        </div>
      </header>

      <div className="container page__body">
        <div className="levels-row">
          {ORDERED_LEVELS.map(l => {
            const unlocked = isUnlocked(l.order, l.id)
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
