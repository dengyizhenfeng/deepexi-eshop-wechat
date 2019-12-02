<template>
  <div class="page-wrapper">
    <div v-if="!isShow">
      <Swipe
        :images="images"
        class="swipe"
      />
      <div class="wrap">
        <NavSwitch :nav-list="navList" />
      </div>
    </div>
  </div>
</template>
<script>
import Swipe from '@/components/swipe.vue'
import NavSwitch from '@/components/navSwitch.vue'
import RecommendCarBrand from './recommendCarBrand.vue'
import RecommendCarCustomize from './recommendCarCustomize.vue'
import RecommendCarEndurance from './recommendCarEndurance.vue'
import RecommendCarPrice from './recommendCarPrice.vue'
import judgeLoginMinxin from "@/minxins/judgeLogin";
export default {
  mixins: [judgeLoginMinxin],
  components: {
    Swipe,
    NavSwitch
  },
  data () {
    return {
      navList: [
        {
          navName: '价格',
          componentName: RecommendCarPrice,
          footerBtnGroup: ['续航里程']
        },
        {
          navName: '续航',
          componentName: RecommendCarEndurance,
          footerBtnGroup: ['价格选择', '品牌喜好']
        },
        {
          navName: '品牌',
          componentName: RecommendCarBrand,
          footerBtnGroup: ['续航里程', '用车目的']
        },
        {
          navName: '订制',
          componentName: RecommendCarCustomize,
          footerBtnGroup: ['重置', '提交']
        }
      ],
      images: [],
      isShow: true
    }
  },
  created () {
    this.getData()
    if (this.hasLogin("personalRecommendCar")) {
      
    }
  },
  methods: {
    async getData () { // 首页 0 推荐 1 资讯· 2 课堂 3
      const data = await this.$api.recommend.getSwitch({ programa: '1', size: 3 })
      this.images = data.payload.content
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
    /deep/ .cont-nav {
        width: 80%;
        margin: 0 auto;
    }
    /deep/ .nav-cont {
        margin-bottom: 1.6rem  /* 60/37.5 */;
        padding-top: 0.8rem  /* 30/37.5 */;
        box-shadow: 0.107rem  /* 4/37.5 */ 0.107rem  /* 4/37.5 */ 0.107rem  /* 4/37.5 */ 0 rgba(204,204,204,0.3) inset;
    }
    /deep/ .recommendCar-btn-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 0.4rem  /* 15/37.5 */;
        & button {
            margin-bottom: 0.4rem  /* 15/37.5 */;
            width: 4.5rem;
        }
    }
</style>

<style scoped>
  .page-wrapper{
    padding-top: .4rem;
  }
 .swipe{
   padding-left: .4rem
 }
 .wrap{
   padding-bottom: 1.4rem
 }
</style>
