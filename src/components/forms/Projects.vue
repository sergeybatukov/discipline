<template lang="pug">
  .Projects
    .popup(v-if='projectForm')
      .Projects_newProject
        input(v-model='project.name' placeholder='Новый проект')
        textarea(v-model='project.description' placeholder='Описание...')
        button(@click='newProject') Создать
    .popup(v-if='taskPopup')
      .Projects_tasks-make
        input(v-model='task.name' placeholder='Название')
        textarea(v-model='task.description' placeholder='Описание...')
        button(@click='makeTask') Создать задачу
    .Projects_header
      h1 Проекты
      button(@click='projectForm = true') Новый проект
    .Projects_body
      .Projects_list
        .Projects_list-item(
          v-for='(project, i) in projects'
          :key='i'
          @click='selectProject (project)'
        ) 
          h2 {{ project.name }}
          p {{ project.description }}
      .Projects_tasks-list(v-if='select.name')
        .Projects_tasks-list_header
          h1 {{ select.name }}
          button(@click='taskPopup = true') +
        .Projects_tasks-list_body
          p(
            v-for='(task, i) in select.tasks'
            :key='i'
            ) {{ task.name }}
</template>

<script>
export default {
  name: 'Projects',
  data () {
    return {
      projectForm: false,
      taskPopup: false,
      task: {
        name: '',
        description: '',
        key: ''
      },
      project: {
        name: '',
        description: '',
        owner: null,
        users: [],
        tasks: []
      }
    }
  },
  methods: {
    selectProject (item) {
      this.$store.state.selectProject = item
    },
    newProject () {
      this.project.users.push(this.$store.getters.user.key)
      this.project.owner = this.$store.getters.user.key
      this.$store.dispatch('newProject', this.project)
      this.projectForm = false
      this.project = {
        name: '',
        description: '',
        owner: null,
        users: [],
        tasks: []
      }
    },
    makeTask () {
      this.task.key = this.select.key
      this.$store.dispatch('newTask', this.task)
      this.taskPopup = false
    }
  },
  computed: {
    projects () {
      return this.$store.getters.projects
    },
    user () {
      return this.$store.getters.user
    },
    select () {
      return this.$store.getters.selectProject
    }
  }
}
</script>