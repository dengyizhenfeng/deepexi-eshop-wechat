<template>
  <div class="orderFifth">
    <Header :carlist="carInfo" />
    <section class="payView">
      <h3 class="ft-18 , con">
        支付方式
      </h3>
      <Pay @getPAy="getPAy" />
    </section>
    <section>
      <div class="txtWrap">
        <div class="ft-15 , word">
          购车定金
        </div>
        <div class="ft-15 , money">
          ¥{{ $handleMoney(orderDetails.depositPercent.toString()) }}
        </div>
      </div>
    </section>
    <button
      class="next , btn"
      @click="next"
    >
      确认支付
    </button>
  </div>
</template>

<script>
import Pay from './pay.vue'
import Header from './orderHeader.vue'

export default {
  name: 'OrderFifth',
  components: {
    Pay,
    Header
  },
  props: {
    orderDetails: {
      default: () => {},
      type: Object
    },
    carDetails: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      carInfo: [],
      whichPay: 0
    }
  },
  created () {
    this.getOrderCarFirst();
  },
  methods: {
    next () {
      if (this.whichPay === 0) {
        this.$toast('请至少选择一种支付方式，再进行下一步！')
        return
      }
      this.$emit('paynext', this.whichPay)
    },
    getOrderCarFirst () {
      this.carInfo = this.carDetails
    },
    getPAy (item) {
      this.whichPay = item
    }
  }
}

</script>

<style scoped>
.orderFifth{
  padding-bottom: 1.5rem;
  background: #fafafa;
}
.orderFifth .orderHeader{
      padding: 0 .4rem;
    background: #fff;
}
.payView{
    padding: 0 .4rem;
    background: #fff;
    padding-top: .4rem;
}
.con{
  font-weight:600;
  color:rgba(0,0,0,1);
}
.txtWrap{
  display: flex;
  justify-content: space-between;
  padding: .4rem;
  background: #fff;
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
.btn{
    position: fixed;
    bottom: 0rem;
    left: 0;
    width: 100%
  }
</style>
