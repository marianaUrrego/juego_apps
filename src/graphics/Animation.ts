import type { Frame } from './SpriteSheet'

export class Animation {
  frames: Frame[]
  frameDurationMs: number
  loop: boolean
  private elapsed: number
  private index: number

  constructor(frames: Frame[], options?: { frameDurationMs?: number; fps?: number; loop?: boolean }) {
    this.frames = frames
    const fps = options?.fps
    this.frameDurationMs = options?.frameDurationMs ?? (fps ? 1000 / fps : 120)
    this.loop = options?.loop ?? true
    this.elapsed = 0
    this.index = 0
  }

  reset() {
    this.elapsed = 0
    this.index = 0
  }

  update(deltaMs: number) {
    if (this.frames.length <= 1) return
    this.elapsed += deltaMs
    while (this.elapsed >= this.frameDurationMs) {
      this.elapsed -= this.frameDurationMs
      if (this.index < this.frames.length - 1) {
        this.index += 1
      } else if (this.loop) {
        this.index = 0
      }
    }
  }

  getFrame(): Frame {
    return this.frames[this.index] ?? this.frames[0]
  }
}
