import React from 'react'
import logo from '../assets/logo.png'

export default function BrandBlock({ showVersion = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(.75rem, 2.5vw, 1.25rem)' }}>
      <div className="brand-box">
        <img src={logo} alt="logo" style={{ width: '75%', height: 'auto', objectFit: 'contain', display: 'block' }} />
      </div>
      <div>
        <h1 className="title-xl" style={{ whiteSpace: 'nowrap', margin: 0 }}>Haunted Hunt</h1>
        {showVersion && (
          <div className="muted" style={{ marginTop: 6 }}>Versión 1.0.0</div>
        )}
      </div>
    </div>
  )
}
