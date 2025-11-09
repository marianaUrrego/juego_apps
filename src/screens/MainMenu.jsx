export default function MainMenu({ onPlay, onOptions, onCredits }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.panel}>
        <h1 style={{marginTop:0}}>Haunted Hunt</h1>
        <button onClick={onPlay} style={styles.btn}>Jugar</button>
        <button onClick={onOptions} style={styles.btn}>Opciones</button>
        <button onClick={onCredits} style={styles.btn}>Créditos</button>
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    width: '100vw',
    height: '100vh',
    background: 'radial-gradient(1200px 600px at 20% 10%, #232323 0, #141414 60%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    width: 340,
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: 16,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    textAlign: 'center',
  },
  btn: {
    padding: '12px 16px',
    background: '#222',
    border: '1px solid #333',
    borderRadius: 12,
  }
}
