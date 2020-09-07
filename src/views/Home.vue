<template lang="pug">
  .Home
    h1  {{ tasks }}
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      toolsVisibal: false,
      playerVisibal: false
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    }
  },
}

</script>
<template lang="pug">
  .Home
    Projects
</template>

<script>
import Projects from '@/components/forms/Projects'

export default {
  name: 'Home',
  components: {
    Projects
  }
}
</script>