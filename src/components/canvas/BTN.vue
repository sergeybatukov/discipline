<template lang="pug">
  .btn(ref='btnCont')
    canvas.btn_cvs(ref='btn')
</template>

<script>
const loader = require('@/components/canvas/loader.js')

export default {
  name: 'BTN',
  props: ['text'],
  data () {
    return {
      cvs: null,
      ctx: null,
      time: 0,
      hover: false,
      fill: 'black'
    }
  },
  methods: {
    Clear () {
      this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
    },
    Text () {
      this.ctx.font = "14px Montserrat"
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText(this.$props.text, this.cvs.width/2, this.cvs.height/2 + 5)
    },
    Circle(point) {
      this.ctx.beginPath()
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      this.ctx.arc(point.x, point.y, 20, 0, 2 * Math.PI, true)
      this.ctx.fill()
    },
    Hover (point) {
      this.Clear()
      this.ctx.fillStyle = this.fill
      this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)
      this.Circle(point)
      this.ctx.strokeStyle = 'white'
      this.ctx.setLineDash([2, 20]);
      this.ctx.lineDashOffset += 0.5
      this.ctx.strokeRect(2, 2, this.cvs.width-6, this.cvs.height - 6)
      this.Text()
    }
  },
  mounted() {
    this.cvs = this.$refs.btn
    this.cvs.width = this.$refs.btnCont.getBoundingClientRect().width
    this.cvs.height = this.$refs.btnCont.getBoundingClientRect().height
    this.ctx = this.cvs.getContext('2d')
    this.Text()
    let point = {
      x: 0,
      y: 0
    }
    this.cvs.onmousemove = (e) => {
      this.hover = true
      let targetCoords = this.cvs.getBoundingClientRect()
      point.x = e.clientX - targetCoords.left;
      point.y = e.clientY - targetCoords.top
      this.Hover(point)
    }
    this.cvs.onmouseout = (e) => {
      this.hover = false
      this.Clear()
      this.Text()
    }
    setInterval(() => {
      if(this.hover){
        this.Hover(point)
      }
    }, 10)
  }
}
</script>
<style lang="scss" scoped>
  .btn {
    cursor: pointer;
    position: relative;
    &_cvs {
      z-index: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
