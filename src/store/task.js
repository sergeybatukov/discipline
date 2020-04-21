import firebase from 'firebase/app'
import 'firebase/database'

class Task {
  constructor (
    id,
    title,
    discription,
    color,
    completed,
    user = null
  ) {
    this.id = id
    this.title = title
    this.discription = discription
    this.color = color
    this.completed = completed
    this.user = user
  }
}

export default {
  state: {
    tasks: []
  },
  mutations: {
    TasksLoad (state, payload) {
      state.tasks = payload
    },
    newTask (state, payload) {
      state.tasks.push(payload)
    },
    removeTask (state, payload) {
      for (var i in state.tasks) {
        if (state.tasks[i].id === payload) {
          state.tasks.splice(i, 1)
        }
      }
    },
    completedIt (state, payload) {
      for (var i in state.tasks) {
        if (state.tasks[i].id === payload) {
          state.tasks[i].completed = !state.tasks[i].completed
        }
      }
    }
  },
  actions: {
    async loadTasks ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const task = await firebase.database().ref('tasks').once('value')
        const tasks = task.val()
        const tasksArray = []
        Object.keys(tasks).forEach(key => {
          const t = tasks[key]
          tasksArray.push(
            new Task(
              key,
              t.title,
              t.discription,
              t.color,
              t.completed,
              t.user
            )
          )
        })
        commit('TasksLoad', tasksArray)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async newTask ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const taskNew = new Task(
          payload.id,
          payload.title,
          payload.discription,
          payload.color,
          payload.completed,
          getters.user.id
        )
        const task = await firebase.database().ref('tasks').push(taskNew)
        commit('newTask', {
          ...taskNew,
          id: task.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async removeTask ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('tasks').child(payload).remove()
        commit('removeTask', payload)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async completedIt ({ commit }, { id, completed }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('tasks').child(id).update({
          completed
        })
        commit('completedIt', id)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    tasks (state, getters) {
      return state.tasks.filter(task => {
        return task.user === getters.user.id
      })
    },
    taskCompleted (state, getters) {
      return getters.tasks.filter(task => {
        return task.completed
      })
    },
    taskActive (state, getters) {
      return getters.tasks.filter(task => {
        return task.completed === false
      })
    }
  }
}
