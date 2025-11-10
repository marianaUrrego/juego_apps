import React from 'react'

const DATA = [
  { rank: 1, time: '1:00', score: '8,450' },
  { rank: 2, time: '1:20', score: '7,320' },
  { rank: 3, time: '1:50', score: '6,890' },
  { rank: 4, time: '2:00', score: '5,670' },
  { rank: 5, time: '2:20', score: '5,120' },
]

export default function Scores({ onBack }) {
  return (
    <div className="page scores-page">
      <header className="bar">
        <button className="back-btn" onClick={onBack}>{'←'}</button>
        <h2 className="title-md">Puntajes</h2>
        <span />
      </header>

      <div className="scores">
        <div className="scores__table">
          <div className="table table--scores">
            <div className="table__head">
              <div>#</div>
              <div>Mejor tiempo</div>
              <div>Puntos</div>
            </div>
            <div className="table__body">
              {DATA.map(row => (
                <div key={row.rank} className="table__row">
                  <div className="rank">{row.rank}</div>
                  <div>{row.time}</div>
                  <div className="score">{row.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
