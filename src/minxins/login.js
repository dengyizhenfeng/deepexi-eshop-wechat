import { mapGetters } from "vuex";
import encryptByAES from "@/minxins/encryptByAES";

export default {
  mixins: [
    encryptByAES
  ],
  computed: {
    ...mapGetters({
      userInfo: "user/userInfoWX"
    })
  },
  methods: {
    async login(phoneNumber, password) {
      let msg = await this.$api.recommend.login({
        mobile: this.encryptByAES(phoneNumber),
        password: this.encryptByAES(password),
        openid: this.userInfo.openid || 'oTtBCv3LCHhrUeqe7tTxEQJYxwVw',
        unionId: this.userInfo.unionId,
        shopId: sessionStorage.getItem("shopId") || localStorage.getItem("shopId")
      });
      return msg;
    },
    submitLogin(phoneNumber, password) {
      this.login(phoneNumber, password)
        .then(res => {
          let code = +res.payload.code;
          if (code === 0) {
            this.$toast("登录成功");
          } else {
            this.$toast(res.payload.message);
            return;
          }
          localStorage.setItem("token", res.payload.data.token);
          localStorage.setItem("userId", res.payload.data.userId);
          switch (this.$route.query.id) {
            case '1':
              this.$router.replace({
                name: 'newRelease'
              });
              break;
            case '2':
              this.$router.replace({
                name: 'fourSteepBuyIndex'
              });
              break;
            case '3':
              this.$router.replace({
                name: 'personalRecommendCar'
              });
              break;
            case '4':
              this.$router.replace({
                name: 'charging'
              });
              break;
            default:
              this.$router.replace({
                name: "findIndex"
              })
          }
        })
    }
  }
}
