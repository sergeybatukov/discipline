<template lang="pug">
  .page-wrapper
    Login(@closeLogin='closeLogin' v-if='loginActive')
    .page-wrapper__grid(v-if='!loading')
      .page-wrapper__header
        .page-wrapper__title discipline.
      .btn_animate(@click='loginActive = true') Начать
</template>
<script>
import Login from '../components/login'

export default {
  components: {
    Login
  },
  data () {
    return {
      loginActive: false
    }
  },
  methods: {
    closeLogin () {
      this.loginActive = false
    }
  },
  mounted () {
    if (this.$store.getters.userName) {
      console.log('11')
      this.$router.push('/home')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
