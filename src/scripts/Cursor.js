import gsap from 'gsap'

export default class Cursor {
  constructor () {
    if(document.getElementById('cursor')) return
    this.init()
  }

  init () {
    this.DOMWarmUp()
    this.eventsBinding()
    this.move(-window.innerWidth, -window.innerHeight, 0)
  }

  DOMWarmUp () {
    this.el = document.createElement('div')
    this.el.id = 'cursor'

    document.body.appendChild(this.el)
  }

  eventsBinding () {
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.addEventListener('mouseenter', () => this.hide())
      iframe.addEventListener('mouseleave', () => this.show())
    })

    document.body.addEventListener('mousedown', () => this.setState('-active'))
    document.body.addEventListener('mouseup', () => this.removeState('-active'))
    document.body.addEventListener('mouseleave', () => this.hide())
    document.body.addEventListener('mouseenter', () => this.show())
    document.body.addEventListener('mousemove', e => {
      this.pos = {
        x: this.stick ? this.stick.x - ((this.stick.x - e.clientX) * .15) : e.clientX,
        y: this.stick ? this.stick.y - ((this.stick.y - e.clientY) * .15) : e.clientY
      }

      this.move()
      this.show()
    })

    document.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', e => this.setState(e.target.dataset.cursor))
      el.addEventListener('mouseleave', e => this.removeState(e.target.dataset.cursor))
    })

    document.querySelectorAll('.cursor-stick-area').forEach(stickable => {
      stickable.addEventListener('mouseenter', ({ target }) => {
        const { top, left } = target.getBoundingClientRect()

        this.stick = {
          y: top + (target.offsetHeight / 2),
          x: left + (target.offsetWidth / 2)
        }
    
        this.move(this.stick.x, this.stick.y, 5)
      })
      stickable.addEventListener('mouseleave', () => this.stick = false)
    })
  }

  setState (states) {
    states
      .split(',')
      .forEach(state => this.el.classList.add(state))
  }

  removeState (states) {
    states
      .split(',')
      .forEach(state => this.el.classList.remove(state))
  }

  move (x = this.pos.x, y = this.pos.y, duration = .7) {
    gsap.to(this.el, {
      x,
      y,
      force3D: true,
      overwrite: true,
      ease: 'expo.out',
      duration: this.visible ? duration : 0
    })
  }

  show () {
    if (this.visible) return

    clearInterval(this.visibleInt)

    this.el.classList.add('-visible')
    this.visibleInt = setTimeout(() => this.visible = true)
  }

  hide () {
    clearInterval(this.visibleInt)
    
    this.el.classList.remove('-visible')
    this.visibleInt = setTimeout(() => this.visible = false, 300)
  }
}
