<template>
  <section class="page-wrapper">
    <h2 class="title">忘记密码</h2>
    <van-cell-group>
      <van-field
        v-model="userPhone"
        clearable
        left-icon="phone-o"
        placeholder="请输入您注册时使用的手机号码"
        class="input-common"
      />
    
      <div class="sendSMS-wrapper">
        <van-field
          v-model="verifyCode"
          clearable
          placeholder="请输入验证码"
          class="input-common"
        />
        <van-button
          slot="button"
          size="small"
          type="default"
          class="sendSMS-btn"
          :disabled="unableBtn"
          @click="onJudgeSendSMS"
        >
          {{ sendSMSText }}
        </van-button>
      </div>
      <van-field
        v-model="newPassword"
        type="password"
        clearable
        placeholder="请输入您的新密码"
        class="input-common"
      />
      <van-field
        v-model="confirmNewPassword"
        type="password"
        clearable
        placeholder="请再次确认您的新密码"
        class="input-common"
      />
    </van-cell-group>
    <button-big content="确定" class="submit-btn" @eventClick="confirmSubmit"/>
    
    <loading :is-show="isShow" />
  
    <verify-code
      :show-dialog="showDialog"
      @verifyCode="onSendSMS"
      @onCancel="onCancel"
    />
  </section>
</template>
<script>
  import ButtonBig from "@/components/buttonBig.vue";
  import Loading from "@/components/loading.vue";
  import LoginMixin from "@/minxins/login";
  import VerifyCode from '@/components/verifyCode.vue'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'ForgetPassword',
    components: {
      ButtonBig,
      Loading,
      VerifyCode
    },
    mixins: [LoginMixin],
    data() {
      return {
        userPhone: '',
        newPassword: '',
        confirmNewPassword: '',
        verifyCode: '',
        isShow: false,
        unableBtn: false,
        sendSMSText: '发送验证码',
        showDialog: false
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user/userInfoWX'
      })
    },
    methods: {
      onCancel() {
        this.showDialog = false;
      },
      onJudgeSendSMS() {
        let errorMsg = ''
        if (!(/^1[34578]\d{9}$/.test(this.userPhone))) {
          errorMsg = '请输入正确的手机号'
        }
        if (errorMsg) {
          this.$toast(errorMsg)
          return
        }
        this.showDialog = true;
      },
      onSendSMS(verifyCodeObj) {
        this.showDialog = false;
        if (!verifyCodeObj) {
          return;
        }
        
        this.isShow = true;
        this.unableBtn = true
        this.$api.recommend.sendSmsByResetPwd({
          phone: this.userPhone,
          openid: this.userInfo.openid,
          ...verifyCodeObj
        }).then(res => {
          this.isShow = false;
          if (res.payload && res.payload.result === 'success') {
            this.$toast('发送成功');
            this.handleDescTime();
          } else {
            let errMsg = (res.payload && res.payload.msg) || '网络异常，请稍后重试';
            this.$toast(errMsg)
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
      confirmSubmit() {
        let errorMsg = '';
        if (!(/^1[34578]\d{9}$/.test(this.userPhone))) {
          errorMsg = '请输入正确的手机号'
        } else if (!this.verifyCode) {
          errorMsg = '请输入验证码'
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(this.newPassword)) {
          errorMsg = '新密码必须包含数字、大小写字母, 长度为8-20位'
        } else if (this.newPassword !== this.confirmNewPassword) {
          errorMsg = '密码输入不一致'
        }
        if (errorMsg) {
          this.$toast(errorMsg)
          return
        }
        this.resetPassword();
      },
      resetPassword() {
        this.isShow = true;
        this.$api.recommend.resetPassword({
          mobile: this.encryptByAES(this.userPhone),
          password: this.encryptByAES(this.newPassword),
          verifyCode: this.verifyCode
        }).then(res => {
          this.isShow = false;
          const { payload } = res;
          if (+payload.code === 0) {
            this.$toast('密码修改成功')
            this.submitLogin(this.userPhone, this.newPassword);
          } else {
            this.$toast(payload.msg)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .page-wrapper {
    padding: 0 1.013rem  /* 38/37.5 */;
    .input-common {
      margin-bottom: 0.267rem  /* 10/37.5 */;
      background-color: #F2F2F2;
      border-radius: 0.133rem  /* 5/37.5 */;
    }
    .title {
      margin: 2.267rem  /* 85/37.5 */ 0 0.667rem  /* 25/37.5 */;
      text-align: center;
      font-size:0.64rem  /* 24/37.5 */;
    }
    .submit-btn {
      margin-top: 1.067rem  /* 40/37.5 */;
    }
    .sendSMS-wrapper {
      display: flex;
      .sendSMS-btn {
        width: 4.267rem  /* 160/37.5 */;
        height: 1.173rem  /* 44/37.5 */;
        line-height: 1.173rem  /* 44/37.5 */;
        padding: 0 0.267rem  /* 10/37.5 */;
        margin-left: 0.267rem  /* 10/37.5 */;
        font-size: 0.4rem  /* 15/37.5 */;
        border-radius: 0.133rem  /* 5/37.5 */;
        color: #0BC5B1;
        background-color: #F2F2F2;
        border: 0.027rem  /* 1/37.5 */ solid #F2F2F2;
      }
    }
  }
  
</style>
