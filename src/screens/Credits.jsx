import React from 'react'
import logo from '../assets/logo.png'

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

      <div className="container page__body">
        <div className="credits">
          <div className="credits__brand">
            <div className="logo-box">
              <img src={logo} alt="logo" />
            </div>
            <div>
              <h1>Haunted Hunt</h1>
              <div className="muted">Versión 1.0.0</div>
            </div>
          </div>
          <div className="credits__grid">
            <div>
              <div className="muted">Desarrollo</div>
              <div><b>John Doe</b></div>
              <div className="muted">Lead Developer</div>
            </div>
            <div>
              <div className="muted">Arte</div>
              <div><b>John Doe</b></div>
              <div className="muted">Game Artist</div>
            </div>
            <div>
              <div className="muted">Diseño</div>
              <div><b>John Doe</b></div>
              <div className="muted">UI/UX Designer</div>
            </div>
            <div>
              <div className="muted">Sonido</div>
              <div><b>John Doe</b></div>
              <div className="muted">Sound Designer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
