import React from 'react'
import styles from './Results.module.scss'

export default function Results({ data, onMenu, onReplay }) {
  return (
    <div className={`screen centered ${styles.results}`}>
      <h2>Resultado</h2>
      <p>Puntaje: <b>{data?.score ?? 0}</b></p>
      <div className={styles.results__actions}>
        <button onClick={onReplay}>Reintentar</button>
        <button onClick={onMenu}>Menú</button>
      </div>
    </div>
  )
}
