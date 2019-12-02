export default {
  namespaced: true,
  state: {
    time: '',
    address: {},
    carInfo: {},
    cityCode: sessionStorage.getItem('cityCode') || localStorage.getItem('cityCode') || '110000'
  },
  getters: {
    newTime(state) {
      return state.time
    },
    newAddress(state) {
      return state.address
    },
    newCarInfo(state) {
      return state.carInfo
    },
    newCityCode(state) {
      return state.cityCode
    }
  },
  mutations: {
    setTime: (state, newTime) => {
      state.time = newTime
    },
    setAddress: (state, newAddress) => {
      state.address = newAddress
    },
    setCarInfo: (state, newCarInfo) => {
      state.carInfo = newCarInfo
    },
    setCityCode: (state, newCityCode) => {
      state.cityCode = newCityCode
    }
  }
}
