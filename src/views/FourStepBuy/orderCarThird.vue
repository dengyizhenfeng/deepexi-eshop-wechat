<template>
  <div class="orderCarThird">
    <div class="wrap">
      <Header v-if="!userInfo.userName" :carlist="carInfo"/>
      <section>
        <h3 class="ft-18 , con">
          <div v-if="userInfo.userName" class="userInfo-wrapper">
            <p class="tit" style="padding-top: 0.4rem;">
              客户信息
            </p>
            <order-detail :order-details="userInfo" />
          </div>
          
          <p class="tit">
            订单明细
          </p>
          <div @click="modifyOrder">
            <order-detail :order-details="orderDetails" />
          </div>

          <section class="priceView">
            <div class="txtWrap">
              <p class="ft-15 , word">
                购车总价
              </p>
              <p class="ft-15 , money">
                ¥{{ $handleMoney(orderDetails.allPrice.toString()) }}
              </p>
            </div>
            <div
              class="txtWrap"
              style="border-top: 0.027rem  /* 1/37.5 */ solid #ccc"
            >
              <div class="ft-15 , word">
                购车定金
              </div>
              <div class="ft-15 , money">
                ¥{{ $handleMoney(orderDetails.depositPercent.toString()) }}
              </div>
            </div>
          </section>
        </h3>
      </section>
    </div>
    <button
      v-if="!userInfo.userName"
      class="next , btn"
      @click="next(1)"
    >
      下一步
    </button>
    <button
      v-else
      class="next , btn"
      @click="next(2)"
    >
      发送给客户
    </button>
  </div>
</template>

<script>
import Header from './orderHeader.vue'
import orderDetail from './orderDetail.vue'

export default {
  name: 'OrderCarThird',
  components: {
    Header,
    orderDetail
  },
  props: {
    orderDetails: {
      default: () => ({}),
      type: Object
    },
    id: {
      type: String,
      default: ''
    },
    carDetails: {
      default: () => ([]),
      type: Array
    }
  },
  data () {
    return {
      carInfo: {},
      orderCode: '',
      userInfo: JSON.parse(sessionStorage.getItem('customerInfo')) || {}
    }
  },
  created () {
    this.getOrderCarFirst()
  },
  methods: {
    modifyOrder () {
      this.$emit('modifyOrder', this.orderDetails)
    },
    getOrderCarFirst () {
      this.carInfo = this.carDetails
    },
    async next (num) { // 1: 正常下单 2：代客户下单
      num = +num;
      if (num === 1) {
        this.$toast.loading({
          mask: true,
          message: '生成订单中...'
        })
      }
      const status = this.orderDetails.serviceBObj.installService ? 'NEW_VEHICLE_INSTALL_TYPE' : ''

      let { payload } = await this.$api.fourStep.orderCheck({
        memberId: this.userInfo.memberId || ''
      });
      let params = {
        'orderSingStam': payload,
        'giftFlag': false,
        'remark': '3',
        'isReplace': false,
        'isDeposit': true,
        'orderType': 'NEW_VEHICLE_ORDER_TYPE',
        'status': status,
        'skuAndQtyList': [{
          'productType': 'NEW_CAR',
          'skuId': this.orderDetails.styleColor0bj.id,
          'quantity': 1
        },
          {
            'productType': 'SERVICE',
            'bundleId': this.orderDetails.serviceEObj.id,
            'quantity': 1
          },
          {
            'productType': 'BOUTIQUE',
            'bundleId': this.orderDetails.serviceFObj.id,
            'quantity': 1
          },
          {
            'productType': 'INSTALLMENT',
            'skuId': this.orderDetails.serviceCObj.id,
            'quantity': 1
          },
          {
            'productType': 'PILE',
            'skuId': this.orderDetails.serviceBObj.id,
            'quantity': 1
          },
          {
            'productType': 'CHARGE',
            'skuId': this.orderDetails.serviceAObj.id,
            'quantity': 1
          },
          {
            'productType': 'INSURANCE',
            'skuId': this.orderDetails.serviceDObj.id,
            'quantity': 1
          }
        ],
        'audit': true
      };
      
      let infoConsultant = JSON.parse(sessionStorage.getItem('infoConsultant')) || {}
      if (num === 2) {
        params.memberId = this.userInfo.memberId;
        params.operatorUserId = infoConsultant.id;
      }
      
      const orderCode = await this.$api.fourStep.submitOrder(
        params
      )
      
      if (num === 1) {
        this.orderCode = orderCode.payload
        this.$emit('orderNext', this.orderCode)
        if (orderCode.payload['order-2']) {
          this.$store.commit('fourstep/setOrder', orderCode.payload['order-2'])
        }
        this.$store.commit('fourstep/setCharging', this.orderDetails.serviceBObj)
        this.$toast.clear()
      } else {
        if (orderCode.payload['order-1']) {
          this.$api.user.sendOrderToCustomer({
            orderId: orderCode.payload['order-1']
          }).then(sendRes => {
            this.$store.commit('setLoading', false)
            if (sendRes.payload) {
              this.$toast('发送成功');
              this.$router.replace({
                name: 'consultant_new'
              })
            }
          }).catch(err => {
            this.$router.replace({
              name: 'consultant_new'
            })
          });
        }
      }

      // 删除订单
      let chooseOrderId = localStorage.getItem('chooseOrderId');
      this.$api.fourStep.deleteShopCart({
        ids: [chooseOrderId]
      }, infoConsultant.id || '').then(res => {
        if (res.payload) {
          localStorage.removeItem('chooseOrderId');
        }
      }).catch(err => {
        this.$toast(err.payload)
      })
    }
  }
}

</script>

<style scoped>
.orderCarThird{
      /* padding: 0 .4rem; */
    background: #fafafa;
}
.orderCarThird .orderHeader{
      padding: 0 .4rem;
    background: #fff;
}

.wrap{
  margin-bottom: 1.3rem;
}
.con{
  color: #050508;
  background: #fafafa;
  padding-bottom: .4rem;
}
.con .tit{
    margin: 0;
    /* padding-top: .9rem; */
    position: relative;
    font-weight: 600;
    margin-bottom: .4rem;
    margin-left: .4rem;
    padding-left: .4rem;
}
.con .tit::before{
    content: "";
    width: .1rem;
    height: .5rem;
    background: #0BC5B1;
    position: absolute;
    left: 0;
    border-radius: 0.053rem  /* 2/37.5 */;
    bottom: .05rem;
}
.txtWrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .4rem 0;
}
.word{
  font-weight:500;
  color:rgba(0,0,0,1);
  margin: 0;
}
.money{
  font-weight:500;
  color:rgba(244,163,28,1);
  margin: 0;
}
.priceView{
  background: #fff;
  margin: .4rem;
  border-radius: .1rem;
  padding: 0 .4rem;
}
.btn{
    position: fixed;
    bottom: 0rem;
    left: 0;
    width: 100%
  }
  .userInfo-wrapper {
    margin-bottom: 0.773rem  /* 29/37.5 */;
  }
</style>
