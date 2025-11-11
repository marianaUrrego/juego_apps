import type { SpriteConfig } from './types'

const bossUrl = new URL('../../assets/backgrounds/cementery/characters/Boss 03.png', import.meta.url).href

export const boss03Config: SpriteConfig = {
  imagePath: bossUrl,
  frameWidth: 64,
  frameHeight: 64,
  rows: 4,
  cols: 4,
  animations: {
    idle: [
      { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 },
    ],
  },
}
export default boss03Config
