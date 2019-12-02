<template>
  <div v-if="carList.length>0">
    <swiper :show-indicators="false" :options="swiperOption">
      <swiperSlide v-for="(item, index) in carList" :key="index">
        <div class="car_group">
          <div class="h100_pic_box">
            <img :src="item.url" class="h100_pic">
          </div>
        </div>
      </swiperSlide>
    </swiper>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import judgeLoginMinxin from "@/minxins/judgeLogin";
let vm = null;
export default {
  name: "NewCar",
  mixins: [judgeLoginMinxin],
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      realIndex: -1,
      swiperOption: {
        autoplay: {
          delay: 3000
        },
        on: {
          click: function() {
            vm.goUrl(vm.carList[this.realIndex].jumpUrl);
          }
        },
        speed: 700,
        observer: true,
        observeParents: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: "1.1"
      },
      carList: []
    };
  },
  methods: {
    async advertisementsNewRelease() {
      let params = {
        page: 1,
        size: 99
      };
      const { payload } = await this.$api.find.advertisementsNewRelease(
        params
      );
      this.carList = payload.content;
    },
    goUrl(link) {
      this.$router.push(link);
    }
  },
  created() {
    vm = this;
    this.advertisementsNewRelease();
    if (this.hasLogin("newRelease")) {
      
    }    
  }
};
</script>
<style lang="scss" scoped>
/deep/ {
  .swiper-container {
    margin: 0.25rem auto 0.5rem;
  }
  .swiper-slide {
    height: calc(100vh - 2.30666rem);
  }
  .swiper-slide {
    box-sizing: border-box;
    margin-top: 0.25rem;
    padding: 0 0.25rem;
  }
}
.car_group {
  float: left;
  border-radius: 0.15rem;
  box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  position: relative;
}
.h100_pic_box {
  height: 100%;
  border-radius: 2px;
  overflow-x: hidden;
}
.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img_banner {
  flex-direction: column;
  height: 2rem;
  width: 2.35rem;
  position: absolute;
  left: 0.55rem;
  top: -0.3rem;
}
.h100_pic {
  height: 100%;
  width: 100%;
}
.rank_bg {
  position: absolute;
  left: 0;
  width: 2.5rem;
  height: 2rem;
}
.rank_pic {
  width: 0.75rem;
  position: relative;
  z-index: 3;
}
.rank_text {
  font-size: 0.4rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.65rem;
  margin: 0;
  position: relative;
  z-index: 3;
}
.ask_now {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0.75rem;
  width: 7.733rem;
  height: 1.333rem;
  background: rgba(11, 197, 177, 1);
  border-radius: 0.6933rem;
  font-size: 0.48rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.8125rem;
}
</style>
