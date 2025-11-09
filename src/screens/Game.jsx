import React, { useMemo } from 'react'
import { getLevelSprites, getObjects } from '../assetsLoader'

export default function Game({ level, onPause, onEnd }) {
  const bg = useMemo(() => {
    switch(level){
      case 'forest': return '#16331f'
      case 'cementery': return '#1b1b22'
      case 'library': return '#2a1f1a'
      default: return '#000'
    }
  }, [level])

  const sprites = useMemo(() => getLevelSprites(level).slice(0, 12), [level])
  const objs = useMemo(() => getObjects(8), [])

  return (
    <div className="game" style={{ background: bg }}>
      <header className="hud">
        <button onClick={onPause}>Pausa</button>
        <div>Escenario: <b>{level}</b></div>
        <button onClick={() => onEnd({ score: Math.floor(Math.random()*100) })}>Terminar</button>
      </header>
      <div className="playfield" style={{ alignContent: 'start' }}>
        <div style={{ width: '100%', maxWidth: 900, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 12 }}>
          {sprites.map((src, i) => (
            <div key={`sp-${i}`} style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid #2a2a2a', borderRadius: 8, padding: 8, display: 'grid', placeItems: 'center' }}>
              <img src={src} alt="sprite" style={{ maxWidth: '72px', maxHeight: '72px', objectFit: 'contain' }} />
            </div>
          ))}
          {objs.map((src, i) => (
            <div key={`ob-${i}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed #3a3a3a', borderRadius: 8, padding: 8, display: 'grid', placeItems: 'center' }}>
              <img src={src} alt="obj" style={{ maxWidth: '64px', maxHeight: '64px', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
