import { useState, useCallback } from 'react'
import './App.css'
import Splash from './screens/Splash.jsx'
import MainMenu from './screens/MainMenu.jsx'
import LevelSelect from './screens/LevelSelect.jsx'
import Game from './screens/Game.jsx'

function App() {
  const [screen, setScreen] = useState('splash') // 'splash' | 'menu' | 'select' | 'game'
  const [level, setLevel] = useState('forest')

  const goMenu = useCallback(() => setScreen('menu'), [])
  const goSelect = useCallback(() => setScreen('select'), [])
  const startLevel = useCallback((lvl) => {
    setLevel(lvl)
    setScreen('game')
  }, [])
  const exitGame = useCallback(() => setScreen('menu'), [])

  if (screen === 'splash') {
    return <Splash onDone={goMenu} />
  }

  if (screen === 'menu') {
    return (
      <MainMenu
        onPlay={goSelect}
        onOptions={() => alert('Opciones próximamente')}
        onCredits={() => alert('Créditos próximamente')}
      />
    )
  }

  if (screen === 'select') {
    return <LevelSelect onBack={goMenu} onSelect={startLevel} />
  }

  return <Game level={level} onExit={exitGame} />
}

export default App
