import { useEffect } from 'react'

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(), 1500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.ghost}>👻</div>
        <h1 style={styles.title}>Haunted Hunt</h1>
        <div style={styles.bar}><div style={styles.fill} /></div>
        <div style={styles.loading}>Loading...</div>
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    width: '100vw',
    height: '100vh',
    background: '#141414',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  ghost: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: '#1f1f1f',
    display: 'grid',
    placeItems: 'center',
    fontSize: 32,
  },
  title: { margin: 0, fontWeight: 600 },
  bar: {
    width: '100%',
    height: 6,
    background: '#2b2b2b',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    width: '60%',
    height: '100%',
    background: '#5a5a5a',
  },
  loading: { fontSize: 12, color: '#8a8a8a' },
}
