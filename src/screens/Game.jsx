import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getLevelSprites, getObjects, getLevelBackground } from '../assetsLoader'
import { createEntityFromConfig } from '../entities/fromConfig'
import { ghostConfig } from '../config/sprites/ghostConfig'

function sample(arr, n) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]] }
  return copy.slice(0, n)
}

function positionsGrid(cols, rows) {
  const list = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c + 0.5) * (100 / cols)
      const y = (r + 0.5) * (100 / rows)
      list.push({ left: `${x}%`, top: `${y}%` })
    }
  }
  return list
}

export default function Game({ level, onPause, onEnd }) {
  const isCementery = level === 'cementery'

  const bgColor = useMemo(() => {
    switch(level){
      case 'forest': return '#16331f'
      case 'cementery': return '#0f1420'
      case 'library': return '#2a1f1a'
      default: return '#000'
    }
  }, [level])

  const [targets, setTargets] = useState([])
  const [found, setFound] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!isCementery) return
    const chars = getLevelSprites('cementery')
    const objs = getObjects()
    const pool = sample([...chars, ...objs], 24)
    const t = sample(pool, 6)
    setTargets(t)
    setFound([])
    setItems(pool)
  }, [isCementery])

  const bgImage = useMemo(() => isCementery ? getLevelBackground('cementery') : null, [isCementery])
  const grid = useMemo(() => positionsGrid(14, 5), [])
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isCementery) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext?.('2d')
    if (!canvas || !ctx) return

    function fit() {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas.width = Math.floor(rect.width)
      canvas.height = Math.floor(rect.height)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(canvas.parentElement)

    const entity = createEntityFromConfig(ghostConfig, canvas.width * 0.25, canvas.height * 0.6)
    let dir = 1
    const leftBound = canvas.width * 0.15
    const rightBound = canvas.width * 0.85
    const baseY = canvas.height * 0.6
    let tAccum = 0
    let last = performance.now()
    let raf = 0
    function loop(ts){
      const dt = ts - last; last = ts
      ctx.clearRect(0,0,canvas.width,canvas.height)
      tAccum += dt
      const input = dir > 0 ? { right: true } : { left: true }
      entity.update(dt, input)
      if (entity.x >= rightBound) dir = -1
      if (entity.x <= leftBound) dir = 1
      entity.y = baseY + Math.sin(tAccum * 0.003) * (canvas.height * 0.02)
      entity.draw(ctx, Math.max(1, canvas.width / 300))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [isCementery])

  function handleClick(src) {
    if (targets.includes(src) && !found.includes(src)) {
      const f = [...found, src]
      setFound(f)
      if (f.length === targets.length) onEnd && onEnd({ score: 100 })
    }
  }

  if (isCementery) {
    const occupancy = Math.max(12, Math.floor(grid.length * 0.45))
    const indices = useMemo(() => sample(grid.map((_, i) => i), occupancy), [grid])
    const placed = useMemo(() => sample(items, occupancy), [items, occupancy])
    return (
      <div className="game" style={{ background: bgColor }}>
        <header className="hud">
          <button onClick={onPause}>Pausa</button>
          <div>Escenario: <b>Cementerio</b></div>
          <button onClick={() => onEnd({ score: (found.length/Math.max(1,targets.length))*100 })}>Terminar</button>
        </header>
        <div className="playfield" style={{ alignContent: 'start' }}>
          <div className="scene" style={{ position: 'relative', width: 'min(960px, 95%)', aspectRatio: '300 / 128' }}>
            {bgImage && (
              <img src={bgImage} alt="cementery-bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
            {placed.map((src, idx) => {
              const gi = indices[idx]
              const pos = grid[gi]
              return (
                <img
                  key={`${gi}-${idx}`}
                  src={src}
                  alt="item"
                  onClick={() => handleClick(src)}
                  style={{ position: 'absolute', transform: 'translate(-50%, -50%)', cursor: 'pointer', left: pos.left, top: pos.top, maxWidth: 64, maxHeight: 64, imageRendering: 'pixelated', filter: found.includes(src) ? 'grayscale(1) opacity(0.4)' : 'none' }}
                />
              )
            })}
          </div>
          <div className="targets" style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {targets.map((src, i) => (
              <div key={`t-${i}`} style={{ width: 56, height: 56, borderRadius: 8, border: '1px solid #2a2a2a', background: '#121212', display: 'grid', placeItems: 'center', opacity: found.includes(src) ? 0.4 : 1 }}>
                <img src={src} alt="target" style={{ maxWidth: 40, maxHeight: 40, objectFit: 'contain', imageRendering: 'pixelated' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const sprites = useMemo(() => getLevelSprites(level).slice(0, 12), [level])
  const objs = useMemo(() => getObjects(8), [])

  return (
    <div className="game" style={{ background: bgColor }}>
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
