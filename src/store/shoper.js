
export default {
  namespaced: true,
  state: {
    currentId: '',
    shopList: []
  },
  getters: {
    setShopLis: state => state.shopList
  },
  mutations: {
    setCurrentId (state, id) {
      state.currentId = id
    },
    setShopList (state, list) {
      state.shopList = list;
    }
  },
  actions: {

  }
}
