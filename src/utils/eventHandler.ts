//* ------------------------------------------------------- *//
// IMPORT MODULES -----------------------------------------  //
import P5 from 'p5'
import particles from '@/graphics/particles'
import snowfall from '@/graphics/snowfall'

//* ------------------------------------------------------- *//
// RETURN EVENT NAME --------------------------------------  //
export const getEventName = (): string => {
  //* Get Current Date
  const d = new Date()
  const day = d.getDate()
  const month = d.getMonth() + 1

  //* Calculate and Return Event
  if (month === 12 && (day === 24 || day === 25)) return 'CHRISTMAS'
  if (month === 1 && day === 1) return 'NEWYEAR'

  //* Else Return None
  return 'NONE'
}

//* ------------------------------------------------------- *//
// RETURN P5 CANVAS FUNCTION ------------------------------  //
export const getEventP5 = (): (p5: P5) => void => {
  //* Fetch Event's Name
  const event = getEventName()

  if (event === 'CHRISTMAS') return snowfall()
  // if (event === 'PRIDE') return particles({})

  //* DEFAULT SEPSHUN PARTICLES
  return particles({
    dotSize: { min: 0, max: 0.4 },
    lineDist: 100
  })
}
