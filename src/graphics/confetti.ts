import _ from 'lodash'
import P5 from 'p5'

export default () => {
  // Initialize Consts
  let width = window.innerWidth
  let height = window.innerHeight

  return (p5: P5) => {
    //* --------------------------------------------------- *//
    // Initialize Confetti
    const pieces: Piece[] = []

    //* --------------------------------------------------- *//
    //* Point Definition
    class Point {
      position = p5.createVector(0, 0)

      constructor (x: number, y: number) {
        this.position = p5.createVector(x, y, 0)
      }

      // Render Point to Canvas | Good for Debugging
      show () { p5.ellipse(this.position.x, this.position.y, 1) }

      // Rotate Around X Axis
      rotX (dAngle: number) {
        const d = p5.sqrt(p5.pow(this.position.y, 2) + p5.pow(this.position.z, 2))
        let ang = p5.atan2(this.position.y, this.position.z)
        ang += dAngle

        this.position.z = p5.cos(ang) * d
        this.position.y = p5.sin(ang) * d
      }

      // Rotate Around Y Axis
      rotY (dAngle: number) {
        const d = p5.sqrt(p5.pow(this.position.x, 2) + p5.pow(this.position.z, 2))
        let ang = p5.atan2(this.position.z, this.position.x)
        ang += dAngle

        this.position.x = p5.cos(ang) * d
        this.position.z = p5.sin(ang) * d
      }

      // Rotate Around Z Axis
      rotZ (dAngle: number) {
        const d = p5.sqrt(p5.pow(this.position.x, 2) + p5.pow(this.position.y, 2))
        let ang = p5.atan2(this.position.y, this.position.x)
        ang += dAngle

        this.position.x = p5.cos(ang) * d
        this.position.y = p5.sin(ang) * d
      }
    }

    //* --------------------------------------------------- *//
    //* Confet Definition
    class Piece {
      // Initialize Default Class Values
      points: Point[] = [] // Shape Point List
      position = p5.createVector(0, 0) // Piece Root Pos
      velocity = p5.createVector(0, 0) // Velocity of Consistent Movement
      acceleration = p5.createVector(0, 0) // Temporary Acceleration
      accelerationDecay = 0.2 // Speed in which Acceleration Decays
      accelerationDecayRange = 0 // Randomness Range for AccelerationDecay
      rotSpeed = p5.createVector( // Rotation Speed of Piece
        p5.random(p5.PI / 90, p5.PI / 36),
        p5.random(p5.PI / 90, p5.PI / 36),
        p5.random(p5.PI / 90, p5.PI / 36)
      )

      color = p5.color(p5.random(100), p5.random(50, 100), 100) // Color of Piece
      flags: Record<string, any> = { // Behavioural Flags
        respawn: true // Whether Pieces should Respawn when outOfBounds
      }

      // Take Constructor Arguments and Apply to Instance
      constructor (x: number, y: number, size: number, flags?: Record<string, any>, acceleration?: P5.Vector) {
        // Merge Flags with Defaults
        this.flags = _.merge(this.flags, flags)

        // Set Position to Passed X/Y Coords
        this.position = p5.createVector(x, y)

        // Generate/Calculate Velocity
        this.velocity = P5.Vector.fromAngle(p5.random(1.0472, 2.0944))
        this.velocity.setMag(p5.random(height * (2 / 1080), height * (5 / 1080)))

        // Apply Acceleration
        this.acceleration = acceleration || p5.createVector(0, 0)

        // Generate Points to Point Array
        this.points.push(new Point(size / 2, size / 2))
        this.points.push(new Point(size / 2, -size / 2))
        this.points.push(new Point(-size / 2, -size / 2))
        this.points.push(new Point(-size / 2, size / 2))
      }

      // Run all necessary Methods for rendering
      run () {
        this.warp()
        this.move()
        this.rot()
        this.show()
      }

      // Warp Piece to Other Side of Screen
      warp () {
        const spacing = 30
        let outOfBounds = false

        //* CALCULATE OUT OF BOUNDS STATES --------------------
        // LEFT SIDE ------------------------------------------
        if (this.position.x < 0 - spacing) {
          this.position.x = width + spacing
          outOfBounds = true
        }
        // RIGHT SIDE -----------------------------------------
        if (this.position.x > width + spacing) {
          this.position.x = 0 - spacing
          outOfBounds = true
        }
        // TOP ------------------------------------------------
        if (this.position.y < 0 - spacing && this.flags.respawn) {
          this.position.y = height + spacing
        }
        // BOTTOM ---------------------------------------------
        if (this.position.y > height + spacing) {
          this.position.y = 0 - spacing
          outOfBounds = true
        }

        // Return True
        if (outOfBounds && !this.flags.respawn) this.remove()
      }

      // Move Piece using velocity and static acceleration
      move () {
        // Add Acceleration to Velocity
        const movement = P5.Vector.add(this.velocity, this.acceleration)

        // Apply Movement to Piece
        this.position.add(movement)

        // Reduce Acceleration
        if (this.acceleration.y > 0.1 || this.acceleration.y < -0.1) {
          const decayRange = p5.random(this.accelerationDecay - this.accelerationDecayRange, this.accelerationDecay + this.accelerationDecayRange)
          this.acceleration = p5.createVector(this.acceleration.x, this.acceleration.y + decayRange)
        } else this.acceleration.y = 0
      }

      // Rotate Piece
      rot () {
        for (let i = 0; i < this.points.length; i++) {
          const currentPnt = this.points[i]
          currentPnt.rotX(this.rotSpeed.x + (this.acceleration.y / 60))
          currentPnt.rotY(this.rotSpeed.y - (this.acceleration.y / 60))
          currentPnt.rotZ(this.rotSpeed.z - (this.acceleration.y / 60))
        }
      }

      // Render Piece to Canvas
      show () {
        p5.noStroke()
        p5.fill(this.color)

        p5.beginShape()
        for (let i = 0; i < this.points.length; i++) {
          const xx = this.points[i].position.x + this.position.x
          const yy = this.points[i].position.y + this.position.y
          p5.vertex(xx, yy)
        }
        p5.endShape(p5.CLOSE)
      }

      // Remove Piece from Array
      remove () {
        const index = pieces.indexOf(this)
        if (index !== -1) pieces.splice(index, 1)
      }
    }

    //* --------------------------------------------------- *//
    // Override Setup Method
    p5.setup = () => {
      p5.createCanvas(width, height)
      p5.colorMode(p5.HSB, 100)
      for (let i = 0; i < p5.round(height * (300 / 1080)); i++) {
        pieces.push(new Piece(
          p5.random(0, width),
          p5.random(0, height),
          p5.random(height * (5 / 1080), height * (20 / 1080))
        ))
      }
    }

    //* --------------------------------------------------- *//
    // Override Draw Method
    p5.draw = () => {
      p5.clear()

      p5.stroke(220)
      p5.strokeWeight(4)
      for (let i = 0; i < pieces.length; i++) pieces[i].run()
    }

    //* --------------------------------------------------- *//
    // Override MouseClicked Method
    p5.mouseClicked = () => {
      for (let i = 0; i < 100; i++) {
        pieces.push(new Piece(
          p5.mouseX,
          p5.mouseY,
          p5.random(height * (5 / 1080), height * (20 / 1080)),
          { respawn: false },
          p5.createVector(0, -12)
        ))
      }
    }

    //* --------------------------------------------------- *//
    // Override Window Resized
    p5.windowResized = () => {
      width = window.innerWidth
      height = window.innerHeight
      p5.resizeCanvas(width, height)
    }
  }
}
