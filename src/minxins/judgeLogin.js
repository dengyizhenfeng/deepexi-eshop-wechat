import store from '@/store'
export default {
  methods: {
    hasLogin (newPage) {
      let userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')
      if (!userId || this.$userId === userId) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '您尚未登录，请前往登录...'
        }).then(() => {
          if (!this.$route.query.id) {
            this.$router.replace({
              name: 'login'
            })
          } else {
            this.$router.replace({
              name: 'login',
              query: {
                id: this.$route.query.id
              }
            })            
          }
        }).catch(() => {
          if (newPage) {
            this.$router.replace({
              name: newPage
            })
          }

          store.commit('setLoading', false);
        })
        return false
      } else {
        return true
      }
    }
  }
}
