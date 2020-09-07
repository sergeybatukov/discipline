import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/main.scss'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    var firebaseConfig = {
      apiKey: "AIzaSyCxlTJvyb1_xMsrSNl2YpeUKKgqzzmUKzM",
      authDomain: "discipline-6268c.firebaseapp.com",
      databaseURL: "https://discipline-6268c.firebaseio.com",
      projectId: "discipline-6268c",
      storageBucket: "discipline-6268c.appspot.com",
      messagingSenderId: "854935164035",
      appId: "1:854935164035:web:b9301043a404a163bab7b6",
      measurementId: "G-5R19Y45F42"
    }
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('AutoLoginUser', user)
      }
    })
    // this.$store.dispatch('loadTasks')
    // this.$store.dispatch('loadIcons')
  }
}).$mount('#app')

