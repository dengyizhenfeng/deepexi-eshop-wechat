export default {
  namespaced: true,
  state: {
    userInfo: {
      token: sessionStorage.getItem('token') || localStorage.getItem('token'),
      // openid: process.env.NODE_ENV === 'development'
      //   ? 'oTtBCv-L5j_T_1VUIy8afsoHZBnQ'
      //   : localStorage.getItem('openid'),
      openid: sessionStorage.getItem('openid') || localStorage.getItem('openid'),
      userId: sessionStorage.getItem('userId') || localStorage.getItem('userId'),
      unionId: sessionStorage.getItem('unionId') || localStorage.getItem('unionId'),
      tenantCode: sessionStorage.getItem('tenantCode') || localStorage.getItem('tenantCode') || '9d74de92d1f14ccfb9656d531cba8d08',
      shopId: sessionStorage.getItem('shopId') || localStorage.getItem('shopId')
    },
    personalInfo: {}
  },
  getters: {
    userInfoWX(state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      state.userInfo = obj
    },
    setPersonalInfo(state, obj) {
      state.personalInfo = obj
    }
  },
  actions: {

  }
}
