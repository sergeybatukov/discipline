import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import './assets/scss/main.scss'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyCxlTJvyb1_xMsrSNl2YpeUKKgqzzmUKzM',
      authDomain: 'discipline-6268c.firebaseapp.com',
      databaseURL: 'https://discipline-6268c.firebaseio.com',
      projectId: 'discipline-6268c',
      storageBucket: 'discipline-6268c.appspot.com',
      messagingSenderId: '854935164035',
      appId: '1:854935164035:web:287fc19995e557a9bab7b6',
      measurementId: 'G-EPJPL1Z8NB'
    }
    fb.initializeApp(firebaseConfig)
    fb.analytics()
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('AutoLoginUser', user)
      }
      this.$store.dispatch('loadTasks')
    })
  },
  render: h => h(App)
}).$mount('#app')
