import { setConsultants, getConsultants, setAvatar, getAvatar } from '@/api/storage.js'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    consultantInfo: getConsultants(),
    avatar: getAvatar()
  },
  mutations: {
   setUserInfo (state, userInfo) {
     state.userInfo = userInfo;
   },
  SET_CONSULTANT: (state, consultantInfo) => {
    setConsultants(consultantInfo);
    state.consultantInfo = { ...consultantInfo };
  },
  AVATAR: (state, url) => {
    setAvatar(url);
    state.avatar = url;
  }
  },
  actions: {

  }
}
