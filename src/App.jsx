import { useState } from 'react'
import './App.css'
import Splash from './screens/Splash'
import MainMenu from './screens/MainMenu'
import LevelSelect from './screens/LevelSelect'
import Game from './screens/Game'
import Pause from './screens/Pause'
import Results from './screens/Results'
import Settings from './screens/Settings'
import HowTo from './screens/HowTo'

function App() {
  const [screen, setScreen] = useState('splash')
  const [level, setLevel] = useState('forest')
  const [results, setResults] = useState(null)

  const goMenu = () => setScreen('menu')

  return (
    <div id="app-root">
      {screen === 'splash' && (
        <Splash onDone={() => setScreen('menu')} />
      )}

      {screen === 'menu' && (
        <MainMenu
          onPlay={() => setScreen('game')}
          onLevelSelect={() => setScreen('levels')}
          onHowTo={() => setScreen('howto')}
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

      {screen === 'howto' && (
        <HowTo onBack={goMenu} />
      )}
    </div>
  )
}

export default App
