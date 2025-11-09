import { SpriteSheet } from '../graphics/SpriteSheet'
import { Animation } from '../graphics/Animation'
import type { SpriteConfig } from '../config/sprites/types'
import { Entity } from './Entity'

export function createEntityFromConfig(cfg: SpriteConfig, x: number, y: number) {
  const sheet = new SpriteSheet({
    imagePath: cfg.imagePath,
    frameWidth: cfg.frameWidth,
    frameHeight: cfg.frameHeight,
    rows: cfg.rows,
    cols: cfg.cols,
  })

  const animations: Record<string, Animation> = {}
  for (const [name, frames] of Object.entries(cfg.animations)) {
    animations[name] = new Animation(frames, { fps: 8, loop: true })
  }

  const entity = new Entity({
    x,
    y,
    spriteSheet: sheet,
    animations,
    defaultAnimation: 'idleDown' in animations ? 'idleDown' : Object.keys(animations)[0],
  })

  return entity
}
