import React from 'react'
import { useSettingsStore } from '../store/settingsStore'
import styles from './Settings.module.scss'

export default function Settings({ onBack }) {
  const music = useSettingsStore(s => s.volumenMusica)
  const sfx = useSettingsStore(s => s.volumenSFX)
  const mute = useSettingsStore(s => s.mute)
  const setVolumenMusica = useSettingsStore(s => s.setVolumenMusica)
  const setVolumenSFX = useSettingsStore(s => s.setVolumenSFX)
  const toggleMute = useSettingsStore(s => s.toggleMute)

  return (
    <div className={`page ${styles.settings}`}>
      <header className="bar">
        <div className="container">
          <button className="back-btn" onClick={onBack}>{'←'}</button>
          <h2 className="title-md">Ajustes</h2>
          <span />
        </div>
      </header>
      <div className={`container page__body ${styles.settings__body}`}>
        <div className={`panel panel--form ${styles.settings__panel}`}>
          <label className={styles.settings__row}>
            Música {Math.round(music*100)}%
            <input type="range" min={0} max={1} step={0.01} value={music} onChange={e=>setVolumenMusica(parseFloat(e.target.value))} />
          </label>
          <label className={styles.settings__row}>
            SFX {Math.round(sfx*100)}%
            <input type="range" min={0} max={1} step={0.01} value={sfx} onChange={e=>setVolumenSFX(parseFloat(e.target.value))} />
          </label>
          <label className={styles.settings__rowInline}>
            <input type="checkbox" checked={mute} onChange={toggleMute} /> Mute
          </label>
        </div>
      </div>
    </div>
  )
}
