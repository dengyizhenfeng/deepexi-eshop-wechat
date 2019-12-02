<template>
  <div :class="$style.login">
    <div class="login">
      <section :class="$style.welcome">
        <h3>欢迎</h3>
        <h3>专属顾问</h3>
      </section>
      <section :class="$style.form">
        <van-cell-group>
          <van-field
            v-model="phoneNumber"
            placeholder="请输入您的账号"
            left-icon="user-o"
            maxlength="11"
            clearable
          />
          <van-field
            v-model="password"
            placeholder="请输入您的密码"
            type="password"
            left-icon="bag-o"
            clearable
            @keyup.enter.native="handleClick"
          >
            <img slot="left-icon" class="lock-icon" src="@img/login/lock.png">
          </van-field>
        </van-cell-group>
      </section>
      <div :class="$style.btn">
        <button-big content="登录" @eventClick="handleClick"/>
      </div>
      <div :class="$style.registerWrapper">
        <div :class="$style.registerBtn ">
          <router-link :to="{path:'/consultant/consultantRegister'}" :class="$style.link">立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import buttonBig from "@/components/buttonBig.vue";
import loginMixin from "@/minxins/login";
import encryptByAES from "@/minxins/encryptByAES";

export default {
  components: {
    buttonBig
  },
  mixins: [
    loginMixin
  ],
  data() {
    return {
      phoneNumber: "",
      password: "",
      loginOut: 1
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfoWX"
    })
  },
  created() {
    let flag = sessionStorage.getItem('loginOut');
    if (!flag) {
      sessionStorage.setItem('loginOut', 1)
      this.loginOut = sessionStorage.getItem('loginOut');
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/setUserInfo"
    }),
    handleClick() {
      let errorMsg = "";
      if (!this.phoneNumber) {
        errorMsg = "请输入姓名";
      } else if (!this.password) {
        errorMsg = "请输入密码";
      }
      if (errorMsg) {
        this.$toast(errorMsg);
        return;
      }
      this.$toast.loading({
        mask: true,
        message: "登录中..."
      });
      this.consultantLogin({
        username: this.encryptByAES(this.phoneNumber),
        password: this.encryptByAES(this.password)
      })
      .then(res => {
        sessionStorage.setItem('loginOut', 1)
        let { payload } = res;
        let { fullname, shopName, avatar, id, usernumber, tel } = res.payload;
        this.$store.commit('helpPlaceAnOrder/SET_CONSULTANT', {
          id,
          usernumber,
          fullname,
          shopName,
          tel
        });
        this.$store.commit('helpPlaceAnOrder/AVATAR', avatar);
        
        // 更新tenantcode等
        localStorage.setItem('tenantCode', payload.tenantCode || '')
        localStorage.setItem('shopId', payload.shopId || '')
        localStorage.setItem('token', payload.tokenCopy || '')
        sessionStorage.setItem('cityCode', payload.cityCode)
        
        this.$router.replace({
          name: 'consultant_new'
        });
      }, err => {
        this.$toast(err.payload)
      })
    },
    async consultantLogin(params) {
      let data = await this.$api.recommend.getConsultantLogin(params);
      return data;
    }    
  }
};
</script>

<style lang="less" module>
.login {
  padding: 1.493333rem 1.013333rem;
  position: relative;
}
.logo {
  & > img {
    height: 1.52rem /* 57/37.5 */;
    margin-right: 0.533rem /* 20/37.5 */;
  }
}
.welcome {
  margin: 0.88rem /* 33/37.5 */ 0 1.733rem /* 65/37.5 */;
  h3 {
    margin: 0;
    font-size: 0.747rem /* 28/37.5 */;
  }
}
.form {
  margin-bottom: 0.8rem;
}
.btn {
  margin: 50px 0 30px;
}
.registerWrapper {
  position: relative;
  width: 85%;
  margin:0 auto;
  border-bottom: 0.027rem /* 1/37.5 */ solid #cccccc;
  font-size: 0.4rem /* 15/37.5 */;
  text-align: center;
}
.registerBtn {
  position: absolute;
  left: 33.3%;
  top: -0.187rem /* -7/37.5 */;
  background-color: #ffffff;
}
  .link {
    padding: 0 10px;
    color: #0BC5B1;
    font-weight: bolder;
  }
</style>

<style scoped>
.van-cell {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0.266667rem 0.4rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  color: #ababab;
  font-size: 0.373rem /* 14/37.5 */;
  overflow: hidden;
  width: 8rem;
  height: 1.146667rem;
  line-height: 0.6rem;
  margin-top: 0.64rem;
  border-radius: 1.146667rem;
  box-shadow: 0 0.053rem 0.213rem 0 rgba(208, 219, 217, 0.6);
}
.van-button--small {
  width: 1.866667rem;
  height: 0.586667rem;
  padding: 0 0.213333rem;
  font-size: 0.32rem;
  line-height: 0.586667rem;
  border-radius: 0.293333rem;
  border: 0.027rem /* 1/37.5 */ solid #0cad79;
  background: transparent;
  color: #0cad79;
}
.van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
  font-size: 0.587rem /* 22/37.5 */;
  color: #c1c1c1;
}
.lock-icon {
  width: 0.4rem /* 15/37.5 */;
}
</style>
