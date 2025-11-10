import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <div className="container page__body">
        <div className="panel" style={{ textAlign: 'center' }}>
          <h2>404 - No encontrado</h2>
          <p>La ruta solicitada no existe.</p>
          <Link className="btn-full" to="/">Ir al inicio</Link>
        </div>
      </div>
    </div>
  )
}
