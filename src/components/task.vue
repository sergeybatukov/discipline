<template lang='pug'>
  .form.task-item(:class='{complited: taskData.completed}')
    .form__header
      div(:class='taskData.color')
      .form__title {{ taskData.title }}
      .btn-clouse(@click='removeTask(taskData.id)')
    .form__discription {{ taskData.discription}}
    .checkbox(@click='completedIt(taskData)')
      .checkbox__label(v-if='!taskData.completed') Завершить
      .checkbox__label(v-if='taskData.completed') Возобновить
      .checkbox__input(:class='{checkbox_active: taskData.completed}')
</template>
<script>
export default {
  props: {
    taskData: {}
  },
  methods: {
    removeTask (TaskId) {
      this.$store.dispatch('removeTask', TaskId)
    },
    completedIt (taskData) {
      this.$store.dispatch('completedIt', {
        id: this.taskData.id,
        completed: !this.taskData.completed
      })
    }
  }
}
</script>

<style lang="scss">
</style>
