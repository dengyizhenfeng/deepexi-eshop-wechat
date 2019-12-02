<template>
  <div class="carMAp">
    <car-map>
      <div class="btn-wrapper">
        <button-big content="确定" />
      </div>
    </car-map>
  </div>
</template>

<script>
import carMap from '@/components/carMap.vue'

import ButtonBig from '@/components/buttonBig.vue'

export default {
  name: 'CarMAp',
  components: {
    carMap,
    ButtonBig
  },
  data () {
    return {

    }
  },
  methods: {

  }
}

</script>

<style lang="less" scoped>
 .btn-wrapper {
   position: absolute;
   bottom: 2.133rem  /* 80/37.5 */;
   width: 100%;
   text-align: center;
   .van-button--big {
     width: 7.733rem  /* 290/37.5 */;
   }
 }
 .carMAp{
  position:relative
}
.btn{
  position:absolute;
  bottom:1.12rem;
  left: 1.04rem;
  z-index: 40
}
</style>
