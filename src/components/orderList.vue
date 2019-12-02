<template>
  <div class="order-item">
    <ImageW
      class="image-wrapper"
      :img-url="orderObj.imgUrl"
    />
    <div class="item-right">
      <div>
        <h3 class="car-title intercept-line-1">
          {{ orderObj.name }}
        </h3>
        <p
          class="car-desc intercept-line-2"
        >
          {{ orderObj.title }}
        </p>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
import ImageW from './imageWrapper.vue'
export default {
  components: {
    ImageW
  },
  props: {
    orderObj: {
      type: Object,
      default: null
    }
  }
}
</script>
<style lang="less" scoped>
    .item-right {
        margin-left: .24rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .car-title {
        margin: 0;
            color: #363347;
            font-size:.4rem;
        }
        .car-desc {
            color: #999999;
            font-size:0.32rem  /* 12/37.5 */;
            margin: 0.267rem  /* 10/37.5 */ 0;
        }
    }
    .order-item {
        display: flex;
        padding: .42rem .26rem;
        background: #fff;
        align-items: flex-start;
        height: 2.4rem;
    }
</style>
