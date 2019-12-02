export default {
  namespaced: true,
  state: {
    addressComponent: {},
    ableToGetLocation: false, // 能否开始获取定位
    hasGetReq: false // 判断是否已获取wx.signture
  },
  mutations: {
    setCoords(state, obj) {
      state.addressComponent = obj
    },
    setAbleToLocation(state, val) {
      state.ableToGetLocation = val
    },
    setHasGetRequest(state, val) {
      state.hasGetReq = val
    }
  },
  actions: {

  }
}
