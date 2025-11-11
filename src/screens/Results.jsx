import React from 'react'
import styles from './Results.module.scss'

export default function Results({ data, onMenu, onReplay }) {
  return (
    <div className="screen centered">
      <h2>Resultado</h2>
      <p>Puntaje: <b>{data?.score ?? 0}</b></p>
      <div style={{ display:'flex', gap:12 }}>
        <button onClick={onReplay}>Reintentar</button>
        <button onClick={onMenu}>Menú</button>
      </div>
    </div>
  )
}
