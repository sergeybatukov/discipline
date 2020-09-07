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
