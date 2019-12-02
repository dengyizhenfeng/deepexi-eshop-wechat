<template>
  <div :class="$style.login">
    <div class="login">
      <section :class="$style.welcome">
        <h3>欢迎</h3>
        <h3>来到e车购</h3>
      </section>
      <section :class="$style.form">
        <van-cell-group>
          <van-field
            v-model="realName"
            placeholder="请输入您的姓名"
            left-icon="contact"
            :clearable="true"
          />
          <van-field
            v-model="phone"
            placeholder="请输入手机号"
            left-icon="phone-o"
            :clearable="true"
            maxlength="11"
          />
          <van-field
            v-model="code"
            center
            left-icon="eye-o"
            placeholder="请输入短信验证码"
            :clearable="true"
            maxlength="6"
          >
            <van-button
              slot="button"
              size="small"
              type="primary"
              :disabled="unableBtn"
              class="sendSMSBtn"
              @click="onJudgeSendSMS"
            >
              {{ sendSMSText }}
            </van-button>
          </van-field>
          <van-field
            v-model="password"
            placeholder="请输入登录密码"
            type="password"
            left-icon="bag-o"
            clearable
          >
            <img
              slot="left-icon"
              class="lock-icon"
              src="@img/login/lock.png"
            >
          </van-field>
        </van-cell-group>
      </section>
      <div :class="$style.btn">
        <button-big
          content="注册"
          @click.native="handleClick"
        />
      </div>

      <p
        class="ft-12"
        :class="$style.register"
      >
        点击注册,即表示你同意 <span :class="$style.user" @click="handleNavigate()">《用户协议》</span>
      </p>
  
      <van-dialog
        v-model="showModel"
        title="电动汽车车联网平台注册协议"
      >
        <register-protocol />
      </van-dialog>
    </div>
    
    <verify-code
      :show-dialog="showDialog"
      @verifyCode="onSendSMS"
      @onCancel="onCancel"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import buttonBig from '@/components/buttonBig.vue'
import VerifyCode from '@/components/verifyCode.vue'
import RegisterProtocol from './register-protocol.vue'
import loginMixin from "@/minxins/login";

export default {
  components: {
    buttonBig,
    RegisterProtocol,
    VerifyCode
  },
  mixins: [
    loginMixin
  ],
  data () {
    return {
      realName: '',
      phone: '',
      code: '',
      password: '',
      unableBtn: false,
      sendSMSText: '发送验证码',
      showModel: false,
      showDialog: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfoWX',
      cityCode: 'tryDriving/newCityCode'
    })
  },
  methods: {
    handleClick () {
      let errorMsg = ''
      if (!this.realName) {
        errorMsg = '请输入您的姓名'
      } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        errorMsg = '请输入正确的手机号'
      } else if (this.code.length !== 6) {
        errorMsg = '验证码长度不正确'
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(this.password)) {
        errorMsg = '登录密码必须包含数字、大小写字母, 长度为8-20位'
      }
      if (errorMsg) {
        this.$toast(errorMsg)
        return
      }
      this.$toast.loading({
        mask: true,
        message: "正在提交"
      });
      this.register().then(res => {
        if (res.payload.result !== 'success') {
          this.$toast(res.payload.msg)
          return
        }
        this.$toast.clear()
        this.submitLogin(this.phone, this.password);
      })
    },
    async register () {
      let msg = await this.$api.recommend.register(
        {
          openid: this.userInfo.openid,
          token: this.userInfo.token,
          unionId: this.userInfo.unionId,
          cityCode: this.cityCode,
          realName: this.realName,
          phone: this.encryptByAES(this.phone),
          code: this.code,
          password: this.encryptByAES(this.password),
          shopId: sessionStorage.getItem('shopId') || localStorage.getItem('shopId')
        }
      )
      return msg
    },
    onJudgeSendSMS() {
      let errorMsg = ''
      if (!this.realName) {
        errorMsg = '请输入您的姓名'
      } else if (!this.phone) {
        errorMsg = '请输入手机号'
      } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        errorMsg = '请输入正确的手机号'
      }
      if (errorMsg) {
        this.$toast(errorMsg)
        return
      }
      this.showDialog = true;
    },
    onCancel() {
      this.showDialog = false;
    },
    onSendSMS (verifyCodeObj) {
      this.showDialog = false;
      if (!verifyCodeObj) {
        return;
      }
      
      this.unableBtn = true
      this.$api.recommend.sendSms({
        phone: this.phone,
        realName: this.realName,
        openid: this.userInfo.openid || 'oTtBCv-L5j_T_1VUIy8afsoHZBnQ',
        unionId: this.userInfo.unionId,
        cityCode: this.cityCode,
        shopId: sessionStorage.getItem('shopId') || localStorage.getItem('shopId'),
        ...verifyCodeObj
      }).then(res => {
        if (res.payload.result === 'success') {
          this.$toast('发送成功')
          this.handleDescTime()
        } else {
          this.$toast(res.payload.msg)
          if (res.payload.result === "tologin") {
            this.$router.push({
              name: 'login'
            })
            return;
          }

          this.unableBtn = false
          this.sendSMSText = '发送验证码'
        }
      })
    },
    handleDescTime () {
      let time = 60
      let timer = setInterval(() => {
        time--
        if (time < 1) {
          clearInterval(timer)
          this.sendSMSText = '发送验证码'
          this.unableBtn = false
        } else {
          this.sendSMSText = time + '秒后重试'
        }
      }, 1000)
    },
    handleNavigate() {
     this.showModel = true;
    }
  }
}
</script>

<style lang="less" module>
    .login{
        padding: 1.493333rem 1.013333rem;
        position: relative;
    }
    .welcome{
        margin-bottom: 1.64rem;
        h3{
            font-size:.746667rem;
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:0.267rem  /* 10/37.5 */;
        }
    }
    .form{
        margin-bottom: .8rem
    }
    .btn{
        // margin-left:.8rem
    }
    .register{
      margin-top: 0.8rem ;
      font-weight: 400;
      color: #868382;
      text-align: center;
      .user{
          color:#189AFF
      }
    }
</style>

<style lang="less" scoped>
    .van-cell {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: .266667rem .4rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        background-color: #F5F5F5;
        color: #323233;
        font-size: 0.373rem  /* 14/37.5 */;
        overflow: hidden;
        width:8rem;
        height:1.146667rem;
        line-height:.6rem;
        background:rgba(245,245,245,1);
        border-radius:.213333rem;
        margin-top:.64rem;
        border-radius: .213333rem;
    }
    .van-button--small {
        width: 1.866667rem;
        height:.586667rem;
        padding: 0 .213333rem;
        font-size: .32rem;
        line-height: .586667rem;
        border-radius:.293333rem;
        border:0.027rem  /* 1/37.5 */ solid #0CAD79;
        background: transparent;
        color:#0CAD79
    }
    /deep/ .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
      font-size: 0.587rem  /* 22/37.5 */;
      color: #C1C1C1;
    }
  .lock-icon {
    width: 0.4rem  /* 15/37.5 */;
  }
  .code-icon {
    width: 0.48rem  /* 18/37.5 */;
  }
</style>
