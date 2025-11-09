import React, { useEffect } from 'react'

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 1200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#111',
      color: '#fff'
    }}>
      <div style={{
        width: 96,
        height: 96,
        borderRadius: 16,
        background: '#1f1f1f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 1px #2a2a2a inset, 0 10px 30px rgba(0,0,0,.6)'
      }}>
        <span role="img" aria-label="ghost" style={{ fontSize: 42 }}>👻</span>
      </div>
      <h1 style={{margin: '16px 0 8px'}}>Haunted Hunt</h1>
      <div style={{ width: 200, height: 6, background: '#2a2a2a', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: '65%', height: '100%', background: '#7c7c7c' }} />
      </div>
      <small style={{opacity:.7, marginTop: 8}}>Loading...</small>
    </div>
  )
}
