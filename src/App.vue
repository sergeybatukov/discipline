<template lang='pug'>
  .wrapper
    .nav(v-if='isUserLogin')
      a.nav__header discipline
      .nav__content
        .logout(@click='userLogout')
    router-view
</template>
<script>

export default {
  computed: {
    isUserLogin () {
      return this.$store.getters.isUserLogin
    }
  },
  methods: {
    userLogout () {
      this.$router.push('/')
      return this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style lang="scss">
</style>
