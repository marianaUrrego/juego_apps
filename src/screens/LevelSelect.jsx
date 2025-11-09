export default function LevelSelect({ onBack, onSelect }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.grid}>
        <LevelCard title="Bosque" hint="Criaturas élficas" onClick={() => onSelect('forest')} color="#0c4128"/>
        <LevelCard title="Cementerio" hint="No-muertos" onClick={() => onSelect('cementery')} color="#3d3d3d"/>
        <LevelCard title="Librería" hint="Magos y libros" onClick={() => onSelect('library')} color="#3b2f1c"/>
      </div>
      <button onClick={onBack} style={styles.back}>← Volver</button>
    </div>
  )
}

function LevelCard({ title, hint, onClick, color }){
  return (
    <button onClick={onClick} style={{...styles.card, background: `linear-gradient(180deg, ${color}, #141414)`}}>
      <div style={styles.cardTitle}>{title}</div>
      <div style={styles.cardHint}>{hint}</div>
    </button>
  )
}

const styles = {
  wrap: {
    width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
    background: '#101010'
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 220px)', gap: 16
  },
  card: {
    height: 140, border: '1px solid #2a2a2a', borderRadius: 16, padding: 16, textAlign: 'left', color: '#fff'
  },
  cardTitle: { fontSize: 18, fontWeight: 600 },
  cardHint: { fontSize: 12, opacity: .75 },
  back: { padding: '10px 14px', background: '#222', border: '1px solid #333', borderRadius: 12 }
}
