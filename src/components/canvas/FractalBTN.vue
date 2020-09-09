<template lang="pug">
  .popup
    canvas(ref='btn')
</template>

<script>
const loader = require('@/components/canvas/loader.js')

export default {
  name: 'Loader',
  data () {
    return {
      cvs: null,
      ctx: null,
      time: 0
    }
  },
  methods: {
    Clear () {
      this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
      this.ctx.fillStyle = 'rgba(0,0,0,1)'
      this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)
    },
    PrintFigure(x, y, size, style) {
      let sizeElem = Math.floor(size / 10)
      let figure = [
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
      ]
      for (let i = 0; i < 10; i++)
        for (let k = 0; k < 10; k++)
          if (figure[i][k] == 1) {
            this.ctx.fillStyle = style;
            this.ctx.fillRect(x + i * sizeElem, y + k * sizeElem, sizeElem, sizeElem);
          }
    },
    CreateTFractal(t) {
      this.Clear()
      let size = 20
      let countByX = Math.floor(this.cvs.width / size)
      let countByY = Math.floor(this.cvs.height / size)
      while ((countByX > 0) && (countByY > 0)) {
        for (var i = 0; i <= countByX; i++) {
          for (var k = 0; k <= countByY; k++) {
            this.PrintFigure(i * size, k * size, size, `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()* 255}, 0.3)`); 
          }
        }
        size *= 2
        countByX = Math.floor(this.cvs.width/ size)
        countByY = Math.floor(this.cvs.height / size)
      }
    }
  },
  mounted() {
    this.cvs = this.$refs.btn
    this.ctx = this.cvs.getContext('2d')
    setInterval(()=> {
      this.time += 1
      this.CreateTFractal(this.time)
    }, 100)
  }
}
</script>