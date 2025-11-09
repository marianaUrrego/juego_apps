import React, { useState } from 'react'

export default function Settings({ onBack }) {
  const [music, setMusic] = useState(0.6)
  const [sfx, setSfx] = useState(0.8)
  return (
    <div className="screen">
      <header className="bar">
        <button onClick={onBack}>{'< Volver'}</button>
        <h2 style={{ margin: 0 }}>Ajustes</h2>
        <span />
      </header>
      <div style={{ padding: 24, display: 'grid', gap: 16 }}>
        <label>
          Música {Math.round(music*100)}%
          <input type="range" min={0} max={1} step={0.01} value={music} onChange={e=>setMusic(parseFloat(e.target.value))} />
        </label>
        <label>
          SFX {Math.round(sfx*100)}%
          <input type="range" min={0} max={1} step={0.01} value={sfx} onChange={e=>setSfx(parseFloat(e.target.value))} />
        </label>
      </div>
    </div>
  )
}
