import P5 from 'p5'

interface Options {
  particleAmt?: number;
  speedX?: {
    min: number;
    max: number;
  };
  speedY?: {
    min: number;
    max: number;
  };

  dotShow?: boolean;
  dotCol?: string;
  dotSize?: {
    min: number;
    max: number;
  };

  lineShow?: boolean;
  lineDist?: number;
  lineCol?: string;
}

export default (opts: Options) => {
  // Initialize Consts
  const width = window.innerWidth
  const height = window.innerHeight

  // Return P5 Instance
  return (p5: P5) => {
    // Particle Definition
    class Particle {
      // Initialize Properties
      x = 0
      y = 0
      r = 0
      xSpeed = 0
      ySpeed = 0

      // Constructor
      constructor () {
        this.x = p5.random(0, window.innerWidth)
        this.y = p5.random(0, window.innerHeight)
        this.r = p5.random(
          opts?.dotSize?.min || 1,
          opts?.dotSize?.max || 8
        )
        this.xSpeed = p5.random(
          opts?.speedX?.min || -2,
          opts?.speedX?.max || 2
        )
        this.ySpeed = p5.random(
          opts?.speedY?.min || -1,
          opts?.speedY?.max || 1.5
        )
      }

      // Method to CreateParticle
      createParticle () {
        p5.noStroke()
        p5.fill(opts?.dotCol || 'rgba(200, 169, 169, 0.5)')
        if (opts?.dotShow !== false) p5.circle(this.x, this.y, this.r)
      }

      // Method to MoveParticle
      moveParticle () {
        // Invert Speed if Particle hits screen edge
        if (this.x < 0 || this.x > window.innerWidth) this.xSpeed *= -1
        if (this.y < 0 || this.y > window.innerHeight) this.ySpeed *= -1

        // Apply Movement Speed
        this.x += this.xSpeed
        this.y += this.ySpeed
      }

      // JoinParticle Method
      joinParticles (particles: Particle[]) {
        // Loop through each Particle
        particles.forEach(el => {
          if (opts?.lineShow !== false) {
            // Get Distance from Other Particle
            const dis = p5.dist(this.x, this.y, el.x, el.y)

            // If Distance is Greater than Connection Range
            if (dis < (opts?.lineDist || 85)) {
              p5.stroke(opts?.lineCol || 'rgba(255, 255, 255, 0.08)')
              p5.line(this.x, this.y, el.x, el.y)
            }
          }
        })
      }
    }

    // Initialize Particle List
    const particles: Particle[] = []

    // Override Setup Method
    p5.setup = () => {
      // Create Canvas
      p5.createCanvas(width, height)

      // Create New Particles
      for (let i = 0; i < (opts?.particleAmt || (width / 10)); i++) particles.push(new Particle())
    }

    // Override Draw Method
    p5.draw = () => {
      p5.clear()
      for (let i = 0; i < particles.length; i++) {
        particles[i].createParticle()
        particles[i].moveParticle()
        particles[i].joinParticles(particles.slice(i))
      }
    }

    // Window Resized
    p5.windowResized = () => {
      p5.resizeCanvas(window.innerWidth, window.innerHeight)
    }
  }
}
