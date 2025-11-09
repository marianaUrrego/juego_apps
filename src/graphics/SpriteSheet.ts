export type Frame = { row: number; col: number }

export type SpriteSheetOptions = {
  image?: HTMLImageElement
  imagePath?: string
  frameWidth: number
  frameHeight: number
  rows: number
  cols: number
}

export class SpriteSheet {
  image: HTMLImageElement
  frameWidth: number
  frameHeight: number
  rows: number
  cols: number
  ready: boolean = false

  constructor(opts: SpriteSheetOptions) {
    this.frameWidth = opts.frameWidth
    this.frameHeight = opts.frameHeight
    this.rows = opts.rows
    this.cols = opts.cols

    if (opts.image) {
      this.image = opts.image
      this.ready = true
    } else {
      this.image = new Image()
      if (opts.imagePath) {
        this.image.src = opts.imagePath
      }
      this.image.onload = () => {
        this.ready = true
      }
    }
  }

  async load(): Promise<void> {
    if (this.ready) return
    await new Promise<void>((resolve) => {
      if (this.image.complete) {
        this.ready = true
        resolve()
      } else {
        this.image.onload = () => {
          this.ready = true
          resolve()
        }
      }
    })
  }

  drawFrame(
    ctx: CanvasRenderingContext2D,
    frameCol: number,
    frameRow: number,
    x: number,
    y: number,
    options?: { scale?: number; anchor?: 'center' | 'topLeft' }
  ) {
    if (!this.ready) return
    const scale = options?.scale ?? 1
    const anchor = options?.anchor ?? 'center'

    const sx = frameCol * this.frameWidth
    const sy = frameRow * this.frameHeight
    const sw = this.frameWidth
    const sh = this.frameHeight

    let dx = x
    let dy = y
    const dw = sw * scale
    const dh = sh * scale

    if (anchor === 'center') {
      dx = x - dw / 2
      dy = y - dh / 2
    }

    ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh)
  }
}
