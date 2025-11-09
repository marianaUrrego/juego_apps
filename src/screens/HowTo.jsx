import React from 'react'

export default function HowTo({ onBack }) {
  return (
    <div className="screen">
      <header className="bar">
        <button onClick={onBack}>{'< Volver'}</button>
        <h2 style={{ margin: 0 }}>Cómo jugar</h2>
        <span />
      </header>
      <div style={{ padding: 24, display: 'grid', gap: 10 }}>
        <p>Encuentra objetos en escenarios embrujados. Usa el mouse/táctil para seleccionar.</p>
        <ul>
          <li>Forest: usa sprites del bosque.</li>
          <li>Cementery: sprites del cementerio.</li>
          <li>Library: sprites de la librería.</li>
        </ul>
      </div>
    </div>
  )
}
