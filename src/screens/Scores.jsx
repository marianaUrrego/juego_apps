import React, { useMemo } from 'react'
import { useRunHistoryStore } from '../store/runHistoryStore'
import styles from './Scores.module.scss'

function splitDate(iso){
  const d = new Date(iso)
  const fecha = d.toLocaleDateString(undefined,{ day:'2-digit', month:'2-digit', year:'numeric'})
  const hora = d.toLocaleTimeString(undefined,{ hour:'2-digit', minute:'2-digit'})
  return { fecha, hora }
}

function formatMMSS(totalSeconds){
  const s = Math.max(0, Math.floor(totalSeconds || 0))
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export default function Scores({ onBack }) {
  const runs = useRunHistoryStore(s => s.runs)

  // Mezclar todas las partidas y ordenar por mejor tiempo (asc)
  const rows = useMemo(() => [...runs].sort((a,b) => b.score - a.score), [runs])

  return (
    <div className={`page ${styles.scores}`}>
      <header className="bar scores-header">
        <div className={`container`}>
          <div className="scores-header__back"><button className="back-btn" onClick={onBack}>{'\u2190'}</button></div>
          <h2 className={`title-md scores-header__title ${styles.scores__title}`}>Puntajes</h2>
          <div className="scores-header__spacer" aria-hidden />
        </div>
      </header>

      <div className={`container page__body ${styles.scores__body}`}>
        <div className={`panel ${styles.scores__panel}`}>
          <table className={`table table--scores ${styles.scores__table}`}>
            <thead>
              <tr>
                <th>#</th>
                <th>Resultado</th>
                <th>Nivel</th>
                <th>Dificultad</th>
                <th>Fecha</th>
                <th>Tiempo</th>
                <th>Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.scores__empty}>Aún no hay puntajes registrados.</td>
                </tr>
              ) : (
                rows.map((r, idx) => {
                  const { fecha } = splitDate(r.datetime)
                  return (
                    <tr key={r.id}>
                      <td className="rank">{idx+1}</td>
                      <td style={{ color: r.result==='win' ? '#66e28a' : '#ff8080' }}>{r.result}</td>
                      <td>{r.levelId}</td>
                      <td>{r.difficulty}</td>
                      <td>{fecha}</td>
                      <td>{formatMMSS(r.timeSeconds)}</td>
                      <td className="score">{r.score}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
