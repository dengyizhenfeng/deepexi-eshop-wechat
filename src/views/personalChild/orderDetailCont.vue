<template>
  <div class="comp-cont">
    <div
      v-for="(item, index) in orderDetailArr"
      :key="index"
      class="order-detail-item"
    >
      <div v-if="index === 0">
        <div class="item-top">
          <h6 class="item-title">
            订单号
          </h6>
          <p class="item-cont">
            {{ item.tradeOrderId }}
          </p>
        </div>
      </div>
      <div v-else>
        <div class="item-top">
          <h6 class="item-title">
            {{ item.itemName }}
          </h6>
          <p class="item-cont">
            {{ item.propValues }}
          </p>
        </div>
        <p
          v-if="item.propNames"
          class="item-desc"
        >
          {{ item.propNames }}
        </p>
      </div>
    </div>

    <div
      v-if="address"
      class="order-detail-item"
    >
      <div class="item-top">
        <h6 class="item-title">
          服务类型
        </h6>
        <p class="item-cont">
          {{ address.serviceType == 0 ? '送车上门' : '到店取车' }}
        </p>
      </div>
    </div>

    <div
      v-if="address"
      class="order-detail-item"
    >
      <div class="item-top">
        <h6 class="item-title">
          送车地址
        </h6>
        <p class="item-cont">
          {{ address.address }}
        </p>
      </div>
    </div>

    <div class="order-detail-item detail-item-price">
      <div
        v-for="item in orderPriceArr"
        :key="item.itemName"
        class="item-top price-wrapper"
      >
        <h6 class="item-title">
          {{ item.itemName }}
        </h6>
        <p class="item-cont price-cont">
          {{ item.propValues }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    callbackData: {
      type: Object,
      require: true,
      default: null
    }
  },
  computed: {
    orderDetailArr () {
      return this.callbackData.outDtoTradeOrderLines
    },
    address() {
      return this.callbackData.mcSendCar
    },
    orderPriceArr () {
      let payMoney = 0
      let maxDeposit = 0
      let outDtoTradeOrder = this.callbackData.outDtoTradeOrder
      if (outDtoTradeOrder) {
        payMoney = outDtoTradeOrder.payMoney
        maxDeposit = outDtoTradeOrder.minDeposit
      }
      const t = this.$route.query.orderType
      let nameText = t === 1 ? '购车总价' : '订单总价'
      let depositText = t === 1 ? '购车订金' : '订金'
      return [{
        itemName: nameText,
        propValues: `¥${payMoney}`
      }, {
        itemName: depositText,
        propValues: `¥${maxDeposit}`
      }]
    }
  }
}
</script>
<style lang="less" scoped>
    .comp-cont {
        .order-detail-item {
            padding: 0.48rem  /* 18/37.5 */;
            margin-bottom: 0.133rem  /* 5/37.5 */;
            background-color: #ffffff;
            border-radius:0.267rem  /* 10/37.5 */;
            .item-top {
                display: flex;
                justify-content: space-between;
                .item-title {
                    margin: 0;
                    color: #363347;
                    font-size: 0.373rem  /* 14/37.5 */;
                }
                .item-cont {
                  max-width: 60%;
                  word-break: break-all;
                    margin: 0;
                    color: #666666;
                    font-size: 0.373rem  /* 14/37.5 */;
                }
            }
            .item-desc {
                margin-top: 0.24rem  /* 9/37.5 */;
                margin-bottom: 0;
                color: #999999;
                font-size: 0.373rem  /* 14/37.5 */;
            }
            .price-wrapper {
                padding: 0.48rem  /* 18/37.5 */ 0;
                .price-cont {
                    color: #F4A31C;
                }
                &:first-child {
                    border-bottom: 0.027rem  /* 1/37.5 */ solid #E6E6E6;
                }
            }
        }
        .detail-item-price {
            padding-top: 0;
            padding-bottom: 0;
        }
    }
</style>
