import type { SpriteConfig } from './types'

const enemy09Url = new URL('../../assets/backgrounds/cementery/characters/Enemy 09-1.png', import.meta.url).href

export const enemy09Config: SpriteConfig = {
  imagePath: enemy09Url,
  frameWidth: 32,
  frameHeight: 32,
  rows: 4,
  cols: 3,
  animations: {
    idleDown:  [{ row: 0, col: 0 }],
    walkDown:  [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
    walkLeft:  [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }],
    walkRight: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }],
    walkUp:    [{ row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 }],
  }
}
export default enemy09Config
