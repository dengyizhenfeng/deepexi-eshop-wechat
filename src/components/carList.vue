<template>
  <div class="car-list-item">
    <img-w :img-url="carInfo.url"/>
    <p class="car-title">
      {{ carInfo.information.mainTitle }}
    </p>
    <slot />
  </div>
</template>
<script>
  import ImgW from '@/components/imageWrapper.vue'
export default {
  name: 'CarList',
  props: {
    carInfo: {
      type: Object,
      required: true,
      default: null
    }
  },
  components: {
    ImgW
  }
}
</script>
<style scoped>
    .car-list-item {
        padding-bottom: 0.613rem  /* 23/37.5 */;
        margin-bottom: 0.533rem  /* 20/37.5 */;
        border-bottom: 0.027rem  /* 1/37.5 */ solid #E6E6E6;
    }
    .car-title {
        margin: 0.4rem  /* 15/37.5 */ 0;
        font-size: 0.48rem  /* 18/37.5 */;
    }
</style>
