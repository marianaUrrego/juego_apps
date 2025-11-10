import { useState } from 'react'
import './styles/main.scss'
import Splash from './screens/Splash'
import MainMenu from './screens/MainMenu'
import LevelSelect from './screens/LevelSelect'
import Game from './screens/Game'
import Pause from './screens/Pause'
import Results from './screens/Results'
import Settings from './screens/Settings'
import Scores from './screens/Scores'
import Credits from './screens/Credits'
import AppLayout from './layout/AppLayout'

function App() {
  const [screen, setScreen] = useState('splash')
  const [level, setLevel] = useState('forest')
  const [results, setResults] = useState(null)

  const goMenu = () => setScreen('menu')

  return (
    <AppLayout>
      {screen === 'splash' && (
        <Splash onDone={() => setScreen('menu')} />
      )}

      {screen === 'menu' && (
        <MainMenu
          onPlay={() => setScreen('levels')}
          onScores={() => setScreen('scores')}
          onCredits={() => setScreen('credits')}
          onSettings={() => setScreen('settings')}
        />
      )}

      {screen === 'levels' && (
        <LevelSelect
          onBack={goMenu}
          onStart={(lvl) => { setLevel(lvl); setScreen('game') }}
        />
      )}

      {screen === 'game' && (
        <Game
          level={level}
          onPause={() => setScreen('pause')}
          onEnd={(data) => { setResults(data); setScreen('results') }}
        />
      )}

      {screen === 'pause' && (
        <Pause
          onResume={() => setScreen('game')}
          onQuit={goMenu}
        />
      )}

      {screen === 'results' && (
        <Results
          data={results}
          onMenu={goMenu}
          onReplay={() => setScreen('game')}
        />
      )}

      {screen === 'settings' && (
        <Settings onBack={goMenu} />
      )}

      {screen === 'scores' && (
        <Scores onBack={goMenu} />
      )}

      {screen === 'credits' && (
        <Credits onBack={goMenu} />
      )}
    </AppLayout>
  )
}

export default App
