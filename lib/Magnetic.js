import gsap from 'gsap'

export default class Magnetic {
  constructor (el, options = { y: .2, x: .2, s: .2, rs: .7 }) {
    this.el = el

    this.options = options

    this.y = 0
    this.x = 0
    this.width = 0
    this.height = 0

    if (this.el.dataset.magnetized) return
    this.el.dataset.magnetized = true

    this.eventsBinding()
  }

  eventsBinding () {
    this.el.addEventListener('mouseenter', () => {
      this.y = this.el.offsetTop - window.pageYOffset
      this.x = this.el.offsetLeft - window.pageXOffset

      this.width = this.el.offsetWidth
      this.height = this.el.offsetHeight
    })

    this.el.addEventListener('mousemove', e => {
      const y = (e.clientY - this.y - this.height / 2) * this.options.y
      const x = (e.clientX - this.x - this.width / 2) * this.options.x

      this.move(x, y, this.options.s)
    })

    this.el.addEventListener('mouseleave', () => this.move(0, 0, this.options.rs))
  }

  move (x, y, speed) {
    gsap.to(this.el, {
      y,
      x,
      force3D: true,
      overwrite: true,
      duration: speed
    })
  }
}
