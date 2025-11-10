export class SpriteSheet {
  constructor(opts) {
    this.frameWidth = opts.frameWidth
    this.frameHeight = opts.frameHeight
    this.rows = opts.rows
    this.cols = opts.cols
    this.image = opts.image || new Image()
    this.ready = !!opts.image
    if (!opts.image && opts.imagePath) {
      this.image.src = opts.imagePath
      this.image.onload = () => { this.ready = true }
    }
  }
  async load() {
    if (this.ready) return
    await new Promise((resolve) => {
      if (this.image.complete) { this.ready = true; resolve() }
      else { this.image.onload = () => { this.ready = true; resolve() } }
    })
  }
  drawFrame(ctx, frameCol, frameRow, x, y, options) {
    if (!this.ready) return
    const scale = (options && options.scale) || 1
    const anchor = (options && options.anchor) || 'center'
    const sx = frameCol * this.frameWidth
    const sy = frameRow * this.frameHeight
    const sw = this.frameWidth
    const sh = this.frameHeight
    let dx = x, dy = y
    const dw = sw * scale
    const dh = sh * scale
    if (anchor === 'center') { dx = x - dw / 2; dy = y - dh / 2 }
    ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh)
  }
}
