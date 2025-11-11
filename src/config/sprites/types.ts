import type { Frame } from '../../graphics/SpriteSheet'

export type SpriteConfig = {
  imagePath: string
  frameWidth: number
  frameHeight: number
  rows: number
  cols: number
  animations: Record<string, Frame[]>
  // Optional: when provided, we'll compose a horizontal spritesheet from these single-frame images (idle sequence)
  idleFrames?: string[]
}
