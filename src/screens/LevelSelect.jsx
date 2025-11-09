import React from 'react'

const LEVELS = [
  { id: 'forest', name: 'Bosque' },
  { id: 'cementery', name: 'Cementerio' },
  { id: 'library', name: 'Librería' },
]

export default function LevelSelect({ onBack, onStart }) {
  return (
    <div className="screen">
      <header className="bar">
        <button onClick={onBack}>{'< Volver'}</button>
        <h2 style={{ margin: 0 }}>Selecciona un escenario</h2>
        <span />
      </header>
      <div className="grid">
        {LEVELS.map(l => (
          <button key={l.id} className="card" onClick={() => onStart(l.id)}>
            <strong>{l.name}</strong>
            <small style={{opacity:.7}}>{l.id}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
