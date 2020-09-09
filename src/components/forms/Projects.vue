<template lang="pug">
  .Projects
    .popup(v-if='projectForm')
      .Projects_newProject
        input(v-model='project.name' placeholder='Новый проект')
        textarea(v-model='project.description' placeholder='Описание...')
        .Projects_btn(@click='newProject' )
          BTN(:text='"СОЗДАТЬ"')
    .popup(v-if='taskPopup')
      .Projects_tasks-make
        input(v-model='task.name' placeholder='Название')
        textarea(v-model='task.description' placeholder='Описание...')
        .Projects_btn(@click='makeTask(select)' )
          BTN(:text='"СОЗДАТЬ ЗАДАЧУ"')
    .Projects_header
      input(placeholder='Поиск' v-model='projectSearch')
      .Projects_btn(@click='projectForm = true' )
        BTN(:text='"НОВЫЙ ПРОЕКТ"')
    .Projects_body
      .Projects_list
        .Projects_list-item(
          v-for='(project, i) in projects'
          :key='i'
          @click='selectProject (project)'
          :class='{Projects_list_active: isActive(project)}'
          v-if='project.name.indexOf(projectSearch) != -1 || projectSearch == null'
        ) 
          h2(:title='project.name')  {{ project.name }}
          p(:title='project.description') {{ project.description }}
      .Projects_tasks-list(v-if='select.name')
        .Projects_tasks-list_header
          h1 {{ select.name }}
          .Projects_btn(@click='taskPopup = true' )
            BTN(:text='"+"')
        .Projects_tasks-list_body
          p(
            v-for='(task, i) in select.tasks'
            :key='i'
            ) {{ task.name }}
      .Projects_tasks-list(v-if='!select.name')
        h1 Место для ваших проектов
</template>

<script>
import BTN from '@/components/canvas/BTN.vue'

export default {
  name: 'Projects',
  components: {
    BTN
  },
  data () {
    return {
      projectForm: false,
      projectSearch: null,
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
    isActive (project) {
      return this.$store.getters.selectProject.key === project.key
    },
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
    makeTask (project) {
      this.task.key = project.key
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