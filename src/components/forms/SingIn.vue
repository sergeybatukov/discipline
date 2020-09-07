<template lang="pug">
  .SingIn
    h1.SingIn_header(v-if='singIn') Войти
    h1.SingIn_header(v-if='!singIn') Регистрация
    input.SingIn_input(v-model='user.name' v-if='!singIn' placeholder='Имя')
    input.SingIn_input(v-model='user.lastName' v-if='!singIn' placeholder='Фамилия')
    input.SingIn_input(v-model='user.email' placeholder='E-mail')
    input.SingIn_input(type='password' v-model='user.password' placeholder='Пароль')
    button.SingIn_btn(v-if='singIn' @click='logIn') Войти
    button.SingIn_btn(v-if='!singIn' @click='registration') Создать
    span(@click='singIn = false' v-if='singIn') Регистрация
    span(@click='singIn = true' v-if='!singIn') Войти
</template>

<script>
export default {
  name: 'SingIn',
  data () {
    return {
      singIn: true,
      user: {
        name: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    logIn () {
      this.$store.dispatch('login', this.user)
      this.$emit('SingIn', {})
    },
    registration () {
      this.$store.dispatch('newUser', this.user)
      this.$emit('SingIn', {})
    }
  },
  computed: {
  }
}
</script>