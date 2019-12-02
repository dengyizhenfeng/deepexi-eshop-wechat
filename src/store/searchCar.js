export default {
  namespaced: true,
  state: {
    searchCont: []
  },
  mutations: {
    setSearchCont(state, cont) {
      if (!state.searchCont.includes(cont)) {
        if (state.searchCont.length === 5) {
          state.searchCont.splice(0, 1);
        }
        state.searchCont.push(cont);
      }
    },
    deleteSearchCont(state, cont) {
      let index = state.searchCont.indexOf(cont);
      state.searchCont.splice(index, 1);
    }
  }
}
