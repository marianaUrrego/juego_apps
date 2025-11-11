import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { useRunHistoryStore } from '../store/runHistoryStore'
import styles from './LevelSelect.module.scss'

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
  const legacyUnlockedList = useGameStore(s => s.nivelesDesbloqueados)
  const runs = useRunHistoryStore(s => s.runs)
  const [open, setOpen] = React.useState(false)
  const [pendingLevel, setPendingLevel] = React.useState(null)

  // Nota: seguimos registrando runs, pero el desbloqueo visual se rige por unlockedLevels (jerárquico)

  // Desbloqueo jerárquico: un nivel está desbloqueado si su orden <= max desbloqueado
  const isUnlocked = React.useCallback((order) => order <= unlockedLevelsCounter, [unlockedLevelsCounter])

  // Normalizar datos legacy si existen (por ejemplo lista con saltos). Elevar contador al max orden presente.
  React.useEffect(() => {
    if (!legacyUnlockedList || legacyUnlockedList.length === 0) return
    const orderMap = { cementery: 1, forest: 2, library: 3 }
    const maxFromList = legacyUnlockedList.reduce((m, id) => Math.max(m, orderMap[id] || 1), 1)
    if (maxFromList !== unlockedLevelsCounter) setUnlockedLevels(maxFromList)
  }, [legacyUnlockedList, unlockedLevelsCounter, setUnlockedLevels])

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
    <div className={`page level-select ${styles.level}`}>
      <header className="bar level-header">
        <div className={`container`}>
          <div className="level-header__back"><button className="back-btn" onClick={() => navigate('/')}>{'←'}</button></div>
          <h2 className="title-md level-header__title">Selecciona Nivel</h2>
          <span className="level-header__spacer" />
        </div>
      </header>

      <div className={`container page__body ${styles.level__body}`}>
        <div className={styles.level__list}>
          {ORDERED_LEVELS.map(l => {
            const unlocked = isUnlocked(l.order)
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
                <div className={styles.level__cardActions}>
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
        <div role="dialog" aria-modal="true" className={styles.level__overlay}>
          <div className={`panel ${styles.level__dialog}`}>
            <div className={styles.level__dialogHeader}>
              <h3 className={styles.level__dialogTitle}>Elige la dificultad</h3>
              <button aria-label="Cerrar" onClick={() => { setOpen(false); setPendingLevel(null) }} className="icon-btn">✕</button>
            </div>
            <div className={styles.level__actions}>
              <button className="btn-full" onClick={() => startWithDifficulty('facil')}>Fácil</button>
              <button className="btn-full" onClick={() => startWithDifficulty('medio')}>Medio</button>
              <button className="btn-full" onClick={() => startWithDifficulty('dificil')}>Difícil</button>
            </div>
            <div className={styles.level__footer}>
              <button className="btn" onClick={() => { setOpen(false); setPendingLevel(null) }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
