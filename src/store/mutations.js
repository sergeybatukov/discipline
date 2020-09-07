const mutations = {
  loading (state, payload) {
    state.loading = payload
  },
  setUser (state, payload) {
    state.user = payload
  }
}

export default mutations
