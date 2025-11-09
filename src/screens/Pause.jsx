import React from 'react'

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
