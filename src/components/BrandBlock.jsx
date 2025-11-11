import React from 'react'
import logo from '../assets/logo.png'

export default function BrandBlock({ showVersion = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="logo-box" style={{ width: 160, height: 160, borderRadius: 20, background: 'color-mix(in oklab, var(--c-1) 30%, transparent)', display: 'grid', placeItems: 'center', border: '1px solid color-mix(in oklab, var(--c-3) 30%, transparent)' }}>
        <img src={logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      </div>
      <h1 style={{ whiteSpace: 'nowrap', margin: '10px 0 0', textAlign: 'center' }}>Haunted Hunt</h1>
      {showVersion && (
        <div className="muted" style={{ marginTop: 6 }}>Versión 1.0.0</div>
      )}
    </div>
  )
}
