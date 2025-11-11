import React from 'react'
import logo from '../assets/logo.png'
import BrandBlock from '../components/BrandBlock'
import styles from './Credits.module.scss'

export default function Credits({ onBack }) {
  return (
    <div className="page credits-page">
      <header className="bar">
        <div className="container">
          <button className="back-btn" onClick={onBack}>{'←'}</button>
          <h2 className="title-md">Créditos</h2>
          <span />
        </div>
      </header>

      <div className="container page__body" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 96px)' }}>
          <div className="credits" style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center', justifyContent: 'center' }}>
            <div className="credits__brand">
              <BrandBlock showVersion />
            </div>
            <div className="credits__grid" style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
              <div>
                <div className="muted">Equipo</div>
                <div style={{ marginTop: 6 }}>
                  <div><b>Mariana Urrego</b></div>
                  <div className="muted">Desarrollo · Diseño · Arte · Sonido</div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <div><b>Juanita Correa</b></div>
                  <div className="muted">Desarrollo · Diseño · Arte · Sonido</div>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div className="muted">Recursos artísticos</div>
                <div style={{ marginTop: 6, display: 'grid', gap: 6 }}>
                  <a className="muted" href="https://neopixelboyco.itch.io/background-cementery-pixel-art" target="_blank" rel="noopener noreferrer">NeopixelBoy</a>
                  <a className="muted" href="https://superdark.itch.io/enchanted-forest-characters" target="_blank" rel="noopener noreferrer">Superdark</a>
                  <a className="muted" href="https://seeone.itch.io/haunted-library" target="_blank" rel="noopener noreferrer">SeeOne – Haunted Library</a>
                  <a className="muted" href="https://seeone.itch.io/forest" target="_blank" rel="noopener noreferrer">SeeOne – Forest</a>
                  <a className="muted" href="https://pipoya.itch.io/pipoya-free-rpg-character-sprites-32x32" target="_blank" rel="noopener noreferrer">Pipoya</a>
                  <a className="muted" href="https://unluckystudio.com/free-game-art-for-commercial-use" target="_blank" rel="noopener noreferrer">UnLucky Studio</a>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div className="muted">Sonido</div>
                <div className="muted" style={{ marginTop: 6 }}>Pendiente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
