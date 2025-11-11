import type { SpriteConfig } from '../types'

const imgUrl = new URL('../../../assets/backgrounds/forest/characters/Ranger/Ranger_Idle_1.png', import.meta.url).href

export const rangerConfig: SpriteConfig = {
  imagePath: imgUrl,
  frameWidth: 32,
  frameHeight: 32,
  rows: 1,
  cols: 1,
  animations: {
    idleDown: [{ row: 0, col: 0 }],
  }
}
export default rangerConfig
