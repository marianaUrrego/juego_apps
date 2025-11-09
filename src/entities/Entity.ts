import { SpriteSheet } from '../graphics/SpriteSheet'
import { Animation } from '../graphics/Animation'

export type InputState = {
  up?: boolean
  down?: boolean
  left?: boolean
  right?: boolean
}

export type EntityOptions = {
  x: number
  y: number
  speed?: number
  spriteSheet: SpriteSheet
  animations: Record<string, Animation>
  defaultAnimation?: string
}

export class Entity {
  x: number
  y: number
  vx: number = 0
  vy: number = 0
  speed: number

  spriteSheet: SpriteSheet
  animations: Record<string, Animation>
  currentAnimationName: string

  constructor(opts: EntityOptions) {
    this.x = opts.x
    this.y = opts.y
    this.speed = opts.speed ?? 60
    this.spriteSheet = opts.spriteSheet
    this.animations = opts.animations
    this.currentAnimationName = opts.defaultAnimation ?? Object.keys(opts.animations)[0]
  }

  setAnimation(name: string) {
    if (this.currentAnimationName === name) return
    if (this.animations[name]) {
      this.currentAnimationName = name
      this.animations[name].reset()
    }
  }

  update(deltaMs: number, input?: InputState) {
    this.vx = 0
    this.vy = 0

    if (input?.left) this.vx = -this.speed
    if (input?.right) this.vx = this.speed
    if (input?.up) this.vy = -this.speed
    if (input?.down) this.vy = this.speed

    const dt = deltaMs / 1000
    this.x += this.vx * dt
    this.y += this.vy * dt

    let anim = this.currentAnimationName
    if (this.vx === 0 && this.vy === 0) {
      if (anim.startsWith('walk')) {
        anim = anim.replace('walk', 'idle') as typeof anim
      }
    } else {
      if (Math.abs(this.vx) > Math.abs(this.vy)) {
        anim = this.vx > 0 ? 'walkRight' : 'walkLeft'
      } else {
        anim = this.vy > 0 ? 'walkDown' : 'walkUp'
      }
    }
    this.setAnimation(anim)

    this.animations[this.currentAnimationName]?.update(deltaMs)
  }

  draw(ctx: CanvasRenderingContext2D, scale: number = 1) {
    const a = this.animations[this.currentAnimationName]
    const frame = a.getFrame()
    this.spriteSheet.drawFrame(ctx, frame.col, frame.row, this.x, this.y, { scale, anchor: 'center' })
  }
}
