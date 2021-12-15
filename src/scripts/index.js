import Cursor from './Cursor.js'
import Magnetic from './Magnetic.js'

const cursor = new Cursor()

document.querySelectorAll('.cursor-magnetic-area').forEach(magneticEl => {
  const magnetic = new Magnetic(magneticEl)
})
