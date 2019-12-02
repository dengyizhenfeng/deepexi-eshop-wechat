export default {
  install(Vue) {
    /*
    删除sessionStorage 存储的值
    @param key String 需要删除的key
    @param flag Number 1:vuex 存储的key  0:正常的key
    @return Boolean
     */
    Vue.prototype.$deleteSTKey = (key, flag = 1) => {
      if (!flag) {
        let value = sessionStorage.getItem(key);
        if (!value) return false;
        sessionStorage.removeItem(key)
      } else {
        let vuex = JSON.parse(sessionStorage.getItem('vuex'));
        if (!vuex.key) return false;
        delete vuex.key;
        sessionStorage.setItem('vuex', JSON.stringify(vuex))
      }
    }
  }
}
