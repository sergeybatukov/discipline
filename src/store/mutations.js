const mutations = {
  loading (state, payload) {
    state.loading = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  newProject (state, payload) {
    state.projects.push(payload)
  },
  setProjects (state, payload) {
    state.projects = payload
  },
  setTasks (state, payload) {
    state.selectProject.tasks = payload
  }
}

export default mutations
