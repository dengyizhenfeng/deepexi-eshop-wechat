<template>
  <div class="classroom">
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
        <section
          v-for="(item,index) in lists"
          :key="index"
          class="section-a"
          @click.stop="goDetail(item)"
        >
          <span class="ft-15 , txta">{{ item.information.mainTitle }}</span>
          <div v-if="/.[png|jpeg|jpg]$/.test(item.url)" class="vedioView">
            <img :src="item.url">
          </div>
          <Vedio-com v-else class="vedioView" :url="item.url"/>
          <div class="wrap">
            <div>
              <img src="@img/find/time.png" alt class="img">
              <span class="ft-12 , txtb">{{ $formatTime(item.information.createdAt/1000) }}</span>
            </div>
            <div>
              <img src="@img/find/eye.png" alt class="imgb">
              <span class="ft-12 , txtb">{{ item.information.pageView }}</span>
            </div>
          </div>
        </section>
      </van-list>
    </div>
  </div>
</template>

<script>
import VedioCom from "./vedioCom.vue";

export default {
  name: "Classroom",
  components: {
    VedioCom
  },
  data() {
    return {
      lists: [],
      isShow: false,
      urlType: "image",
      size: 0,
      reqStep: 10,
      isLoading: false,
      finished: false
    };
  },
  created() {
    this.size = 0;
    this.isLoading = true;
    this.getVedio(this.reqStep);
  },
  activated() {
    this.size = 0;
    this.isLoading = true;
    this.getVedio(this.reqStep);
  },
  methods: {
    onRefresh() {
      this.size += this.reqStep;
      this.getVedio(this.size);
    },
    async getVedio(size) {
      const data = await this.$api.find.getVedio({
        programa: "3",
        size: size
      });
      this.lists = data.payload.content;
      this.isShow = true;
      if (this.size >= data.payload.totalElements) {
        this.finished = true;
      }
      this.isLoading = false;
    },
    goDetail(item) {
      this.$router.push({
        name: "classroomDetail",
        query: { vedioId: item.jumpUrl, url: item.url }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.classroom {
  /* background:rgba(242,242,242,1) */
  height: 100%;
}

.section-a {
  background: #fff;
  margin-bottom: 0.6rem;
}
.txta {
  padding: 0 0.4rem;
  display: block;
  font-size: 0.48rem /* 18/37.5 */;
  margin-top: 0.8rem;
  padding-bottom: 0.4rem;
}
.txtb {
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.img {
  height: 0.346667rem;
  width: 0.346667rem;
  margin-right: 0.2rem;
  margin-bottom: -0.05rem;
}
.imgb {
  height: 0.346667rem;
  width: 0.446667rem;
  margin-right: 0.2rem;
  margin-bottom: -0.05rem;
}
.wrap {
  width: 9.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.4rem;
}
.vedioView {
  padding: 0 0.4rem;
  overflow: hidden;
  box-sizing: border-box;
  img {
    width: 100%;
  }
}
</style>
