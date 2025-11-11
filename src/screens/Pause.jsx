import React from 'react'
import styles from './Pause.module.scss'

export default function Pause({ onResume, onQuit }) {
  return (
    <div className="overlay">
      <div className="panel">
        <h2>Pausa</h2>
        <button onClick={onResume}>Reanudar</button>
        <button onClick={onQuit}>Salir</button>
      </div>
    </div>
  )
}
