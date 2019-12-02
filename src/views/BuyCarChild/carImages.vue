<template>
  <div class="comp-wrapper">
    <imageW
      v-for="(item, index) in callbackData"
      :key="index"
      :img-url="item.url"
    />
  </div>
</template>
<script>
import imageW from '../../components/imageWrapper.vue'
export default {
  components: {
    imageW
  },
  props: {
    callbackData: {
      type: Array,
      require: true,
      default: null
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
  .comp-wrapper {
    .imgWrapper {
      margin-bottom: 0.267rem  /* 10/37.5 */;
    }
  }
</style>
