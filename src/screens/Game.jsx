import keyIcon from '../assets/objetos/I_Key01.png'
import bookIcon from '../assets/objetos/I_Book.png'

// Characters
import forestIdle from '../assets/backgrounds/forest/characters/Forest Guardian/ForestGuardian_Idle_1.png'
import cementeryEnemy from '../assets/backgrounds/cementery/characters/Enemy 07-1.png'
import libraryChar from '../assets/backgrounds/library/characters/000.png'

// Optional background for cementery (present in assets)
import cementeryBg from '../assets/backgrounds/cementery/Background 300x128.png'

const levelConfig = {
  forest: {
    name: 'Bosque',
    bg: '#0b1f16',
    sprite: forestIdle,
    scale: 2.5,
  },
  cementery: {
    name: 'Cementerio',
    bg: `url(${cementeryBg}) center/cover no-repeat, #0d0d0d`,
    sprite: cementeryEnemy,
    scale: 2.5,
  },
  library: {
    name: 'Librería',
    bg: '#1a1410',
    sprite: libraryChar,
    scale: 2.5,
  }
}

export default function Game({ level, onExit }){
  const cfg = levelConfig[level] ?? levelConfig.forest

  return (
    <div style={{...styles.wrap, background: cfg.bg}}>
      <div style={styles.hud}>
        <div style={styles.hudLeft}>
          <div style={styles.badge}>{cfg.name}</div>
        </div>
        <div style={styles.hudRight}>
          <img src={keyIcon} alt="key" style={styles.icon}/>
          <img src={bookIcon} alt="book" style={styles.icon}/>
          <button onClick={onExit} style={styles.btn}>Pausa / Salir</button>
        </div>
      </div>

      <div style={styles.stage}>
        <img src={cfg.sprite} alt="sprite" style={{ width: 32*cfg.scale, imageRendering:'pixelated'}}/>
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    width: '100vw', height: '100vh', display:'flex', flexDirection:'column'
  },
  hud: {
    display:'flex', justifyContent:'space-between', alignItems:'center', padding: 12,
    background: 'rgba(0,0,0,.35)', borderBottom: '1px solid #2a2a2a'
  },
  hudLeft: { display:'flex', gap:8, alignItems:'center' },
  hudRight: { display:'flex', gap:8, alignItems:'center' },
  badge: { padding:'6px 10px', background:'#222', border:'1px solid #333', borderRadius: 999, fontSize: 12 },
  icon: { width: 20, height: 20, objectFit:'contain' },
  btn: { padding: '8px 12px', background: '#222', border: '1px solid #333', borderRadius: 10 },
  stage: { flex:1, display:'grid', placeItems:'center' }
}
