import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { getLevelSprites, getObjects, getLevelBackground } from '../assetsLoader'
import { createEntityFromConfig } from '../entities/fromConfig'
import { ghostConfig } from '../config/sprites/ghostConfig'
import { enemy06Config } from '../config/sprites/enemy06Config'
import { enemy09Config } from '../config/sprites/enemy09Config'
import { useGameStore, getInitialTimeByDifficulty } from '../store/gameStore'
import { useNavigate } from 'react-router-dom'
import { useRunHistoryStore } from '../store/runHistoryStore'
import { useSettingsStore } from '../store/settingsStore'
import LivesIndicator from '../components/LivesIndicator'
import { FaPause } from 'react-icons/fa'
import styles from './Game.module.scss'
// import { bearConfig } from '../config/sprites/forest/bearConfig'
// import { trollConfig } from '../config/sprites/forest/trollConfig'
// import { golemConfig } from '../config/sprites/forest/golemConfig'
// import { fairyConfig } from '../config/sprites/forest/fairyConfig'
// import { entConfig } from '../config/sprites/forest/entConfig'
// import { rangerConfig } from '../config/sprites/forest/rangerConfig'

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

function preloadImages(urls) {
  const uniq = Array.from(new Set(urls.filter(Boolean)))
  const tasks = uniq.map((src) => new Promise((res) => {
    const img = new Image()
    img.onload = () => res(src)
    img.onerror = () => res(src)
    img.src = src
  }))
  return Promise.all(tasks)
}

