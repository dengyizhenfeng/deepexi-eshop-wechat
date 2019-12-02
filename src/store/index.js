import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import app from './app'
import tryDriving from './tryDriving'
import shoper from './shoper'
import user from './user'
import fourstep from './fourstep'
import pkCar from './pkCar'
import tab from './tab'
import searchCar from './searchCar'
import wxCoords from './wxCoords'
import helpPlaceAnOrder from './helpPlaceAnOrder'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  modules: {
    app,
    tryDriving,
    shoper,
    user,
    fourstep,
    pkCar,
    tab,
    searchCar,
    wxCoords,
    helpPlaceAnOrder
  },
  state: {
    token: '',
    isLoading: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    getToken(state) {
      return state.token
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    getToken({ commit }) {
      commit('getToken')
    }
  }
})
