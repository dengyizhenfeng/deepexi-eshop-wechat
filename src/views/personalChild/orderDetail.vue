<template>
  <div class="page-wrapper" :class="{'has_orderId':orderId}">
    <ImageW :img-url="orderDetail_top.imgUrl" :img-height="247"/>
    <div class="page-top">
      <div v-if="orderPageKey != 'consultant'" class="order-user-wrapper">
        <img class="user-avatar" src="@img/touxiang.png">
        <h3 class="user-name">{{ orderDetailObj.user && orderDetailObj.user.fullname }}</h3>
        <ButtonComp btn-text="联系他" @click.native="handleNavigate('consultantIndex')"/>
      </div>
      <h2 class="car-name">{{ orderDetail_top.itemName }}</h2>
      <p class="car-desc">{{ orderDetail_top.itemTitle }}</p>
    </div>
    <div class="order-cont">
      <p class="cont-title">
        <span :class="{'active': curIndex==0}" @click="handleSwitch(0)">订单明细</span>
        <span
          v-if="orderPageKey == 'consultant' && orderType == 1"
          :class="{'active': curIndex==2}"
          @click="handleSwitch(2)"
        >订单操作</span>
        <span
          v-else-if="orderType == 1"
          :class="{'active': curIndex==1}"
          @click="handleSwitch(1)"
        >订单进度</span>
      </p>
      <keep-alive>
        <component
          :is="currentTabComponent"
          :callback-data="callbackData"
          :order-id="tradeOrderId"
          :order-type="orderType"
          :order-payid="orderPayId"
          :order-payimg="payImg"
        />
      </keep-alive>
    </div>
    <button
      v-if="orderStatus=='to_be_paid' && orderId"
      class="next , btn fixed-bottom"
      @click="handleSubmit()"
    >
      确认支付
    </button>
  </div>
</template>
<script>
import ImageW from "@/components/imageWrapper.vue";
import ButtonComp from "@/components/buttonMedium.vue";
import OrderDetailCont from "./orderDetailCont.vue";
import orderProgress from "./orderProgress.vue";
import orderProgressConsultant from "./orderProgressConsultant.vue";
import PayOrderMixin from "@/minxins/payOrder";
import shareRouteMixin from "@/minxins/shareRoute";

export default {
  components: {
    ButtonComp,
    ImageW,
    OrderDetailCont,
    orderProgress,
    orderProgressConsultant
  },
  mixins: [PayOrderMixin, shareRouteMixin],
  data() {
    return {
      currentTabComponent: OrderDetailCont,
      curIndex: 0,
      orderDetailObj: {},
      orderDetail: [],
      orderDetail_top: [],
      callbackData: {},
      orderProgressArr: [],
      orderProgressConsultantArry: [],
      tradeOrderId: "",
      orderId: this.$route.query.orderId,
      orderStatus: "",
      orderType: 1, // 1 购车订单 2 建桩订单
      orderPageKey: "",
      orderPayId: "",
      payImg: ""
    };
  },
  async created() {
    await this.shareRoute();

    this.tradeOrderId = this.$route.query.id || this.$route.query.orderId;
    this.orderType = this.$route.query.orderType;
    this.orderPageKey = this.$route.query.pageKey;
    this.getOrderDetail().then(res => {
      this.orderDetailObj = res.payload;
      this.callbackData = this.orderDetailObj;
      this.orderStatus = res.payload.outDtoTradeOrder.status;
      this.orderDetail = res.payload.outDtoTradeOrderLines;
      this.orderDetail_top = this.orderDetail[0];
      let payState = res.payload.outDtoOrderPayments;
      payState.forEach(item => {
        if (item.fundType == "FUND_TYPE_END_PAYMENT") {
          this.orderPayId = item.id;
          this.payImg = item.payImage;
        }
      });
    });
    this.getOrderProgress().then(res => {
      this.orderProgressArr = res.payload;
    });
    this.getOrderProgressConsultant().then(res => {
      this.orderProgressConsultantArry = res.payload;
    });
  },
  methods: {
    // ⬇⬇支付
    handleSubmit() {
      this.paynext(1);
    },
    onBridgeReady() {
      this.$api.fourStep
        .payCar({
          orderId: this.orderId
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
                this.$router.replace({
                  name: "fourSteepBuyIndex",
                  query: {
                    callback: "nextCheck",
                    orderId: this.orderId
                  }
                });
              } else {
                this.$toast("支付失败，请稍后重试");
              }
            }
          );
        });
    },
    // ⬆⬆ 支付
    handleSwitch(index) {
      this.curIndex = index;
      if (index === 0) {
        this.currentTabComponent = OrderDetailCont;
        this.callbackData = this.orderDetailObj;
      } else if (index == 1) {
        this.currentTabComponent = orderProgress;
        this.callbackData = this.orderProgressArr;
      } else {
        this.currentTabComponent = orderProgressConsultant;
        this.callbackData = this.orderProgressConsultantArry;
      }
    },
    async getOrderDetail() {
      let res = await this.$api.user.getOrderDetail({
        id: this.tradeOrderId
      });
      return res;
    },
    async getOrderProgress() {
      let res = await this.$api.user.getOrderProgress({
        tradeOrderId: this.tradeOrderId
      });
      return res;
    },
    async getOrderProgressConsultant() {
      let res = await this.$api.user.getOrderProgress({
        tradeOrderId: this.tradeOrderId
      });
      return res;
    },
    handleNavigate(page) {
      this.$router.push({
        name: page
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    to.query.curIndex = this.$route.query.curIndex;
    next();
  }
};
</script>
<style lang="less" scoped>
.page-top {
  padding: 0.4rem /* 15/37.5 */;
  .order-user-wrapper {
    display: flex;
    align-items: center;
  }
  .user-avatar {
    width: 1.173rem /* 44/37.5 */;
    height: 1.173rem /* 44/37.5 */;
    border-radius: 100%;
  }
  .user-name {
    flex: 1;
    margin-left: 0.267rem /* 10/37.5 */;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 0.4rem /* 15/37.5 */;
  }
  /deep/ .medium-btn {
    height: 0.853rem /* 32/37.5 */;
    line-height: 0.53rem /* 32/37.5 */;
    font-size: 0.347rem /* 13/37.5 */;
    color: #000000;
    border-radius: 0.1rem;
  }
  .car-name {
    margin-bottom: 0.267rem /* 10/37.5 */;
    font-size: 0.48rem /* 18/37.5 */;
  }
  .car-desc {
    margin: 0;
    font-size: 0.347rem /* 13/37.5 */;
    color: #999999;
  }
}
.order-cont {
  padding: 0.907rem /* 34/37.5 */ 0.4rem /* 15/37.5 */ 0.4rem /* 15/37.5 */;
  background-color: #fafafa;
  .cont-title {
    margin-top: 0;
    margin-bottom: 0.533rem /* 20/37.5 */;
    padding-left: 0.346rem /* 5/37.5 */;
    font-size: 0.4rem /* 15/37.5 */;
    color: #9a9a9a;
    border-left: 0.107rem /* 4/37.5 */ solid #0bc5b1;
    border-radius: 0.08rem /* 3/37.5 */;
    & > span {
      margin-right: 0.747rem;
      &.active {
        color: #363347;
        font-size: 0.48rem /* 18/37.5 */;
      }
    }
  }
}
.has_orderId {
  padding-bottom: 80px;
}
</style>
