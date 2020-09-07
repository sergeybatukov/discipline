<template lang='pug'>
  #app
    Loader(v-if='load')
    NavPanel
    //- UserPanel(v-if='user.name')
    router-view
</template>

<script>
import NavPanel from '@/components/utils/NavPanel.vue'
import UserPanel from '@/components/forms/UserPanel.vue'
import Loader from '@/components/canvas/Loader.vue'

export default {
  components: {
    NavPanel, Loader, UserPanel
  },
  computed: {
    load () {
      return this.$store.getters.loading
    },
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
