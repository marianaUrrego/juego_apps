import React from 'react'

export default function AppLayout({ children }) {
  return (
    <div className="stage-center">
      <div className="app-stage">
        {children}
      </div>
    </div>
  )
}
