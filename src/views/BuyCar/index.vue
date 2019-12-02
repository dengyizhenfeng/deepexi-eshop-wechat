<template>
  <div class="">
    <div v-if="isShow">
      <section :class="$style.swipe">
        <swipe :images="images" />
      </section>
      <div class="pages">
        <section :class="$style.tags">
          <tag
            v-for="(tag,index) in tags"
            :key="index"
            :class="$style.tag"
            :tag="tag"
            @eventClick="handleClick(index)"
          />
        </section>

        <section :class="$style.contentTitle">
          <contentTitle
            content="您的专属推荐"
            recom="更多车辆"
            @eventClick="recomPush"
          />
        </section>

        <section :class="$style.carlist">
          <van-list
            v-if="!isQuery"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadMore"
          >
            <Header
              :carlist="carlist"
              :is-query="isQuery"
            />
          </van-list>
          <Header
            v-else
            :carlist="carlist"
            :is-query="isQuery"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import swipe from '@/components/swipe.vue'
import Tag from '@/components/tag.vue'
import contentTitle from '@/components/contentTitle.vue'
import Header from '../FourStepBuy/orderHeader.vue'

export default {
  components: {
    swipe,
    Tag,
    contentTitle,
    Header
  },
  data () {
    return {
      tags: [
        {
          content: '新车上市',
          img: require('@img/tabbar/newcar.png')
        },
        {
          content: '四步购车',
          img: require('@img/tabbar/buycarOf4.png')
        },
        {
          content: '专属推荐',
          img: require('@img/tabbar/onlyyou.png')
        }
      ],
      carlist: [],
      loading: false,
      finished: false,
      isShow: false,
      isShowa: false,
      isShowb: false,
      size: 4,
      total: 1,
      timer: null,
      carId: '',
      images: [],
      isQuery: false
    }
  },
  created () {
    this.getData()
    if (this.$route.query.data && JSON.parse(this.$route.query.data).length > 0) {
      this.carlist = JSON.parse(this.$route.query.data)
      this.isQuery = true
      this.isShow = true
      this.isShowa = true
      this.isShowb = true
    } else if (this.$route.query.data && JSON.parse(this.$route.query.data).length === 0) {
      this.$toast('暂未匹配到您的专属推荐')
      this.isQuery = true
      this.isShow = true
      this.isShowa = true
      this.isShowb = true
    } else {
      this.getCarLists()
    }
  },
  methods: {
    async getData () { // 首页 0 推荐 1 资讯· 2 课堂 3
      const data = await this.$api.recommend.getSwitch({ programa: '1', size: 3 })
      this.images = data.payload.content
      this.isShowa = true
      this.isShow = this.isShowb === true
    },
    async getCarLists () {
      const data = await this.$api.fourStep.getCarLists({
        page: 1,
        size: this.size,
        type: 'NEW_CARS'
      })
      this.carlist = data.payload.list
      this.total = data.payload.total
      this.isShowb = true
      this.isShow = this.isShowa === true
    },
    loadMore () {
      this.timer = setTimeout(() => {
        this.size += 4
        this.getCarLists()
        this.loading = false
        if (this.size >= this.total) {
          this.finished = true
        }
      }, 1000)
    },
    handleClick (index) {
      if (index === 2) {
        this.$router.push({
          name: 'personalRecommendCar'
        })
      } else if (index === 1) {
        this.$router.push({
          name: 'fourSteepBuyIndex'
        })
      } else if (index === 0) {
        this.$router.push({
          name: 'newRelease'
        })
      }
    },
    recomPush () {
      this.$router.push({ name: 'car-recommend' })
    }
  }
}
</script>

<style lang="less" module>
.swipe{
  margin-top: .4rem;
  padding: 0 .4rem;
}
.tags{
  width: 9.2rem;
  height: 2.4rem;
  margin-top:1.066667rem;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 0px 6px #D0DBD9;
  border-radius: .1rem;
  align-items: center;
}
.contentTitle{
  margin-top: .766667rem;
}
.carlist{
  margin-top: .693333rem
}
</style>
