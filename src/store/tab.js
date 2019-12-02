export default {
  namespaced: true,
  state: {
    tabActive: 0
  },
  mutations: {
    setActive (state, prm) {
      state.tabActive = prm
    }
  }
}
