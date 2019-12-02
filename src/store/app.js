
export default {
  namespaced: true,
  state: {
    show: false
  },
  mutations: {
    TOGGLESHOW: state => {
      state.show = !state.show
    }
  },
  actions: {
    toggleShow ({ commit }) {
      commit('TOGGLESHOW')
    }
  }
}
