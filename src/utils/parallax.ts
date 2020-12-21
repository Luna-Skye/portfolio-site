//* ------------------------------------------------------- *//
//  MOUSE BASED PARALLAX ---------------------------------- *//
export class MouseParallax {
  x = 0
  y = 0

  calc = (event: MouseEvent) => {
    this.x = (event.clientX - (document.body.clientWidth) / 2)
    this.y = (event.clientY - (document.body.clientHeight) / 2)
  }
}
