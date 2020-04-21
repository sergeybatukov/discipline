<template lang='pug'>
  .popup
    form.login(v-if='!registration && !loading')
      .login__header
        .login__title Войти
        .btn-clouse(@click='closeLogin')
      input.login__input(
        type='email'
        placeholder='Email'
        v-model='email'
        @blur='$v.email.$touch()'
        :class='{error: $v.email.$error}'
        )
      input.login__input(
        type='password'
        placeholder='Пароль'
        v-model='password'
        @blur='$v.password.$touch()'
        :class='{error: $v.password.$error}'
        v-on:keyup.enter='SingIn'
        )
      .login__footer
        span(@click='registration = true') Нет аккаунта?
        button.btn_animate(type='button' @click='SingIn' :class='{loading: loading}') Войти
    form.login(v-if='registration')
      .login__header
        .login__title Регистрация
        .btn-clouse(@click='closeLogin')
      input.login__input(
        type='email'
        placeholder='Email'
        v-model='email'
        @blur='$v.email.$touch()'
        :class='{error: $v.email.$error}'
        )
      input.login__input(
        type='password'
        placeholder='Пароль'
        v-model='password'
        @blur='$v.password.$touch()'
        :class='{error: $v.password.$error}'
        )
      input.login__input(
        type='password'
        v-model='repeatPassword'
        @blur='$v.repeatPassword.$touch()'
        :class='{error: $v.repeatPassword.$error}'
        placeholder='Повторите пароль'
        v-on:keyup.enter='CreateAccount'
        )
      .login__footer
        span(@click='registration = false') Войти
        button.btn_animate(type='button' @click='CreateAccount' :class='{loading: loading}') Создать
    .loader_big(v-if='loading')
</template>
<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      registration: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    closeLogin () {
      this.$emit('closeLogin')
    },
    SingIn () {
      if (!this.$v.email.$error && !this.$v.password.error) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/home')
          })
          .catch(err => console.log(err))
      }
    },
    CreateAccount () {
      if (!this.$v.email.$error && !this.$v.password.error) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$store.dispatch('loginUser', user)
            this.$router.push('/home')
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>
