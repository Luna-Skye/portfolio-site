import P5 from 'p5'

export default () => {
  // Init Consts
  let width = window.innerWidth
  let height = window.innerHeight

  return (p5: P5) => {
    // Initialize Snowflake List
    const snowflakes: Snowflake[] = []

    // Snowflake Class
    class Snowflake {
      posX = 0
      posY = p5.random(-50, 0)
      initAngle = p5.random(0, 2 * p5.PI)
      size = p5.random(2, 5)

      // Radius of snowflake spiral
      // Chosen so the snowflakes are uniformly spread out in area
      radius = p5.sqrt(p5.random(p5.pow(width / 2, 2)))

      // Update Method
      update (time: number) {
        // PosX follows a circle
        const w = 0.2 // Angular Speed
        const angle = w * time + this.initAngle
        this.posX = width / 2 + this.radius * p5.sin(angle)

        // Different size snowflakes fall at slightly different Y speeds
        this.posY += p5.pow(this.size, 0.5)

        // Delete Snowflake if past end of screen
        if (this.posY > height) {
          const index = snowflakes.indexOf(this)
          snowflakes.splice(index, 1)
        }
      }

      // Draw Snowflake
      display () {
        p5.ellipse(this.posX, this.posY, this.size)
      }
    }

    // Override Setup Method
    p5.setup = () => {
      p5.createCanvas(width, height)
      p5.noStroke()
    }

    // Override Draw Method
    p5.draw = () => {
      p5.clear()
      const t = p5.frameCount / 60

      // Create a random number of snowflakes each frame
      for (let i = 0; i < p5.random(2); i++) snowflakes.push(new Snowflake())

      // Loop through Snowflakes with a for..of loop
      for (const flake of snowflakes) {
        flake.update(t)
        flake.display()
      }
    }

    p5.windowResized = () => {
      width = window.innerWidth
      height = window.innerHeight
      p5.resizeCanvas(width, height)
    }
  }
}
