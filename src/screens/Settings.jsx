import React, { useState } from 'react'

export default function Settings({ onBack }) {
  const [music, setMusic] = useState(0.6)
  const [sfx, setSfx] = useState(0.8)
  return (
    <div className="page">
      <header className="bar">
        <div className="container">
          <button className="back-btn" onClick={onBack}>{'←'}</button>
          <h2 className="title-md">Ajustes</h2>
          <span />
        </div>
      </header>
      <div className="container page__body" style={{ paddingBlock: 24, display: 'grid', gap: 16 }}>
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
