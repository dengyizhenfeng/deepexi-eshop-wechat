<template>
  <div class="wrapper-padding">
    <div v-if="isShow">
      <van-list
        v-model="isLoading"
        :finished="finished"
        finished-text="没有更多数据"
        :offset="10"
        error-text="请求失败，点击重新加载"
        class="pullUp-refresh-list"
        @load="onRefresh"
      >
        <CarList
          v-for="(carItem, index) in carInfo"
          :key="index"
          :car-info="carItem"
          @click.native="handleNavigate(carItem)"
        >
          <carTimeAndNumber :car-info="carItem.information" :name="name"/>
        </CarList>
      </van-list>
    </div>
  </div>
</template>
<script>
import CarList from "../../components/carList.vue";
import carTimeAndNumber from "../../components/carTimeAndNumber.vue";

export default {
  name: "Information",
  components: {
    CarList,
    carTimeAndNumber
  },
  data() {
    return {
      carInfo: [],
      name: "info",
      isShow: false,
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
    initRequest() {
      this.size = 0;
      this.isLoading = true;
      this.getData(this.reqStep);
    },
    onRefresh() {
      this.size += this.reqStep;
      this.getData(this.size);
    },
    async getData(size) {
      // 首页 0 推荐 1 资讯· 2 课堂 3
      const data = await this.$api.find.getSwitch({
        size: size,
        programa: "2"
      });
      this.carInfo = data.payload.content;
      this.isShow = true;
      if (this.size >= data.payload.totalElements) {
        this.finished = true;
      }
      this.isLoading = false;
    },
    handleNavigate(item) {
      this.$router.push({
        name: "articleDetail",
        query: { infoId: item.jumpUrl }
      });
    }
  }
};
</script>
