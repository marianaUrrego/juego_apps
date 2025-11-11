import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import styles from './Splash.module.scss'

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 1200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className={`screen ${styles.splash}`}>
      <div className={styles.splash__container}>
        <div className={styles.splash__brandBox}>
          <img src={logo} alt="logo" />
        </div>
        <h1 className={styles.splash__title}>Haunted Hunt</h1>
        <div className={styles.splash__progress}>
          <div className={styles.splash__bar} />
        </div>
        <small style={{ opacity: .8 }}>Loading...</small>
      </div>
    </div>
  )
}
