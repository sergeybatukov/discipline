<template lang="pug">
  .NavPanel
    .NavPanel_links-container(v-if='user.name')
      .NavPanel_link(
        v-for='(link, i) in navLinks'
        :key='i'
      ) {{ link.name }}
    .NavPanel_user(v-if='user.name')
      .NavPanel_user-name {{ user.name + ' ' + user.lastName }}
      .NavPanel_user-avatar
    .NavPanel_btn(v-if='user.name' @click='logOut') Выйти
    .NavPanel_btn(v-if='!user.name' @click='singIn = true') Войти
    .popup(v-if='singIn')
      SingIn(@SingIn='singIn = false')
</template>

<script>
import SingIn from '@/components/forms/SingIn'

export default {
  name: 'NavPanel',
  components: {
    SingIn
  },
  data () {
    return {
      singIn: false,
      navLinks: [
        {
          name: 'Главная',
          link: '/'
        },
        {
          name: 'Мои проекты',
          link: '/'
        },
        {
          name: 'Карта',
          link: '/'
        }
      ]
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('logoutUser')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>