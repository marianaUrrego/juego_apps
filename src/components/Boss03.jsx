import React, { useEffect, useRef } from 'react'
import bossImg from '../assets/backgrounds/cementery/characters/Boss 03.png'

// Boss decorativo: no clickeable, no objetivo. Se mueve suavemente en la parte superior derecha.
export default function Boss03({ width = 120, baseLeft = 86, baseTop = 14, ampX = 6, ampY = 2, speed = 0.00045, zIndex = 1 }){
  const ref = useRef(null)
  const phaseRef = useRef(Math.random() * 1000)
  const rafRef = useRef(0)

  useEffect(() => {
    let last = performance.now()
    function loop(ts){
      const dt = ts - last; last = ts
      phaseRef.current += dt * speed
      const x = baseLeft + ampX * Math.sin(phaseRef.current)
      const y = baseTop + ampY * Math.sin(phaseRef.current * 1.3)
      const el = ref.current
      if (el){
        el.style.left = `${x}%`
        el.style.top = `${y}%`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [baseLeft, baseTop, ampX, ampY, speed])

  return (
    <img
      ref={ref}
      src={bossImg}
      alt="boss-03"
      aria-hidden
      draggable={false}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      style={{ position: 'absolute', transform: 'translate(-50%, -50%)', pointerEvents: 'auto', width, zIndex }}
    />
  )
}
