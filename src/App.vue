<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />

    <div
      v-show="isShow"
      class="loadingWrap"
    >
      <van-loading
        type="spinner"
        class="e-loading"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isShow () {
      return this.$store.state.isLoading;
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
