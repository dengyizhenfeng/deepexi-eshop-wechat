<template>
  <div class="comp-wrapper">
    <video-player
      v-for="(item, index) in callbackData"
      :key="index"
      :url="item.url"
    />
  </div>
</template>
<script>
import videoPlayer from '../Find/vedioCom.vue'

export default {
  components: {
    videoPlayer
  },
  props: {
    callbackData: {
      type: Array,
      require: true,
      default: null
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/ .video-wrapper {
    height: 5.52rem  /* 207/37.5 */;
    margin-bottom: 0.4rem  /* 15/37.5 */;
    .video-player-box {
      height: 100%;
    }
  }
  .comp-wrapper .tit {
    margin-top: 0;
  }

</style>
