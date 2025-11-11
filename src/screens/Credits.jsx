import React from 'react'
import logo from '../assets/logo.png'
import BrandBlock from '../components/BrandBlock'
import styles from './Credits.module.scss'

export default function Credits({ onBack }) {
  return (
    <div className={`page ${styles.credits}`}>
      <header className="bar">
        <div className="container">
          <button className="back-btn" onClick={onBack}>{'←'}</button>
          <h2 className="title-md">Créditos</h2>
          <span />
        </div>
      </header>

      <div className="container page__body">
        <div className={styles.credits__container}>
          <div className={styles.credits__grid}>
            <div className={styles.credits__brand}>
              <BrandBlock showVersion />
            </div>
            <div className={styles.credits__list}>
              <div>
                <div className={styles.credits__muted}>Equipo</div>
                <div className={styles.credits__spacedTop}>
                  <div><b>Mariana Urrego</b></div>
                  <div className={styles.credits__muted}>Desarrollo · Diseño · Arte · Sonido</div>
                </div>
                <div className={styles.credits__section}>
                  <div><b>Juanita Correa</b></div>
                  <div className={styles.credits__muted}>Desarrollo · Diseño · Arte · Sonido</div>
                </div>
              </div>
              <div className={styles.credits__section}>
                <div className={styles.credits__muted}>Recursos artísticos</div>
                <div className={`${styles.credits__spacedTop} ${styles.credits__links}`}>
                  <a className={styles.credits__muted} href="https://neopixelboyco.itch.io/background-cementery-pixel-art" target="_blank" rel="noopener noreferrer">NeopixelBoy</a>
                  <a className={styles.credits__muted} href="https://superdark.itch.io/enchanted-forest-characters" target="_blank" rel="noopener noreferrer">Superdark</a>
                  <a className={styles.credits__muted} href="https://seeone.itch.io/haunted-library" target="_blank" rel="noopener noreferrer">SeeOne – Haunted Library</a>
                  <a className={styles.credits__muted} href="https://seeone.itch.io/forest" target="_blank" rel="noopener noreferrer">SeeOne – Forest</a>
                  <a className={styles.credits__muted} href="https://pipoya.itch.io/pipoya-free-rpg-character-sprites-32x32" target="_blank" rel="noopener noreferrer">Pipoya</a>
                  <a className={styles.credits__muted} href="https://unluckystudio.com/free-game-art-for-commercial-use" target="_blank" rel="noopener noreferrer">UnLucky Studio</a>
                </div>
              </div>
              <div className={styles.credits__section}>
                <div className={styles.credits__muted}>Sonido</div>
                <div className={`${styles.credits__muted} ${styles.credits__spacedTop}`}>Pendiente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
