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
  lineOpacity?: number;

  repelStrength?: number;
}

export default (opts: Options) => {
  // Initialize Consts
  let width = window.innerWidth
  let height = window.innerHeight

  // Return P5 Instance
  return (p5: P5) => {
    //* --------------------------------------------------- *//
    //* Particle Definition
    class Particle {
      // Initialize Properties
      acceleration = p5.createVector(0, 0)
      position = p5.createVector(0, 0)
      velocity = p5.createVector(0, 0)
      initVelo = p5.createVector(0, 0)
      radius = 0

      // Constructor
      constructor (x?: number, y?: number) {
        if (!x && !y) this.position = p5.createVector(p5.random(0, width), p5.random(0, height))
        else this.position = p5.createVector(x, y)

        this.radius = p5.random(
          opts?.dotSize?.min || 1,
          opts?.dotSize?.max || 8
        )
        this.velocity = p5.createVector(
          p5.random(
            opts?.speedX?.min || -2,
            opts?.speedX?.max || 2
          ),
          p5.random(
            opts?.speedY?.min || -1,
            opts?.speedY?.max || 1.5
          )
        )
        this.initVelo = this.velocity
      }

      // Method to Create Particle
      create () {
        p5.noStroke()
        p5.fill(opts?.dotCol || 'rgba(200, 169, 169, 0.5)')
        if (opts?.dotShow !== false) p5.circle(this.position.x, this.position.y, this.radius)
      }

      // Method to Move Particle
      move (x?: number, y?: number) {
        if (x && y) {
          this.position.x = x
          this.position.y = y
        } else {
          // Apply Movement Speed
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y

          // Invert Speed if Particle hits screen edge
          if (this.position.x < 0 || this.position.x > width) this.velocity.x *= -1
          if (this.position.y < 0 || this.position.y > height) this.velocity.y *= -1
        }
      }

      // JoinParticle Method
      connect (particles: Particle[], maxDis?: number, opac?: number) {
        // Loop through each Particle
        particles.forEach(el => {
          if (opts?.lineShow !== false) {
            // Get Distance from Other Particle
            const dis = p5.dist(this.position.x, this.position.y, el.position.x, el.position.y)
            const maxDist = maxDis || (opts?.lineDist || 100)

            // If Distance is Greater than Connection Range
            if (dis < maxDist) {
              const opacity = (((dis / maxDist) * -1) + 1) * (opac || (opts?.lineOpacity || 0.8))
              p5.stroke(opts?.lineCol || `rgba(${opts?.lineCol || '255, 255, 255'}, ${opacity})`)
              p5.line(this.position.x, this.position.y, el.position.x, el.position.y)
            }
          }
        })
      }

      // Apply Repel
      repel (repeller: Repeller) {
        const force = repeller.repel(this)
        force.div(2)

        // Apply Movement Speed
        this.velocity = P5.Vector.add(this.velocity, force)
      }
    }

    //* --------------------------------------------------- *//
    //* Repeller Definition
    class Repeller {
      position = p5.createVector(0, 0)
      r = 35

      constructor (x: number, y: number) {
        this.position = p5.createVector(x, y)
        this.r = 35
      }

      display () {
        p5.stroke(140)
        p5.fill(0)
        p5.ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2)
      }

      repel (p: Particle) {
        const dir = P5.Vector.sub(this.position, p.position)
        const d = dir.mag()
        dir.normalize()
        // d = p5.constrain(d, 5, 100)
        const force = -1.5 * (opts?.repelStrength || -1500) / (d * d)
        dir.mult(force)

        return dir
      }
    }

    //* --------------------------------------------------- *//
    // Initialize Particles & Repeller
    const mouseParticle: Particle = new Particle(width / 2, height / 2)
    const particles: Particle[] = []

    //* --------------------------------------------------- *//
    // Override Setup Method
    p5.setup = () => {
      // Initialize Canvas
      p5.createCanvas(width, height)

      // Initialize Mouse Particle
      mouseParticle.create()

      // Initialize New Particles
      for (let i = 0; i < (opts?.particleAmt || (width / 10)); i++) particles.push(new Particle())
    }

    //* --------------------------------------------------- *//
    // Override Draw Method
    p5.draw = () => {
      p5.clear()

      // Move MouseParticle & Connect to other Particles
      if (p5.mouseX || p5.mouseY) mouseParticle.move(p5.mouseX, p5.mouseY)
      mouseParticle.connect(particles, 150, 1)

      // Create/Move/Connect Particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].create()
        particles[i].move()
        particles[i].connect(particles.slice(i), 60, 0.4)
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
