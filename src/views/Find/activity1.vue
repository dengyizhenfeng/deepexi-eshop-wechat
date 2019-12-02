<template>
  <div class="activity-container">
    <div v-if="!isShow">
      <section class="wrap">
        <swipe :images="images"/>
      </section>

      <router-link :to="{name: 'fourSteepBuyIndex'}" class="link-to-fourSteps">
        <div class="link-wrapper">
          <div class="link-logo">
            <img src="@img/logo.png">
            <van-icon name="arrow" class="arrow-r"/>
          </div>
          <div class="link-info">
            <p>
              四步购车
              <br>一站式购车体验
            </p>
          </div>
          <div class="link-btn">
            <img src="@img/activity/link-btn.png">
          </div>
        </div>
      </router-link>

      <van-list
        v-model="isLoading"
        :finished="finished"
        finished-text="没有更多数据"
        :offset="10"
        error-text="请求失败，点击重新加载"
        class="pullUp-refresh-list"
        @load="onRefresh"
      >
        <activity-list :list="carList" class="activity-list"/>
      </van-list>
    </div>
  </div>
</template>
<script>
import Swipe from "@/components/swipe.vue";
import activityList from "@/components/activityList.vue";

export default {
  name: "Activity",
  components: {
    Swipe,
    activityList
  },
  data() {
    return {
      images: [
        "@img/activity/car-1.png",
        "@img/activity/car-2.png"
      ],
      carList: [],
      name: "activity",
      isShow: true,
      isShowa: true,
      isShowb: true,
      size: 0,
      reqStep: 5,
      isLoading: false,
      finished: false
    };
  },
  created() {
    this.initRequest();
  },
  activated() {
    this.initRequest();
  },
  methods: {
    onRefresh() {
      this.size += this.reqStep;
      this.getLists(this.size);
    },
    initRequest() {
      this.size = 0;
      this.isLoading = true;
      this.getData();
      this.getLists(this.reqStep);
    },
    async getData() {
      // 首页 0 推荐 1 资讯· 2 课堂 3
      const data = await this.$api.find.getSwitch({
        programa: "0",
        size: 3
      });
      this.images = data.payload.content;
      this.isShowa = false;
      this.isShow = this.isShowb === true;
    },
    async getLists(size) {
      const data = await this.$api.find.getShowList({
        size: size
      });
      this.carList = data.payload.content;
      this.isShowb = false;
      this.isShow = this.isShowa === true;
      if (this.size >= data.payload.totalElements) {
        this.finished = true;
      }
      this.isLoading = false;
    }
  }
};
</script>
<style scoped>
.wrap {
  padding: 0 0.4rem;
}
.activity-list {
  padding: 0 0.267rem /* 10/37.5 */;
}
.img-container > img {
  width: 100%;
  height: 100%;
}
.van-button__text {
  line-height: 0.347rem;
  margin-top: 0.05rem;
}
.swipe .img {
  width: 100%;
  height: 100%;
}
.link-to-fourSteps {
  display: block;
}
.link-wrapper {
  display: flex;
  align-items: center;
  width: 8.533rem;
  height: 1.707rem;
  line-height: 1.707rem;
  margin: 0.8rem /* 30/37.5 */ auto;
  padding: 0.4rem /* 15/37.5 */;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.053rem /* 2/37.5 */ 0.213rem /* 8/37.5 */ 0
    rgba(208, 219, 217, 0.6);
  border-radius: 0.133rem /* 5/37.5 */;
}
.link-info {
  position: relative;
  flex: 1;
  font-size: 0.4rem /* 15/37.5 */;
  font-weight: 500;
  color: #050508;
  line-height: 0.56rem /* 21/37.5 */;
  text-align: center;
  font-weight: bold;
}
.link-info:before {
  content: "|";
  display: inline-block;
  transform: scaleX(0.5);
  width: 0.027rem /* 1/37.5 */;
  height: 0.853rem /* 32/37.5 */;
  position: absolute;
  left: 0.267rem /* 10/37.5 */;
  top: 0.667rem /* 25/37.5 */;
  color: #e6e6e6;
  box-shadow: 0 -0.027rem /* -1/37.5 */ 0.107rem /* 4/37.5 */ 0 rgba(232, 232, 232, 0.7);
}
.link-logo {
  line-height: 0.56rem;
}
.link-logo > img {
  width: 1.68rem /* 63/37.5 */;
  vertical-align: middle;
}
.link-logo .arrow-r {
  margin-left: 0.267rem /* 10/37.5 */;
  font-size: 0.427rem /* 16/37.5 */;
  color: #999999;
  vertical-align: middle;
}
.link-btn {
  width: 0.88rem /* 33/37.5 */;
  height: 0.88rem /* 33/37.5 */;
  line-height: 0.88rem /* 33/37.5 */;
}
.link-btn > img {
  width: 100%;
}
</style>
