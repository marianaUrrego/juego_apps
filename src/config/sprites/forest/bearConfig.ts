import type { SpriteConfig } from '../types'

const imgUrl = new URL('../../../assets/backgrounds/forest/characters/Bear/Bear_Idle_1.png', import.meta.url).href
const idle2 = new URL('../../../assets/backgrounds/forest/characters/Bear/Bear_Idle_2.png', import.meta.url).href
const idle3 = new URL('../../../assets/backgrounds/forest/characters/Bear/Bear_Idle_3.png', import.meta.url).href
const idle4 = new URL('../../../assets/backgrounds/forest/characters/Bear/Bear_Idle_4.png', import.meta.url).href

export const bearConfig: SpriteConfig = {
  imagePath: imgUrl,
  frameWidth: 32,
  frameHeight: 32,
  rows: 1,
  cols: 1,
  animations: {
    idleDown: [{ row: 0, col: 0 }],
  },
  idleFrames: [imgUrl, idle2, idle3, idle4]
}
export default bearConfig
