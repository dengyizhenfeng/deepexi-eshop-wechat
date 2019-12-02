<template>
  <div class="page-wrapper">
    <ImageW :img-url="orderDetail.productPhoto" />
    <section class="border-bottom section-padding">
      <h6 class="pile-name">
        {{ orderDetail.name }}
      </h6>
    </section>
    <section class="section-padding">
      <h5 class="title">
        支付方式
      </h5>
      <Pay @getPAy="getPay" />
      <div class="total-money-wrapper">
        <p>{{ orderDetail.prompt }}</p>
        <p>¥ {{ orderDetail.depositPercent }}</p>
      </div>
    </section>
    <button
      class="next , btn fixed-bottom"
      @click="handleSubmit()"
    >
      确认支付
    </button>
  </div>
</template>
<script>
  import ImageW from '@/components/imageWrapper';
  import Pay from '../FourStepBuy/pay'
  import PayOrderMixin from '@/minxins/payOrder'

  export default {
    mixins: [PayOrderMixin],
    components: {
      ImageW,
      Pay
    },
    data() {
      return {
        orderDetail: {
          payOrderId: '', // 支付订单ID
          productPhoto: '', // 图片Url
          name: '', // 车辆名称
          prompt: '购车定金', // 提示信息，总金额/购车定金
          depositPercent: '', // 定金
          navigatePage: ''// 支付成功跳转页面参数
        },
        payWay: 1
      }
    },
    mounted() {
      this.orderDetail = JSON.parse(this.$route.query.orderDetail)
    },
    methods: {
      getPay(payWay) {
        this.payWay = payWay;
      },
      handleSubmit () {
        this.paynext(this.payWay);
      },
      onBridgeReady() {
        this.$api.fourStep
          .payCar({
            orderId: this.orderDetail.payOrderId
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
                  this.$router.replace(this.orderDetail.navigatePage)
                } else {
                  this.$toast("支付失败，请稍后重试");
                }
              }
            );
          });
      }
    }
  }
</script>
<style lang="less" scoped>
    .page-wrapper {
        padding-bottom: 1.6rem  /* 60/37.5 */;
        .pile-name {
            margin-bottom: 0;
            margin-top: 0;
            font-size: 0.48rem  /* 18/37.5 */;
            color: #050508;
        }
    }
    .title {
        margin-bottom: 0.373rem  /* 14/37.5 */;
        margin-top: 0;
        font-size: 0.48rem  /* 18/37.5 */;
        color: #050508;
    }
    .total-money-wrapper {
        display: flex;
        height: 1.707rem  /* 64/37.5 */;
        line-height: 1.707rem  /* 64/37.5 */;
        & > p {
            margin: 0;
            font-size: 0.4rem  /* 15/37.5 */;
            &:first-child {
                flex: 1;
                color: #363347;
            }
            &:last-child {
                color: #F4A31C;
            }
        }
    }
</style>
