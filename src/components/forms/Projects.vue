<template lang="pug">
  .Projects
    .popup
      input(v-model='project.name')
      input(v-model='project.description')
    .Projects_header
    .Projects_list
      //- .Projects_list-item.newProject
      .Projects_list-item(
        v-for='(project, i) in projects'
        :key='i'
      ) {{ project }}
    button(@click='newProject') Новый проект
</template>

<script>
export default {
  name: 'Projects',
  data () {
    return {
      project: {
        name: '',
        description: '',
        owner: null
      }
    }
  },
  computed: {
    projects () {
      return this.$store.getters.projects
    }
  }
}
</script>