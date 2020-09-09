import SimplexNoise from 'simplex-noise'

var simplex = new SimplexNoise()

var cvs, ctx, width = 0, height = 0

export class Player {
  constructor() {
    this.essence = new Circle()
    this.mouseX = 0
    this.mouseY = 0
    this.mfX = 0
    this.mfY = 0
    window.onmousemove = (e) => {
      this.mouseX = e.clientX - width / 2
      this.mouseY = e.clientY - height / 2
    }
  }
  inertion() {
    this.mfX += 0.01 * (this.mouseX / (width / 2) - this.mfX)
    this.mfY += 0.01 * (this.mouseY / (height / 2) - this.mfY)
  }
  MakeCVS(cvsObj) {
    cvs = cvsObj
    ctx = cvs.getContext('2d')
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
    width = cvs.width
    height = cvs.height
    window.addEventListener('resize', event => {
      cvs.width = window.innerWidth
      cvs.height = window.innerHeight
      width = cvs.width
      height = cvs.height
    }, false);
  }
  Draw() {
    this.inertion()
    ctx.clearRect(0, 0, width, height)
    this.essence.x = width/2
    this.essence.y = height/2
    this.essence.Draw()
  }
  Play(cvs) {
    this.MakeCVS(cvs)
    setInterval(() => {
      this.Draw()
    }, 10)
  }
}

export class Circle {
  constructor() {
    this.x = 0
    this.y = 0
    this.lines = []
    this.noise
    this.time = 0
    this.vertices = 100
    this.radius = 100
    this.firstColor = 'black'
    this.secondColor = 'black'
    this.color = 'black'
    this.make()
  }
  make() {
    for (let i = 0; i <= this.vertices; i++) {
      let point = {
        x: Math.cos(i / this.vertices * Math.PI * 2),
        y: Math.sin(i / this.vertices * Math.PI * 2)
      }
      point._x = point.x
      point._y = point.y
      this.lines.push(point)
    }
  }
  Draw() {
    this.time += 0.3
    var grad = ctx.createRadialGradient(
      this.radius / 2, this.radius / 2, this.radius / 4,
      this.radius / 2, this.radius / 2, this.radius
    )
    grad.addColorStop(0, this.firstColor)
    grad.addColorStop(0.7, this.secondColor)
    for (let i in this.lines) {
      this.noise = simplex.noise2D(this.lines[i]._x / 4 + this.time * 0.009, this.lines[i]._y / 4 + this.time * 0.009)
      this.lines[i].x = this.lines[i]._x*this.noise
      this.lines[i].y = this.lines[i]._y*this.noise
      this.lines[i].x = this.lines[i].x + player.mfX / 5
      this.lines[i].y = this.lines[i].y + player.mfY / 5
    }

    ctx.beginPath()
    ctx.moveTo(this.x + this.lines[0].x * this.radius, this.y + this.lines[0].y * this.radius)
    for (let i = 0; i <= this.vertices; i++) {
      ctx.lineTo(this.x + this.lines[i].x * this.radius, this.y + this.lines[i].y * this.radius)
    }
    ctx.lineTo(this.x + this.lines[0].x * this.radius, this.y + this.lines[0].y * this.radius)
    ctx.fillStyle = grad
    ctx.fill()
    ctx.closePath()
  }
}

export var player = new Player()