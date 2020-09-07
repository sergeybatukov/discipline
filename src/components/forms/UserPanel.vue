<template lang="pug">
  .UserPanel
    .UserPanel_header 
      .UserPanel_header-name {{ user.name + ' ' + user.lastName }}
      .UserPanel_header-name {{ user.name + ' ' + user.lastName }}
</template>

<script>
export default {
  name: 'UserPanel',
  data () {
    return {}
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>