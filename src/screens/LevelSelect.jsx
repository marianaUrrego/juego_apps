import React from 'react'

const LEVELS = [
  { id: 'cementery', name: 'Cementerio', subtitle: 'Nivel 1 · Desbloqueado', unlocked: true },
  { id: 'library', name: 'Biblioteca Embrujada', subtitle: 'Nivel 2 · Desbloqueado', unlocked: true },
  { id: 'forest', name: 'Bosque Oscuro', subtitle: 'Nivel 3 · Bloqueado', unlocked: false },
]

export default function LevelSelect({ onBack, onStart }) {
  return (
    <div className="page level-select">
      <header className="bar level-header">
        <div className="container">
          <div><button className="back-btn" onClick={onBack}>{'←'}</button></div>
          <h2 className="title-md">Selecciona Nivel</h2>
          <span />
        </div>
      </header>

      <div className="container page__body">
        <div className="levels-row">
          {LEVELS.map(l => {
            const disabled = !l.unlocked
            return (
              <div key={l.id} className={`level-card ${disabled ? 'is-disabled' : ''}`}>
                <div className="level-card__top">
                  <div className="icon-box" />
                  <div>
                    <div style={{ fontWeight: 700 }}>{l.name}</div>
                    <div className="subtitle">{l.subtitle}</div>
                  </div>
                  {l.unlocked && <span style={{ fontSize: 18 }}>✔</span>}
                </div>
                <div style={{ marginTop: 12 }}>
                  <button className="btn-full" onClick={() => !disabled && onStart(l.id)} disabled={disabled}>
                    {disabled ? 'Bloqueado' : 'Jugar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
