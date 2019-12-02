<template>
  <div class="page-wrapper">
    <div v-if="orderCarActive === 1" class="carlist-wrapper">
      <car-lists :help-order="true" @getCarId="getCarId"/>
      <button
        class="next , btn"
        @click="next"
      >
        下一步
      </button>
    </div>
    <order-car-second
      v-if="orderCarActive === 2"
      :id="carId"
      :help-order="true"
      @next="next"
    />
    <order-car-third
      v-if="orderCarActive === 3"
      :id="carId"
      :order-details="orderDetail"
    />
  </div>
</template>

<script>
  import CarLists from "./carList.vue";
  import OrderCarSecond from "./orderCarSecond.vue";
  import OrderCarThird from "./orderCarThird.vue";

  export default {
    name: 'Fourstep',
    components: {
      CarLists,
      OrderCarSecond,
      OrderCarThird
    },
    data() {
      return {
        carId: '',
        orderCarActive: 1,
        orderDetail: {}
      }
    },
    methods: {
      getCarId(item) {
        this.carId = item;
      },
      next(data) {
        if (!this.carId) {
          this.$toast("请至少选择一辆车，再进行下一步！");
          return;
        }
        if (data) {
          this.orderDetail = data;
        }
        this.orderCarActive++;
      }
    }
  }

</script>

<style lang='less' scoped="true">
  .page-wrapper {
    .carlist-wrapper {
      padding: 0 0.4rem  /* 15/37.5 */;
    }
    .btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%
    }
  }
</style>
