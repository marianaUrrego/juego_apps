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
        <div className={styles.credits__layout}>
          <div className={styles.credits__brandBlock}>
            <BrandBlock showVersion />
          </div>
          <div className={styles.credits__info}>
            <div className={styles.credits__col}>
              <h3 className={styles.credits__title}>Equipo</h3>
              <div className={styles.credits__person}>
                <div><b>Mariana Urrego</b></div>
                <div className={styles.credits__muted}>Desarrollo · Diseño · Arte · Sonido</div>
              </div>
              <div className={styles.credits__person}>
                <div><b>Juanita Correa</b></div>
                <div className={styles.credits__muted}>Desarrollo · Diseño · Arte · Sonido</div>
              </div>
            </div>
            <div className={styles.credits__col}>
              <h3 className={styles.credits__title}>Recursos artísticos</h3>
              <div className={styles.credits__links}>
                <a className={styles.credits__link} href="https://neopixelboyco.itch.io/background-cementery-pixel-art" target="_blank" rel="noopener noreferrer">NeopixelBoy</a>
                <a className={styles.credits__link} href="https://superdark.itch.io/enchanted-forest-characters" target="_blank" rel="noopener noreferrer">Superdark</a>
                <a className={styles.credits__link} href="https://seeone.itch.io/haunted-library" target="_blank" rel="noopener noreferrer">SeeOne – Haunted Library</a>
                <a className={styles.credits__link} href="https://seeone.itch.io/forest" target="_blank" rel="noopener noreferrer">SeeOne – Forest</a>
                <a className={styles.credits__link} href="https://pipoya.itch.io/pipoya-free-rpg-character-sprites-32x32" target="_blank" rel="noopener noreferrer">Pipoya</a>
                <a className={styles.credits__link} href="https://unluckystudio.com/free-game-art-for-commercial-use" target="_blank" rel="noopener noreferrer">UnLucky Studio</a>
              </div>
            </div>
            <div className={styles.credits__sound}>
              <h3 className={styles.credits__title}>Sonido</h3>
              <div className={styles.credits__links}>
                <a className={styles.credits__link} href="https://pixabay.com/users/idoberg-34953295" target="_blank" rel="noopener noreferrer">IDOBERG</a>
                <a className={styles.credits__link} href="https://pixabay.com/users/lofivision-46059742" target="_blank" rel="noopener noreferrer">LofiVision</a>
                <a className={styles.credits__link} href="https://pixabay.com/users/u_5hx6qi66bg-49115312" target="_blank" rel="noopener noreferrer">u_5hx6qi66bg</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
