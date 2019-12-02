<template>
  <div class="navheader">
    <van-tabs
      v-model="active"
      type="line"
      :line-width="20"
      color="#0BC5B1"
      title-active-color="#050508"
      title-inactive-color="#999"
      class="nav"
    >
      <van-tab class="nav" title="选车">
        <section v-if="active === 0" class="carList">
          <car-lists :need-toast="needToast" @getCarId="getCarId"/>
        </section>
      </van-tab>
      <van-tab title="订车" :disabled="orderCarDisabled">
        <section v-if="active === 1" class="orderCar">
          <order-car
            v-if="orderCarActive === 1"
            :id="carId"
            @getCarDetails="getCarDetails"
            @next="next"
          />
          <order-car-second
            v-if="orderCarActive === 2"
            :id="carId"
            :finished-order="finishedOrder"
            @next="next"
          />
          <order-car-third
            v-if="orderCarActive === 3"
            :id="carId"
            :order-details="orderDetail"
            :car-details="carDetails"
            @orderNext="orderNext"
            @modifyOrder="modifyOrder"
          />
          <order-car-fourth
            v-if="orderCarActive === 4"
            :car-details="carDetails"
            :order-details="orderDetail"
            @paynext="paynext"
          />
          <!--<order-car-fifth v-if="orderCarActive === 5" @next="next"/>
          <order-car-sixth v-if="orderCarActive === 6" @nextCheck="nextCheck"/>-->
        </section>
      </van-tab>
      <van-tab title="验车" :disabled="checkCarDisabled">
        <check-car @checkCarNext="nextStepCheck"/>
      </van-tab>
      <van-tab title="提车" :disabled="pickCarDisabled">
        <pick-car-one v-if="pickStep === 1 " @pickCarNext="pickCarNext"/>
        <pick-car-second v-if="pickStep === 2 " @newsNext="newsNext"/>
        <pick-car-third
          v-if="pickStep === 3 "
          :pick-car-news="pickCarNews"
          @pickCarNext="pickCarThird"
        />
        <last-page v-if="pickStep === 4"/>
      </van-tab>
    </van-tabs>
    <Footer v-if="active === 0" @next="nextStep"/>
  </div>
</template>

<script>
import Footer from "./footerTabbar.vue";
import CarLists from "./carList.vue";
import OrderCar from "./orderCar.vue";
import OrderCarSecond from "./orderCarSecond.vue";
import OrderCarThird from "./orderCarThird.vue";
import OrderCarFourth from "./orderCarFourth.vue";
import OrderCarFifth from "./orderCarFifth.vue";
import OrderCarSixth from "./orderCarSixth.vue";
import CheckCar from "./checkCar.vue";
import PickCarOne from "./pickUpCar.vue";
import PickCarSecond from "./pickCarSecond.vue";
import PickCarThird from "./pickCarThird.vue";
import lastPage from "./lastPage.vue";
import PayOrderMixin from '@/minxins/payOrder'

export default {
  name: "Navheader",
  mixins: [PayOrderMixin],
  components: {
    Footer,
    CarLists,
    OrderCar,
    OrderCarSecond,
    OrderCarThird,
    OrderCarFourth,
    OrderCarFifth,
    OrderCarSixth,
    CheckCar,
    PickCarOne,
    PickCarSecond,
    PickCarThird,
    lastPage
  },
  data() {
    return {
      active: 0,
      orderCarActive: 1,
      pickStep: 1,
      orderCarDisabled: true,
      checkCarDisabled: true,
      pickCarDisabled: true,
      carId: "",
      carDetails: {},
      orderDetail: {},
      orderCode: {},
      checkCarType: 0,
      pickCarType: 0,
      pickCarNews: {},
      finishedOrder: {}
    };
  },
  computed: {
    needToast() {
      let count = 0;
      !this.orderCarDisabled && ++count;
      !this.checkCarDisabled && ++count;
      !this.pickCarDisabled && ++count;
      return count === 0;
    }
  },
  created() {
    let callback = this.$route.query.callback;
    if (callback) {
      this.orderCode["order-1"] = this.$route.query.orderId
      this[callback]();
    }
  },
  methods: {
    handleorderSingStam(date) {
      if (date) {
        this.orderSingStam = date
      }
    },
    modifyOrder(item) {
      this.orderCarActive--;
      this.finishedOrder = item;
    },
    nextStep() {
      let getList = this.$store.getters['shoper/setShopLis'];
      if (this.carId !== "" && getList.length) {
        this.orderCarDisabled = false;
        setTimeout(() => {
          this.active = 1;
        }, 10);
      } else {
        this.$toast("请至少选择一辆车，再进行下一步！");
      }
    },
    orderNext(item) {
      this.orderCode = item;
      this.orderCarActive++;
    },
    nextCheck() {
      this.checkCarDisabled = false;
      setTimeout(() => {
        this.active = 2;
      }, 10);
    },
    nextStepCheck(item) {
      this.checkCarType = item;
      this.pickCarDisabled = false;
      setTimeout(() => {
        this.active = 3;
      }, 10);
    },
    next(data) {
      if (data) {
        this.orderDetail = data;
      }
      this.orderCarActive++;
    },
    pickCarNext(item) {
      this.pickCarType = item.checkType;
      if (+this.pickCarType === 1) {
        this.pickStep = 4;
        this.sendAddress(item);
      } else {
        this.pickStep = 2;
      }
    },
    sendAddress(item) {
      let param = {
        orderId: this.orderCode["order-1"],
        address: item.address.ser,
        serviceType: item.checkType
      }
      if (item.checkType == 0) { // 送车上门服务
        param['mobile'] = item.address.phone;
        param['theCarTime'] = item.address.time;
      }
      this.$api.fourStep.sendAddress(param)
    },
    newsNext(item) {
      item = {
        checkType: 0,
        address: item
      }
      this.sendAddress(item);
      this.pickStep = 4;
    },
    pickCarThird(item) {
      this.pickStep++;
    },
    getCarId(item) {
      this.carId = item;
    },
    getCarDetails(item) {
      this.carDetails = item;
    },
    onBridgeReady() {
      this.$api.fourStep
        .payCar({
          orderId: this.orderCode["order-1"]
        })
        .then(res => {
          let obj = res.payload.payResponse;
          if (!obj.appId) {
            this.$toast("网络异常，请稍后重试");
            return;
          }
          // eslint-disable-next-line
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: obj.appId, // 公众号名称，由商户传入
              timeStamp: obj.timeStamp, // 时间戳，自1970年以来的秒数
              nonceStr: obj.nonceStr, // 随机串
              package: obj.packAge,
              signType: obj.signType, // 微信签名方式：
              paySign: obj.paySign // 微信签名
            },
            res => {
              if (res.err_msg === "get_brand_wcpay_request:ok") {
                this.$toast("支付成功");
                this.nextCheck();
              } else {
                this.$toast("支付失败，请稍后重试");
              }
            }
          );
        });
    }
  }
};
</script>

<style scoped>
.navheader {
  height: 100%;
  width: 100%;
}
.nav.van-tab__pane {
  height: 100%;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}
.carList {
  padding-bottom: 1rem;
}
.orderCar {
  margin-top: 1.2rem;
}
</style>
