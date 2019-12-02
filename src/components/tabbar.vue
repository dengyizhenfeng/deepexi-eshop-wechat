<template>
  <div class="wrap">
    <van-tabbar
      :value="tabActive"
      active-color="#2E3040"
      class="header"
      @change="selectTab"
    >
      <van-tabbar-item class="index" :to="{ path: '/' }" :replace="true">
        <span>发现</span>
        <img
          v-if="tabActive === 0"
          slot="icon"
          src="@img/tabbar/find-active.png"
        >
        <img v-else slot="icon" src="@img/tabbar/find-normal.png">
      </van-tabbar-item>
      <van-tabbar-item :to="{ path: '/buyCar'}" :replace="true">
        <span>推荐</span>
        <img
          v-if="tabActive === 1"
          slot="icon"
          src="@img/tabbar/buycar-active.png"
        >
        <img v-else slot="icon" src="@img/tabbar/buycar-normal.png">
      </van-tabbar-item>
      <van-tabbar-item class="consultant" to="/consultant" :replace="true">
        <span class="consultantText">专属顾问</span>
        <img
          v-if="tabActive === 2"
          slot="icon"
          src="@img/tabbar/consultant-active.png"
        >
        <img v-else slot="icon" src="@img/tabbar/consultant-normal.png">
      </van-tabbar-item>
      <van-tabbar-item class="charging" icon="add-o" to="/charging">
        <span>充电</span>
        <img
          v-if="tabActive === 3"
          slot="icon"
          src="@img/tabbar/charging-active.png"
        >
        <img v-else slot="icon" src="@img/tabbar/charging-normal.png">
      </van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/personal" :replace="true">
        <span>我的</span>
        <img
          v-if="tabActive === 4"
          slot="icon"
          src="@img/tabbar/personal-active.png"
        >
        <img v-else slot="icon" src="@img/tabbar/personal-normal.png">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  computed: {
    tabActive() {
      const pn = this.$route.name;
      let val = 0;
      switch (pn) {
        case "findIndex": // 发现
          val = 0;
          break;
        case "buyCarIndex": // 推荐
          val = 1;
          break;
        case "consultantIndex": // 专属顾问
          val = 2;
          break;
        case "chargingIndex": // 充电
          val = 3;
          break;
        case "personalIndex": // 我的
          val = 4;
          break;
      }
      return val;
    }
  },
  data() {
    return {};
  },
  methods: {
    selectTab(item) {
      this.$store.commit("tab/setActive", item);
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.header {
  height: 1.30666rem;
  font-size: 0.32rem;
  box-shadow: 0px 0px 6px #ccc;
  border: transparent;
}
img {
  width: 0.506667rem;
  height: 0.506667rem;
}
.charging img {
  height: 0.48rem;
}
.consultant img {
  height: 0.45333rem;
}
.wrap .van-tabbar {
  z-index: 2000 !important;
}
</style>
