<template>
  <div :class="$style.login" class="connection">
    <div class="login">
      <section :class="$style.welcome">
        <h3>e车购</h3>
        <h3>大客户采购需求</h3>
      </section>
      <section :class="$style.form">
        <van-cell-group>
          <van-field
            v-model="params.companyName"
            placeholder="请输入企业名称"
            :left-icon="require('./../../assets/image/personalCenter/center.png')"
            :clearable="true"
          />
          <van-field
            v-model="params.contactMan"
            placeholder="请输入联系人名称"
            :label-width="2"
            :left-icon="require('./../../assets/image/personalCenter/center.png')"
            :clearable="true"
          />
          <van-field
            v-model="params.contactPhone"
            placeholder="请输入手机号"
            :label-width="2"
            type="number"
            :left-icon="require('./../../assets/image/personalCenter/phone.png')"
            :clearable="true"
            maxlength="11"
          />
          <van-field
            v-model="code"
            center
            left-icon="eye-o"
            placeholder="请输入验证码"
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

          <!-- <van-field
            ref="list"
            v-for="item in count"
            placeholder="请输入采购品牌/车系/车型"
            :clearable="true"
            :key="item"
            @click="focus($event, this)"
          >
          </van-field> -->
          <ul id="inputList">
            <li v-for="(item, index) in count" ref="carsList" :key="index">
              <input
                ref="list"
                class="typeInput"
                type="text"
                :placeholder="item.placeholder"
                readonly
                @click="focus($event, this)"
              >
              <img v-if="index==0" style="position: absolute;right: 0px;margin-top: -10px;width: 20px; height: 20px;" src="@img/personalCenter/add.png" alt="" @click="addVehicle">
              <img v-else ref="del" style="position: absolute;right: 0px;margin-top: -10px;width: 20px; height: 20px;" src="@img/personalCenter/reduce.png" alt="" @click="reduce(index)">
              <input
                ref="number"
                class="typeInput"
                type="number"
                style="margin-top: 0px;"
                placeholder="请输入采购数量"
              >
            <!-- <van-field
              placeholder="请输入采购数量"
              type="number"
              style="margin-top: 0px;"
              :clearable="true"
            />             -->
            </li>
          </ul>
          <p style="text-align: right; height: 20px;">
            <!-- <img style="width: 20px; height: 20px;" src="@img/personalCenter/reduce.png" alt="" @click="reduce"> -->
          </p>  
        </van-cell-group>
      </section>
      <!-- <van-action-sheet
        v-model="show"
        @select="onSelect"
      /> -->
      <van-popup v-model="show" position="bottom" :overlay="true">
        <ul class="list">
          <li
            v-for="item in list"
            @click="itemClick($event, item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </van-popup>
      <van-popup v-model="audi" position="bottom" :overlay="true">
        <ul class="list">
          <li
            v-for="item in adrressList"
            @click="itemAudi($event, item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </van-popup>
      <van-popup v-model="motorcycleType" position="bottom" :overlay="true">
        <ul class="list">
          <li
            v-for="(item, i) in ballList"
            :key="i"
            :value="item"
            @click="itemType($event, item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </van-popup>
      <div :class="$style.btn">
        <button-big
          content="提交"
          @click.native="handleClick"
        />
      </div>
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
      motorcycleType: false,
      count: [{
        placeholder: '请输入采购品牌/车系/车型',
        nume: 89
      }],
      audi: false,
      isDel: false,
      params: {
        companyName: '',
        contactPhone: '',
        contactMan: '',
        cars: []
      },
      code: '',
      unableBtn: false,
      sendSMSText: '发送验证码',
      adrressList: {},
      show: false,
      value: '110101',
      ballList: {},
      showDialog: false,
      list: [],
      vehicle: {
        carBrandName: '',
        carBrandId: '',
        carSeriesId: '',
        carSeriesName: '',
        carModelName: '',
        amount: '',
        carModelId: ''
      },
      el: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfoWX',
      cityCode: 'tryDriving/newCityCode'
    })
  },
  async created() {
    console.log('---')
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
    addVehicle() {
      this.count.push({
        placeholder: '请输入采购品牌/车系/车型'
      })
    },
    reduce(item) {
      if (this.count.length <= 1) return;
      // this.$refs.carsList[item].removeChild(this.$refs.list[item]);
      // this.$refs.carsList[item].removeChild(this.$refs.number[item]);
      // this.$refs.carsList[item].removeChild(this.$refs.del[item]);
      let _this = this;
      this.count.splice(item, 1);
      // console.log(document.querySelectorAll('#inputList>li input'), '==');
    },
    itemType(e, item) {
      this.vehicle.carModelName = item.name;
      this.vehicle.carModelId = item.id;
      this.motorcycleType = false;
      this.el.value += '/' + item.name;
      this.el.setAttribute('vehicle', JSON.stringify(this.vehicle));
    },
    itemAudi(e, item) {
      this.audi = false;
      this.vehicle.carSeriesName = item.name;
      this.vehicle.carSeriesId = item.id;
      this.motorcycleType = true;
      this.ballList = item.pcCarModelList;
      this.el.value += '/' + item.name;
    },
    itemClick(e, item) {
      this.show = false;
      this.vehicle.carBrandName = item.name;
      this.vehicle.carBrandId = item.id;
      this.el.value = item.name;
      this.$api.recommend.getfindThree(item.id)
      .then(res => {
        if (res.payload[0].children) {
          this.audi = true;
          this.adrressList = res.payload[0].children;
          this.ballList = [];
        }
      })
      .catch(err => {});
    },
    focus(e) {
      this.show = true;
      this.el = e.target;
      this.list = [];
      this.$api.recommend.getbrandList().then(res => {
        if (res.payload && res.payload instanceof Array) {
          this.list = res.payload;
          this.adrressList = [];
        }
      })        
      .catch(err => {});
    },
    pickball() {
      this.isShow = true;
    },
    pickCity() {
      this.show = true;
    },
    handleClick () {
      let errorMsg = ''
      let brand = true;
      let amount = true;
      this.$refs.list.filter(item => {
        if (!item.getAttribute('vehicle')) {
          brand = false;
        }
      })
      this.$refs.number.filter(item => {
        if (!item.value) {
          amount = false;
        }
      })
      if (!this.params.companyName) {
        errorMsg = '请输入企业名称'
      } else if (!this.params.contactMan) {
        errorMsg = '请输入联系人'
      } else if (!(/^1[34578]\d{9}$/.test(this.params.contactPhone))) {
        errorMsg = '请输入正确的手机号'
      } else if (this.code.length !== 6) {
        errorMsg = '验证码长度不正确'
      } else if (!brand) {
        errorMsg = '请填写完整采购品牌/车系/车型'
      } else if (!amount) {
        errorMsg = '请填写完整采购数量'
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
      // this.submit()
    },
    async getProve () {
      await this.$api.recommend.getprove({
        code: this.code,
        phone: this.params.contactPhone
      })
      .then(res => {
        if (res.payload.result == 'success') {
          this.submit();
        } else {
          this.$toast(res.payload.msg)
        }
      }, err => {})
    },
    async submit() {
      let _this = this;
      _this.params.cars = [];
      this.$nextTick(function() {
        this.$refs.list.forEach((item, i) => {
          let cars = JSON.parse(item.getAttribute('vehicle'));
          cars.amount = this.$refs.number[i].value;
          _this.params.cars.push(cars);
        })
      })
      await this.$api.recommend.getinsertApplyTradeOrder(this.params)
      .then(res => {
        if (res.payload) {
          this.$toast('提交成功');
          this.params = {
            companyName: "",
            contactMan: "",
            contactPhone: "",
            cars: []
          };
          this.$nextTick(function() {
            this.$refs.list.forEach((item, i) => {
              let cars = JSON.parse(item.getAttribute('vehicle'));
              this.$refs.number[i].value = '';
              this.$refs.list[i].value = ''
            })
          })
          this.code = '';
        }
      }, err => {
        this.$toast(err.payload)
      })
    },
    onJudgeSendSMS() {
      let errorMsg = ''
      if (!this.params.companyName) {
        errorMsg = '请输入您的企业名称'
      } else if (!this.params.contactMan) {
        errorMsg = '请输入联系人名称'
      } else if (!this.params.contactPhone) {
        errorMsg = '请输入手机号'
      } else if (!(/^1[34578]\d{9}$/.test(this.params.contactPhone))) {
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
        phone: this.params.contactPhone,
        ...verifyCodeObj
      }).then(res => {
        if (res.payload.result === 'success') {
          this.$toast('发送成功')
          this.handleDescTime()
        } else {
          this.$toast(res.payload.msg)
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
    .typeInput {
      margin-bottom: 0.1rem;
      margin-top: 0.64rem;
      border: 0;
      width: 100%;
      resize: none;
      display: block;
      color: #323233;
      -webkit-box-sizing: border-box;
      padding: 0.266667rem 0.4rem;
      box-sizing: border-box;
      background-color: #f5f5f5;
      font-size: 0.4rem;
      width: 8rem;
      height: 1.146667rem;
      line-height: 0.6rem;
      box-sizing: border-box;
      border-radius: 0.213333rem;
    }
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
    .list {
      width: 100%;
      overflow: hidden;
      overflow-y: scroll;
      height: 50vh;
      li {
        border-bottom: 1px solid #eee;
        width: 100%;
        height: 1.146667rem;
        text-align: center;
        line-height: 1.146667rem;
        font-size: 0.4rem;
        color: #333;
      }
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
.connection {
  .van-field__label {
    max-width: 0px !important;
  }
  
  // input[type="number"] {
  //   appearance: textfield !important;
  // }
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
