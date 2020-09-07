import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const actions = {
  async loadTasks ({ commit }) {
    try {
      const tasksData = await firebase.database().ref('tasks').once('value')
      const tasks = tasksData.val()
      const tasksArray = []
      Object.keys(tasks).forEach(key => {
        const t = tasks[key]
        tasksArray.push(
          t
        )
      })
      commit('loadTasks', tasksArray)
    } catch (error) {
      console.log(error)
    }
  },
  async newUser ({ commit }, payload) {
    try {
      commit('loading', true)
      const newUser = {
        id: null,
        key: null,
        name: payload.name,
        lastName: payload.lastName,
        email: payload.email,
        avatar: null
      }
      const user = await firebase.database().ref('users').push(newUser)
      const reg = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      await firebase.database().ref('users').child(user.key).update({
        key: user.key,
        id: reg.user.uid
      })
      newUser.key = user.key
      newUser.id = reg.user.uid
      commit('setUser', newUser)
      commit('loading', false)
      // location.href = '#/admin'
    } catch (error) {
      console.lor(error)
    }
  },
  async login({ commit }, payload) {
    try {
      commit('loading', true)
      let usr = {}
      const userSingIn = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      const userData = await firebase.database().ref('users').once('value')
      Object.keys(userData.val()).forEach(key => {
        if (userData.val()[key].id === userSingIn.user.uid) {
          usr = userData.val()[key]
        }
      })
      commit('setUser', usr)
      commit('loading', false)
      // location.href = '#/user'
    } catch (error) {
      console.log(error)
    }
  },
  async AutoLoginUser({ commit }, payload) {
    try {
      commit('loading', true)
      let usr = {}
      const userData = await firebase.database().ref('users').once('value')
      Object.keys(userData.val()).forEach(key => {
        if (userData.val()[key].id === payload.uid) {
          usr = userData.val()[key]
        }
      })

      commit('setUser', usr)
      commit('loading', false)
    } catch (error) {
      console.log(error)
    }
  },
  logoutUser({ commit }) {
    commit('loading', true)
    firebase.auth().signOut()
    commit('setUser', null)
    location.href = '#/'
    commit('loading', false)
    location.reload()
  }
}

export default actions
