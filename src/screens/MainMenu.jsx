import React from 'react'

export default function MainMenu({ onPlay, onLevelSelect, onHowTo, onSettings }) {
  return (
    <div className="screen centered">
      <h1>Haunted Hunt</h1>
      <div className="menu">
        <button onClick={onPlay}>Jugar</button>
        <button onClick={onLevelSelect}>Seleccionar Nivel</button>
        <button onClick={onHowTo}>Cómo jugar</button>
        <button onClick={onSettings}>Ajustes</button>
      </div>
    </div>
  )
}
