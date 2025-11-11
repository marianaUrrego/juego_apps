import { SpriteSheet } from '../graphics/SpriteSheet'
import { Animation } from '../graphics/Animation'
import type { SpriteConfig } from '../config/sprites/types'
import { Entity } from './Entity'

export class BossEntity extends Entity {
  constructor(cfg: SpriteConfig, x: number, y: number) {
    const sheet = new SpriteSheet({
      imagePath: cfg.imagePath,
      frameWidth: cfg.frameWidth,
      frameHeight: cfg.frameHeight,
      rows: cfg.rows,
      cols: cfg.cols,
    })
    const animations: Record<string, Animation> = {}
    for (const [name, frames] of Object.entries(cfg.animations)) {
      animations[name] = new Animation(frames, { fps: 6, loop: true })
    }
    super({ x, y, speed: 0, spriteSheet: sheet, animations, defaultAnimation: 'idle' })
  }
}
