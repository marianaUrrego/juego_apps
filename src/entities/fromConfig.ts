import { SpriteSheet } from '../graphics/SpriteSheet'
import { Animation } from '../graphics/Animation'
import type { SpriteConfig } from '../config/sprites/types'
import { Entity } from './Entity'

export function createEntityFromConfig(cfg: SpriteConfig, x: number, y: number) {
  // If idleFrames are provided, compose a horizontal spritesheet at runtime
  if (cfg.idleFrames && cfg.idleFrames.length > 0) {
    const images: HTMLImageElement[] = []
    const count = cfg.idleFrames.length
    const cw = cfg.frameWidth * count
    const ch = cfg.frameHeight
    const canvas = document.createElement('canvas')
    canvas.width = cw
    canvas.height = ch
    const ctx = canvas.getContext('2d')!

    // Build sync-ish loader; since assets are already imported URLs, they should cache fast
    for (const url of cfg.idleFrames) {
      const img = new Image()
      img.src = url
      images.push(img)
    }

    // Draw when all complete
    // Note: we'll optimistically draw; if some not ready yet, onload will redraw next frame after ready
    const drawAll = () => {
      if (!ctx) return
      ctx.clearRect(0,0,cw,ch)
      images.forEach((img, i) => {
        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, i * cfg.frameWidth, 0, cfg.frameWidth, cfg.frameHeight)
        }
      })
    }
    images.forEach(img => { img.onload = drawAll })
    drawAll()

    const composed = new Image()
    composed.src = canvas.toDataURL()

    const sheet = new SpriteSheet({
      image: composed,
      frameWidth: cfg.frameWidth,
      frameHeight: cfg.frameHeight,
      rows: 1,
      cols: count,
    })

    // Build idle animation frames across the composed row
    const idleFrames = Array.from({ length: count }, (_, i) => ({ row: 0, col: i }))
    const animations: Record<string, Animation> = {
      idleDown: new Animation(idleFrames, { fps: 6, loop: true })
    }

    // Keep any other animations provided
    for (const [name, frames] of Object.entries(cfg.animations || {})) {
      if (!animations[name]) animations[name] = new Animation(frames, { fps: 8, loop: true })
    }

    const entity = new Entity({
      x,
      y,
      spriteSheet: sheet,
      animations,
      defaultAnimation: 'idleDown',
    })
    return entity
  }

  // Fallback: regular spritesheet usage
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
