<template lang='pug'>
  .popup
    .login.task-maker
      .form__header
        div(:class='taskColor')
        input.form__title(placeholder='Название' v-model='taskTitle')
        .btn-clouse(@click='close')
      textarea(maxlength='250' placeholder='Описание' v-model='taskDiscription').form__discription
      .form__footer
        .palette
          .blue(@click='taskColor = "blue"')
          .red(@click='taskColor = "red"')
          .yellow(@click='taskColor = "yellow"')
          .green(@click='taskColor = "green"')
          .purple(@click='taskColor = "purple"')
          .white(@click='taskColor = "white"')
        .btn-plus(@click='newTask')
  </template>

<script>

export default {
  data () {
    return {
      taskTitle: '',
      taskDiscription: '',
      taskColor: 'white'
    }
  },
  methods: {
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      const task = {
        id: null,
        title: this.taskTitle,
        discription: this.taskDiscription,
        color: this.taskColor,
        completed: false
      }
      this.$store.dispatch('newTask', task)
      this.taskTitle = ''
      this.taskDiscription = ''
      this.popup = false
      this.$emit('closePopup')
    },
    close () {
      this.$emit('closePopup')
    }
  }
}
</script>
