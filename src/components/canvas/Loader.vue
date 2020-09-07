<template lang="pug">
  .Loader
    canvas#bg(ref='bg')
</template>

<script>
const loader = require('@/components/canvas/loader.js')

export default {
  name: 'Loader',
  data () {
    return {
      cvs: null
    }
  },
  mounted() {
    this.cvs = this.$refs.bg
    loader.player.Play(this.cvs)
  }
}
</script>