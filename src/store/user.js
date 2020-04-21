import firebase from 'firebase/app'
import 'firebase/auth'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null,
    name: ''
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setName (state, payload) {
      state.name = payload
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setName', email)
        location.href = '/home'
        commit('setLoading', false)
        console.log(user)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    AutoLoginUser ({ commit }, payload) {
      commit('setUser', new User(payload.uid))
      commit('setName', payload.email)
    },
    logoutUser ({ commit }) {
      commit('setName', null)
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLogin (state) {
      return state.user !== null
    },
    userName (state) {
      return state.name
    }
  }
}
