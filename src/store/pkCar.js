import { Toast } from 'vant'
export default {
  namespaced: true,
  state: {
    carIds: [],
    carLists: [],
    addSuccess: true
  },
  mutations: {
    addPKCar (state, id) {
      if (state.carIds.includes(id)) {
        Toast('此车辆已在PK列表，请勿重复添加')
        state.addSuccess = false
      } else if (state.carIds.length === 3) {
        Toast('对不起，最多PK 3辆车')
        state.addSuccess = false
      } else {
        state.carIds.push(id)
        state.addSuccess = true
      }
    },
    savePKCarList (state, carList) {
      state.carLists.push(carList);
    },
    setPKCarIds (state, ids) {
      state.carIds = ids
    },
    setCarLists (state, carList) {
      state.carLists = carList;
    },
    deleteCarLists (state, index) {
      state.carLists.splice(index, 1);
      state.carIds.splice(index, 1);
    }
  },
  actions: {
    addPKCar ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        commit('addPKCar', id)
        resolve(state.addSuccess)
      })
    }
  }
}
