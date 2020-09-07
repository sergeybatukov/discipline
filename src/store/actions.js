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
  async newComp ({ commit }, payload) {
    try {
      const compNew = {
        id: payload.id,
        name: payload.name
      }
      const comp = await firebase.database().ref('components').push(compNew)
      const stateOnData = await firebase.storage().ref('components/' + comp.key + '_on.svg').put(payload.stateOn)
      const stateOnUrl = await stateOnData.ref.getDownloadURL()
      const stateOffData = await firebase.storage().ref('components/' + comp.key + '_off.svg').put(payload.stateOff)
      const stateOffUrl = await stateOffData.ref.getDownloadURL()
      const stateWarningData = await firebase.storage().ref('components/' + comp.key + '_warning.svg').put(payload.stateWarning)
      const stateWarningUrl = await stateWarningData.ref.getDownloadURL()
      const stateCriticalData = await firebase.storage().ref('components/' + comp.key + '_critical.svg').put(payload.stateCritical)
      const stateCriticalUrl = await stateCriticalData.ref.getDownloadURL()
      await firebase.database().ref('components').child(comp.key).update({
        stateOn: stateOnUrl,
        stateOff: stateOffUrl,
        stateWarning: stateWarningUrl,
        stateCritical: stateCriticalUrl
      })
      commit('newComp', {
        ...compNew,
        stateOn: stateOnUrl,
        stateOff: stateOffUrl,
        stateWarning: stateWarningUrl,
        stateCritical: stateCriticalUrl
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default actions
