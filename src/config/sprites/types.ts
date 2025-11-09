import type { Frame } from '../../graphics/SpriteSheet'

export type SpriteConfig = {
  imagePath: string
  frameWidth: number
  frameHeight: number
  rows: number
  cols: number
  animations: Record<string, Frame[]>
}
