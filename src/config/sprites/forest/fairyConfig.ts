import type { SpriteConfig } from '../types'

const imgUrl = new URL('../../../assets/backgrounds/forest/characters/Fairy/Fairy_Idle + Walk_1.png', import.meta.url).href
const idle2 = new URL('../../../assets/backgrounds/forest/characters/Fairy/Fairy_Idle + Walk_2.png', import.meta.url).href
const idle3 = new URL('../../../assets/backgrounds/forest/characters/Fairy/Fairy_Idle + Walk_3.png', import.meta.url).href
const idle4 = new URL('../../../assets/backgrounds/forest/characters/Fairy/Fairy_Idle + Walk_4.png', import.meta.url).href

export const fairyConfig: SpriteConfig = {
  imagePath: imgUrl,
  frameWidth: 32,
  frameHeight: 32,
  rows: 1,
  cols: 1,
  animations: {
    idleDown: [{ row: 0, col: 0 }],
    walkDown: [{ row: 0, col: 0 }],
    walkLeft: [{ row: 0, col: 0 }],
    walkRight: [{ row: 0, col: 0 }],
    walkUp: [{ row: 0, col: 0 }],
  },
  idleFrames: [imgUrl, idle2, idle3, idle4]
}
export default fairyConfig
