import React from 'react'
import styles from './Pause.module.scss'

export default function Pause({ onResume, onQuit }) {
  return (
    <div className={styles.pause__overlay}>
      <div className={`panel ${styles.pause__panel}`}>
        <h2>Pausa</h2>
        <button onClick={onResume}>Reanudar</button>
        <button onClick={onQuit}>Salir</button>
      </div>
    </div>
  )
}
