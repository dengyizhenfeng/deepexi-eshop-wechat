<template>
  <div
    v-show="isShow"
    class="loadingWrap"
  >
    <van-loading
      type="spinner"
      class="e-loading"
    />
  </div>
</template>
<script>
  export default {
    name: "App",
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
<style lang="less" scoped>
  .loadingWrap{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 1000;
    width: 100%;
    background-color: transparent;
    .e-loading {
      width:100%;
      margin:0 auto
    }
  }
</style>