export default function Game({ level, onPause, onEnd }) {
  const navigate = useNavigate()
  const timeRemaining = useGameStore(s => s.timeRemaining)
  const status = useGameStore(s => s.status)
  const startLevel = useGameStore(s => s.startLevel)
  const decrement = useGameStore(s => s.decrement)
  const setWon = useGameStore(s => s.setWon)
  const setLost = useGameStore(s => s.setLost)
  const resetLevel = useGameStore(s => s.resetLevel)
  const resetGameSession = useGameStore(s => s.resetGameSession)
  const addScore = useGameStore(s => s.addScore)
  const nivelActual = useGameStore(s => s.nivelActual)
  const lives = useGameStore(s => s.lives)
  const loseLife = useGameStore(s => s.loseLife)
  const setUnlockedLevels = useGameStore(s => s.setUnlockedLevels)
  const desbloquearNivel = useGameStore(s => s.desbloquearNivel)
  const addRun = useRunHistoryStore(s => s.addRun)
  const difficulty = useGameStore(s => s.difficulty)

  const isCementery = level === 'cementery'
  const isForest = level === 'forest'
  const isLibrary = level === 'library'

  const levelName = useMemo(() => {
    switch(level){
      case 'cementery': return 'Cementerio'
      case 'forest': return 'Bosque'
      case 'library': return 'Biblioteca'
      default: return String(level || '')
    }
  }, [level])

  const difficultyLabel = useMemo(() => {
    switch(difficulty){
      case 'facil': return 'fácil'
      case 'medio': return 'medio'
      case 'dificil': return 'difícil'
      default: return String(difficulty || '')
    }
  }, [difficulty])

  const bgColor = useMemo(() => {
    switch(level){
      case 'forest': return '#16331f'
      case 'cementery': return '#0f1420'
      case 'library': return '#2a1f1a'
      default: return '#000'
    }
  }, [level])

  const [targets, setTargets] = useState([]) // arreglo de objetos colocados elegidos como objetivos
  const [found, setFound] = useState([])     // ids encontrados
  const [placed, setPlaced] = useState([])   // objetos colocados en la matriz: { id, src, pos }
  const lastPlacedRef = useRef([])
  const [ready, setReady] = useState(false)
  const [seed, setSeed] = useState(0)
  const [showPause, setShowPause] = useState(false)
  const [showJumpscare, setShowJumpscare] = useState(false)
  const [jumpscareSrc, setJumpscareSrc] = useState(null)
  const jumpscareTimerRef = useRef(null)
  const pauseBtnRef = useRef(null)
  const [isProcessingHit, setIsProcessingHit] = useState(false)

  // Cargar lista de imágenes de jumpscare una vez
  const jumpscareList = useMemo(() => {
    const rec = import.meta.glob('../assets/jumpscares/*.{png,jpg,jpeg}', { eager: true, import: 'default' })
    const list = Object.values(rec)
    // Debug: listar rutas detectadas
    try { console.log('🧩 Jumpscares detectados:', list) } catch {}
    return list
  }, [])
  
  // Música de fondo por nivel
  const musicRef = useRef(null)
  const musicVol = useSettingsStore?.(s => s.volumenMusica)
  const mute = useSettingsStore?.(s => s.mute)

  const forestAudioUrl = useMemo(() => new URL('../assets/audio/forestaudio.mp3', import.meta.url).href, [])
  const cementeryAudioUrl = useMemo(() => new URL('../assets/audio/cementeryaudio.mp3', import.meta.url).href, [])
  const libraryAudioUrl = useMemo(() => new URL('../assets/audio/libraryaudio.mp3', import.meta.url).href, [])

  // Limpieza del timer de jumpscare al desmontar
  useEffect(() => {
    return () => {
      if (jumpscareTimerRef.current) {
        try { clearTimeout(jumpscareTimerRef.current) } catch {}
        jumpscareTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Detener cualquier música previa
    if (musicRef.current) {
      try { musicRef.current.pause(); musicRef.current.currentTime = 0 } catch {}
    }
    // Seleccionar pista por nivel
    let url = null
    if (isForest) url = forestAudioUrl
    else if (isCementery) url = cementeryAudioUrl
    else if (isLibrary) url = libraryAudioUrl
    if (!url) return

    const audio = new Audio(url)
    audio.loop = true
    audio.volume = mute ? 0 : (typeof musicVol === 'number' ? musicVol : 0.5)
    musicRef.current = audio
    // Intentar reproducir
    audio.play().catch(() => {})
    return () => {
      try { audio.pause(); audio.currentTime = 0 } catch {}
    }
  }, [isForest, isCementery, isLibrary])

  // Sincronizar mute/volumen de ajustes
  useEffect(() => {
    const audio = musicRef.current
    if (!audio) return
    audio.volume = mute ? 0 : (typeof musicVol === 'number' ? musicVol : audio.volume)
    if (mute) {
      try { audio.pause() } catch {}
    } else {
      if (audio.paused) audio.play().catch(() => {})
    }
  }, [musicVol, mute])

  useEffect(() => {
    if (!(isCementery || isForest || isLibrary)) return
    let cancelled = false
    async function setup(){
      setReady(false)
      const lvl = isCementery ? 'cementery' : isForest ? 'forest' : 'library'
      const chars = getLevelSprites(lvl)
      const objs = getObjects() // SOLO @objetos
      // Construir matriz primero: elegir posiciones y objetos colocados
      const occupancy = Math.max(24, Math.floor(grid.length * 0.65))
      const indices = sample(grid.map((_, i) => i), occupancy)
      const pool = sample(objs, Math.min(140, objs.length))
      const chosen = sample(pool, occupancy)
      const placedObjects = indices.map((gi, i) => ({ id: `p-${gi}-${i}`, src: chosen[i], pos: grid[gi] }))
      // Precargar fondo + pool + sprites animados
      const bg = getLevelBackground(lvl)
      const extra = isCementery ? [ghostConfig.imagePath, enemy06Config.imagePath, enemy09Config.imagePath] : isForest ? sample(chars, 6) : []
      await preloadImages([bg, ...pool, ...extra])
      if (cancelled) return
      // Objetivos: tomar EXCLUSIVAMENTE desde los colocados
      const t = sample(placedObjects, 8)
      setTargets(t)
      setFound([])
      setPlaced(placedObjects)
      setReady(true)
    }
    setup()
    return () => { cancelled = true }
  }, [isCementery, isForest, isLibrary, seed])

  // Cachear la última matriz no vacía para evitar desapariciones visuales si placed se vacía por error
  useEffect(() => {
    if (placed && placed.length > 0) {
      lastPlacedRef.current = placed
    }
  }, [placed])

  const bgImage = useMemo(() => (isCementery || isForest || isLibrary) ? getLevelBackground(level) : null, [isCementery, isForest, isLibrary, level])
  const sceneAspect = useMemo(() => (level === 'forest' || level === 'library') ? '16 / 9' : '300 / 128', [level])
  const imageFit = useMemo(() => (level === 'forest' || level === 'library') ? 'contain' : 'cover', [level])
  // Matriz más grande
  const grid = useMemo(() => positionsGrid(20, 8), [])
  const canvasRef = useRef(null)

  // Timer: iniciar al estar listo el nivel
  useEffect(() => {
    if (!ready) return
    // Solo autoiniciar cuando el juego está en estado 'idle' (inicio de nivel)
    if (status === 'idle') startLevel(getInitialTimeByDifficulty(difficulty))
  }, [ready, difficulty, status])

  // Intervalo de 1s mientras se juega
  useEffect(() => {
    if (status !== 'playing') return
    if (showPause) return
    const id = setInterval(() => decrement(), 1000)
    return () => clearInterval(id)
  }, [status, showPause])

  // Derivar victoria por colección completa
  useEffect(() => {
    if (!ready || status !== 'playing') return
    if (targets.length > 0 && found.length === targets.length) {
      setWon()
      const score = Math.max(0, Math.round((found.length/Math.max(1,targets.length))*700 + timeRemaining*3))
      addScore({ id: crypto.randomUUID?.() || `${Date.now()}-win`, levelId: nivelActual, score, result: 'win', createdAt: new Date().toISOString() })
      const timeSeconds = getInitialTimeByDifficulty(difficulty) - timeRemaining
      addRun({ levelId: nivelActual, score, timeSeconds, difficulty, result: 'win' })
      // Desbloqueo jerárquico del siguiente nivel
      if (nivelActual === 'cementery') {
        desbloquearNivel('forest')
      } else if (nivelActual === 'forest') {
        desbloquearNivel('library')
      }
    }
  }, [found, targets, ready, status])

  // Derrota al llegar a 0 por tiempo (sin jumpscare). Si hay jumpscare activo, esperar a que termine.
  useEffect(() => {
    if (status !== 'playing') return
    if (showJumpscare) return
    if (timeRemaining === 0 && found.length < targets.length) {
      setLost()
      const score = Math.max(0, Math.round((found.length/Math.max(1,targets.length))*700))
      addScore({ id: crypto.randomUUID?.() || `${Date.now()}-lose`, levelId: nivelActual, score, result: 'lose', createdAt: new Date().toISOString() })
      const timeSeconds = getInitialTimeByDifficulty(difficulty)
      addRun({ levelId: nivelActual, score, timeSeconds, difficulty, result: 'lose' })
    }
  }, [timeRemaining, status, found, targets, showJumpscare])

  // Derrota por quedarse sin vidas (jumpscare si ocurre en <= 30s desde el inicio)
  useEffect(() => {
    if (status !== 'playing') return
    if (lives === 0) {
      const initialTime = getInitialTimeByDifficulty(difficulty)
      const elapsed = Math.max(0, initialTime - timeRemaining)
      if (elapsed <= 30 && jumpscareList.length > 0) {
        // Si ya se está mostrando jumpscare, no duplicar
        if (showJumpscare) return
        const pick = jumpscareList[Math.floor(Math.random() * jumpscareList.length)]
        setJumpscareSrc(pick)
        setShowJumpscare(true)
        try { console.log('⚡ Activando jumpscare (vidas en <=30s):', { elapsed, timeRemaining, pick }) } catch {}
        if (jumpscareTimerRef.current) {
          try { clearTimeout(jumpscareTimerRef.current) } catch {}
        }
        jumpscareTimerRef.current = setTimeout(() => {
          setShowJumpscare(false)
          // Tras el jumpscare, finalizar partida y registrar
          setLost()
          const score = Math.max(0, Math.round((found.length/Math.max(1,targets.length))*700))
          addScore({ id: crypto.randomUUID?.() || `${Date.now()}-lose`, levelId: nivelActual, score, result: 'lose', createdAt: new Date().toISOString() })
          const timeSeconds = initialTime - timeRemaining
          addRun({ levelId: nivelActual, score, timeSeconds, difficulty, result: 'lose' })
          jumpscareTimerRef.current = null
        }, 3000)
        return
      } else {
        // Muerte por vidas después de 30s: Game Over normal
        setLost()
        const score = Math.max(0, Math.round((found.length/Math.max(1,targets.length))*700))
        addScore({ id: crypto.randomUUID?.() || `${Date.now()}-lose`, levelId: nivelActual, score, result: 'lose', createdAt: new Date().toISOString() })
        const timeSeconds = initialTime - timeRemaining
        addRun({ levelId: nivelActual, score, timeSeconds, difficulty, result: 'lose' })
      }
    }
  }, [lives, status, showJumpscare])

  function fmt(sec){
    const m = Math.floor(sec/60).toString().padStart(2,'0')
    const s = Math.floor(sec%60).toString().padStart(2,'0')
    return `${m}:${s}`
  }

  useEffect(() => {
    if (!isCementery || !ready) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext?.('2d')
    if (!canvas || !ctx) return
    ctx.imageSmoothingEnabled = false

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

    // Múltiples entidades animadas (3 enemigos distintos)
    const configs = [ghostConfig, enemy06Config, enemy09Config]
    const entities = [0,1,2].map(i => {
      const x = canvas.width * (0.2 + 0.25 * i)
      const y = canvas.height * (0.55 + 0.04 * i)
      const ent = createEntityFromConfig(configs[i % configs.length], x, y)
      return { ent, dir: i % 2 === 0 ? 1 : -1, phase: Math.random() * 1000, baseY: y }
    })

    let last = performance.now()
    let raf = 0
    function loop(ts){
      const dt = ts - last; last = ts
      ctx.clearRect(0,0,canvas.width,canvas.height)

      const leftBound = canvas.width * 0.08
      const rightBound = canvas.width * 0.92
      for (const state of entities) {
        const { ent } = state
        const input = state.dir > 0 ? { right: true } : { left: true }
        ent.update(dt, input)
        if (ent.x >= rightBound) state.dir = -1
        if (ent.x <= leftBound) state.dir = 1
        state.phase += dt
        ent.y = state.baseY + Math.sin(state.phase * 0.003) * (canvas.height * 0.02)
        ent.draw(ctx, Math.max(1, canvas.width / 300))
      }


      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [isCementery, ready])

  // Canvas para bosque: personajes quietos en animación idle (Bear, Troll, Golem, Fairy, Ent, Ranger)
  useEffect(() => {
    if (!isForest || !ready) return
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

    let raf = 0
    let cancelled = false
    ;(async () => {
      // Orden específico: Golem, Orco(Troll), Hada, Oso, Árbol(Ent)
      const cfgs = [golemConfig, trollConfig, fairyConfig, bearConfig, entConfig]
      const urls = cfgs.map(c => c.imagePath)
      await preloadImages(urls)
      if (cancelled) return

      // Posiciones relativas (x,y en 0..1) para replicar la referencia
      const idlePositions = [
        { x: 0.09, y: 0.90 }, // Golem: esquina inferior izquierda
        { x: 0.20, y: 0.90 }, // Orco (Troll): a la derecha del golem
        { x: 0.50, y: 0.42 }, // Hada: centrada en el aire
        { x: 0.80, y: 0.92 }, // Oso: esquina inferior derecha
        { x: 0.88, y: 0.90 }, // Árbol (Ent): junto al oso
      ]

      // Mapea cada config a una posición fija; mantiene idle sin desplazamiento
      const orderedCfgs = cfgs
      const entities = orderedCfgs.map((cfg, i) => {
        const pos = idlePositions[i]
        const x = canvas.width * pos.x
        const y = canvas.height * pos.y
        const ent = createEntityFromConfig(cfg, x, y)
        return { ent, x, y }
      })

      let last = performance.now()
      function loop(ts){
        const dt = ts - last; last = ts
        ctx.clearRect(0,0,canvas.width,canvas.height)
        const scale = Math.max(1, canvas.width / 300)
        for (const state of entities) {
          const { ent } = state
          // No input de movimiento: se queda en idle
          ent.update(dt, {})
          ent.x = state.x
          ent.y = state.y
          ent.draw(ctx, scale)
        }
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    })()

    return () => { cancelled = true; cancelAnimationFrame(raf); ro.disconnect() }
  }, [isForest, ready])

  function getClientPoint(evt){
    const e = evt?.nativeEvent || evt
    if (e?.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    if (e?.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
    return { x: e?.clientX ?? 0, y: e?.clientY ?? 0 }
  }

  function handleClick(id, evt) {
    if (showPause) return
    if (isProcessingHit) return
    // Zona segura alrededor del botón de pausa: ignorar toques/clicks
    const pt = getClientPoint(evt)
    const safe = 12
    const btn = pauseBtnRef.current
    if (btn) {
      const r = btn.getBoundingClientRect()
      const inPauseArea = pt.x >= (r.left - safe) && pt.x <= (r.right + safe) && pt.y >= (r.top - safe) && pt.y <= (r.bottom + safe)
      if (inPauseArea) return
    }

    setIsProcessingHit(true)
    const isTarget = targets.some(t => t.id === id)
    if (isTarget && !found.includes(id)) {
      const f = [...found, id]
      setFound(f)
      if (f.length === targets.length) {
        const score = Math.max(0, Math.round((f.length/Math.max(1,targets.length))*700 + timeRemaining*3))
        onEnd && onEnd({ score })
      }
    } else if (!isTarget) {
      // Click incorrecto: perder vida
      loseLife()
    }
    // desbloquear entrada tras una breve ventana para evitar doble tap/click
    setTimeout(() => setIsProcessingHit(false), 250)
  }

  if (isCementery || isForest || isLibrary) {
    return (
      <div className={styles.game} style={{ background: bgColor }}>
        <div className={styles.game__body}>
          {status === 'playing' && (
            <div className={styles.game__hud}>
              <div className={styles.game__hudLeft}>
                <button
                  className={styles.game__pauseButton}
                  ref={pauseBtnRef}
                  onClick={() => setShowPause(true)}
                  title="Pausa"
                >
                  <FaPause />
                  <span>Pausa</span>
                </button>
              </div>
              <div className={styles.game__hudRight}>
                <LivesIndicator lives={lives} />
                <span className={`${styles.game__timer} ${timeRemaining <= 10 ? styles['game__timer--danger'] : ''}`}>
                  {fmt(timeRemaining)}
                </span>
              </div>
            </div>
          )}
          {!ready ? (
            <div className={styles.game__panel}>Cargando recursos...</div>
          ) : (
            <div className={styles.game__sceneWrapper} style={{ aspectRatio: sceneAspect }}>
              {bgImage && (
                <img className={styles.game__bg} src={bgImage} alt={`${level}-bg`} style={{ objectFit: imageFit }} />
              )}
              <canvas ref={canvasRef} className={styles.game__canvas} />
              {(placed.length > 0 ? placed : lastPlacedRef.current).map((obj) => (
                <img
                  key={obj.id}
                  className={`${styles.game__object} ${found.includes(obj.id) ? styles['game__object--found'] : ''}`}
                  src={obj.src}
                  alt="item"
                  onPointerDown={(e) => handleClick(obj.id, e)}
                  style={{ left: obj.pos.left, top: obj.pos.top }}
                />
              ))}
            </div>
          )}
          {ready && (
            <div className={styles.game__targets}>
              {targets.map((obj) => (
                <div key={obj.id} className={`${styles.game__target} ${found.includes(obj.id) ? styles['game__target--found'] : ''}`}>
                  <img src={obj.src} alt="target" />
                </div>
              ))}
            </div>
          )}
          {showJumpscare && jumpscareSrc && createPortal(
            (() => { try { console.log('🧠 Activando jumpscare overlay', timeRemaining, showJumpscare) } catch {} ; return (
              <div className={styles.game__jumpscare}>
                <img src={jumpscareSrc} alt="jumpscare" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            )})(),
            document.body
          )}
          {status === 'lost' && (
            <div className={styles.game__overlay}>
              <div className={styles.game__panel}>
                <h3 style={{ margin: 0 }}>Perdiste</h3>
                <div>{timeRemaining === 0 ? 'Se acabó el tiempo.' : 'Te quedaste sin vidas.'}</div>
                <div className={styles.game__actions}>
                  <button className="btn-full" onClick={() => { resetLevel(); setSeed(s=>s+1) }}>Reintentar nivel</button>
                  <button className="btn-full" onClick={() => { resetGameSession(); navigate('/') }}>Volver al inicio</button>
                </div>
              </div>
            </div>
          )}
          {showPause && (
            <div className={`${styles.game__overlay} ${styles['game__overlay--pause']}`}>
              <div className={styles.game__panel}>
                <h3 style={{ margin: 0 }}>Pausa</h3>
                <div className={styles.game__actions}>
                  <button className="btn-full" onClick={() => setShowPause(false)}>Continuar</button>
                  <button className="btn-full" onClick={() => { setShowPause(false); resetGameSession(); navigate('/levels') }}>Salir</button>
                </div>
              </div>
            </div>
          )}
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
