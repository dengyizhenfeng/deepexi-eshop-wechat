export default {
  namespaced: true,
  state: {
    charging: {},
    order: ''
  },
  mutations: {
    setCharging (state, obj) {
      state.charging = obj
    },
    setOrder (state, order) {
      state.order = order
    }
  },
  actions: {

  }
}
