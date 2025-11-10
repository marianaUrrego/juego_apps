import React, { useEffect } from 'react'
import logo from '../assets/logo.png'

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 1200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="screen" style={{ padding: 48 }}>
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ width: 160, height: 160, borderRadius: 20, background: 'color-mix(in oklab, var(--c-1) 30%, transparent)', display: 'grid', placeItems: 'center', border: '1px solid color-mix(in oklab, var(--c-3) 30%, transparent)' }}>
          <img src={logo} alt="logo" style={{ width: 120, height: 120, objectFit: 'contain' }} />
        </div>
        <h1 style={{ fontSize: 48, margin: 0 }}>Haunted Hunt</h1>
        <div style={{ width: 260, height: 8, background: 'color-mix(in oklab, var(--c-1) 45%, transparent)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '70%', height: '100%', background: 'var(--c-3)' }} />
        </div>
        <small style={{ opacity: .8 }}>Loading...</small>
      </div>
    </div>
  )
}
