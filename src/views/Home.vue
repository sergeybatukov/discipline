<template lang='pug'>
  .content-wrapper.home
    TaskMaker(@closePopup='closePopup' v-if='popupVisible')
    h1 Задачи
    .user {{ userEmail }}
    .btn-plus.btn-plus_big-right(@click='popupVisible = true')
    .filter
      .filter__item(@click='filterTask("active")' :class='{active: (filter==="active")}') Активные
        .count(v-if='ActiveCount != 0') {{ActiveCount}}
      .filter__item(@click='filterTask("completed")' :class='{active: (filter==="completed")}') Завершенные
      .filter__item(@click='filterTask("all")' :class='{active: (filter==="all")}') Все
    .task-list
      Task(
        v-for='task in tasks'
        :key='task.id'
        :taskData='task'
        :class='{complited: task.completed}')
</template>

<script>
import TaskMaker from '../components/task-maker.vue'
import Task from '../components/task.vue'

export default {
  components: {
    TaskMaker, Task
  },
  data () {
    return {
      popupVisible: false,
      filter: 'all'
    }
  },
  computed: {
    tasks () {
      if (this.filter === 'active') {
        return this.$store.getters.taskActive
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    },
    ActiveCount () {
      return this.$store.getters.taskActive.length
    },
    userEmail () {
      return this.$store.getters.userName
    }
  },
  methods: {
    filterTask (property) {
      this.filter = property
    },
    closePopup () {
      this.popupVisible = false
    }
  }
}
</script>
<style lang="scss">
.filter {
  .count {
    position: absolute;
    top: -10px;
    left: -10px;
    font-family: Montserrat;
    font-size: 10px;
    color: white;
    text-align: center;
    height: 15px;
    width: 15px;
    border-radius: 15px;
    background-color: #EB848E;
    padding: 5px ;
    z-index: 10;
  }
}
</style>
