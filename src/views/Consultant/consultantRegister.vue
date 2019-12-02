<template>
  <div :class="$style.login" class="consultantRegister">
    <div class="login">
      <section :class="$style.welcome">
        <h3>欢迎</h3>
        <h3>专属顾问</h3>
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
            placeholder="请输入您的手机号码"
            left-icon="orders-o"
            :clearable="true"
            maxlength="11"
          />
          <van-field
            v-model="code"
            center
            left-icon="eye-o"
            placeholder="请输入您的验证码"
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
          <van-cell :title="city" icon="hotel-o" arrow-direction="down" is-link @click="pickCity" />
          <van-cell v-if="city != '申请城市'" :title="ball" icon="todo-list-o" arrow-direction="down" is-link @click="pickball" />
        </van-cell-group>
      </section>
      <van-popup v-model="show" position="bottom" :overlay="true">
        <van-area :area-list="adrressList" :columns-num="1" :value="value" @cancel="cancel" @confirm="confirm" />
      </van-popup>
      <van-popup v-model="isShow" position="bottom" :overlay="true">
        <van-area :visible-item-count="3" :area-list="ballList" :columns-num="1" @cancel="cancel1" @confirm="confirm1" />
      </van-popup>
      <div :class="$style.btn">
        <button-big
          content="注册"
          @click.native="handleClick"
        />
      </div>

      <!-- <p
        class="ft-12"
        :class="$style.register"
      >
        点击注册,即表示你同意 <span :class="$style.user" @click="handleNavigate()">《用户协议》</span>
      </p> -->
  
      <van-dialog
        v-model="showModel"
        title="电动汽车车联网平台注册协议"
      >
        <register-protocol />
      </van-dialog>
    </div>
  
    <verify-code :show-dialog="showDialog" @verifyCode="onSendSMS" @onCancel="onCancel"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import buttonBig from '@/components/buttonBig.vue'
// import RegisterProtocol from './register-protocol.vue'
import loginMixin from "@/minxins/login";
import VerifyCode from '@/components/verifyCode.vue'

export default {
  components: {
    buttonBig,
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
      consultantNumber: '',
      unableBtn: false,
      sendSMSText: '发送验证码',
      showModel: false,
      adrressList: {},
      show: false,
      city: '申请城市',
      citys: [],
      value: '110101',
      ball: '选择营业厅',
      ballList: {},
      isShow: false,
      ballObj: {},
      balls: {},
      showDialog: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfoWX',
      cityCode: 'tryDriving/newCityCode'
    })
  },
  async created() {
    let res = await this.$api.find.getCityList();
    let provinceList = {}
    res.payload.forEach(item => {
      provinceList[item.cityCode] = item.cityName;
    })
    this.adrressList = {
      'province_list': provinceList
    }
  },
  methods: {
    pickball() {
      this.isShow = true;
    },
    confirm1(data) {
      this.isShow = false;
      if (data.length >= 1 && data[0] !== undefined) {
      this.ball = data[0].name;
        for (let item in this.ballObj) {
          if (data[0].code == item) {
            this.balls.code = data[0].code;
            this.balls.tell = this.ballObj[item];
          }
        }
      }
    },
    cancel1() {
      this.isShow = false;
    },
    cancel() {
      this.show = false;
    },
    confirm(city) {
      console.log()
      this.city = city[0].name;
      this.ball = '选择营业厅';
      this.citys.push(...city);
      this.show = false;
      // this.citys = '请选择营业厅';
      this.getzsgwApply(city[0].code);
    },
    pickCity() {
      this.show = true;
    },
    handleClick () {
      let errorMsg = ''
      if (!this.realName) {
        errorMsg = '请输入您的姓名'
      } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        errorMsg = '请输入正确的手机号'
      } else if (this.code.length !== 6) {
        errorMsg = '验证码长度不正确'
      } else if (this.city == '申请城市') {
        errorMsg = '请选择城市'        
      } else if (this.ball == '选择营业厅') {
        errorMsg = "请选择营业厅"
      }
      if (errorMsg) {
        this.$toast(errorMsg)
        return
      }
      this.$toast.loading({
        mask: true,
        message: "正在提交"
      });
      this.getProve();
    },
    async getProve () {
      await this.$api.recommend.getprove({
        code: this.code,
        phone: this.phone
      })
      .then(res => {
        if (res.payload.result == 'success') {
          this.register();
        } else {
          this.$toast(res.payload.msg)
        }
      }, err => {

      })
    },
    async register() {
      // await this.$api.recommend.getshopList({
      //   cityCode: this.citys[0].code
      // })
      // .then(res => {}, err => {})
      await this.$api.recommend.getConsultantRegister({
        realName: this.realName,
        phone: this.phone,
        cityName: this.citys[0].name,
        cityCode: this.citys[0].code,
        shopId: this.balls.code,
        tenantCode: this.balls.tell
      })
      .then(res => {
        this.$router.push({
          name: 'consultantLogin'
        });
      }, err => {
        this.$toast(err.payload)
      })
    },
    async getzsgwApply(code) {
      await this.$api.recommend.getzsgwApply({
        proviceCode: code
      })
      .then(res => {
        const obj = {};
        if (res.payload) {
          res.payload.map(item => {
            obj[item.id] = item.name;
            this.ballObj[item.id] = item.tenantCode;
          })
          this.ballList = {
            province_list: { ...obj }
          }
        }
      })
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
      this.$api.recommend.getSendCode({
        phone: this.phone,
        ...verifyCodeObj
      }).then(res => {
        if (res.payload.result === 'success') {
          this.$toast('发送成功')
          this.handleDescTime()
        } else {
          this.$toast(res.payload.msg)
          if (res.payload.result === "tologin") {
            this.$router.push({
              name: 'consultantLogin'
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
  },
  watch: {
    phone(val) {
      if (this.phone.length == 1) {
        this.phone = this.phone.replace(/[^1-9]/g, '')
      } else {
        this.phone = this.phone.replace(/\D/g, '')
      }
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
        .van-cell__title {
          color: #999;
        }
        .van-cell__left-icon {
          counter-reset: #999;
        }
    }
    .van-icon {
      color: #999;
    }
    section {
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
  .van-picker-column__item {
    text-align: center !important;
    
  }
  .van-ellipsis {
    border-bottom: none !important;
  }
</style>
<style lang='less' >
.consultantRegister {
  .van-picker-column__item {
    text-align: center; 
  }
  .van-ellipsis {
    border-bottom: none;
  }
  .van-picker-column__item--selected {
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .van-picker-column__item--selected {
      border-bottom: 0.333333px solid #ebedf0;
      border-top: 0.333333px solid #ebedf0;
    }
  }
  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .van-picker-column__item--selected { 
      border-bottom: 0.333333px solid #ebedf0;
      border-top: 0.333333px solid #ebedf0;
    }
  }
}
 
</style>
