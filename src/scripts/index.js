import { Cursor, Magnetic } from '../../lib/index'

const cursor = new Cursor()

document.querySelectorAll('.cursor-magnetic-area').forEach(magneticEl => {
  const magnetic = new Magnetic(magneticEl)
})
