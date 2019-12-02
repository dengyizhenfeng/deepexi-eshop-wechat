<template>
  <div>
    <section class="page-cont">
      <div class="cont-nav">
        <ul class="nav-list">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{'active': currentIndex==index}"
          >
            {{ item.navName }}
          </li>
        </ul>
      </div>
      <div class="nav-cont">
        <keep-alive>
          <component
            :is="currentTabComponent"
            @getPrice="getPrice"
            @getEndurance="getEndurance"
            @getBrand="getBrand"
            @getOrder="getOrder"
          />
        </keep-alive>
      </div>
    </section>
    <div
      v-if="footerBtnGroup.length === 1"
      class="recommendCar-footer"
    >
      <van-button
        size="large"
        class="next-btn"
        type="primary"
        @click="handleChange('next')"
      >
        {{ footerBtnGroup[0] }}<img
          src="@img/personalRecommend/next.png"
          class="arrow-icon"
        >
      </van-button>
    </div>
    <div
      v-else
      class="recommendCar-footer"
    >
      <van-button
        size="large"
        class="prev-btn"
        type="default"
        @click="handleChange('prev')"
      >
        <img
          src="@img/personalRecommend/prev.png"
          class="arrow-icon"
        >{{ footerBtnGroup[0] }}
      </van-button>
      <van-button
        size="large"
        class="next-btn"
        type="primary"
        @click="handleChange('next')"
      >
        {{ footerBtnGroup[1] }}<img
          v-if="footerBtnGroup[1] != '提交'"
          src="@img/personalRecommend/next.png"
          class="arrow-icon"
        >
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    navList: {
      type: Array,
      default: null,
      require: true
    }
  },
  data () {
    return {
      currentIndex: 0,
      currentTabComponent: this.navList[0].componentName,
      footerBtnGroup: this.navList[0].footerBtnGroup,
      currentPrice: '',
      currentEndurance: '',
      currentBrand: '',
      currentOrder: ''

    }
  },
  computed: {

  },
  methods: {
    getPrice (item) {
      this.currentPrice = item
    },
    getEndurance (item) {
      this.currentEndurance = item
    },
    getBrand (item) {
      this.currentBrand = item
    },
    getOrder (item) {
      this.currentOrder = item
    },
    async getRecommendList () {
      const data = await this.$api.recommend.getRecommendList({
        price: this.currentPrice,
        endurance: this.currentEndurance,
        brand: this.currentBrand,
        style: this.currentOrder,
        size: 5
      })
      this.$router.push({ name: 'buyCarIndex', query: { data: JSON.stringify(data.payload) } })
    },
    handleChange (direction) {
      if (direction === 'prev') {
        if (this.currentIndex === 3) {
          this.currentIndex = 0
        } else {
          this.currentIndex--
        }
      } else {
        if (this.currentIndex === 3) {
          if (this.currentOrder !== '') {
            this.getRecommendList()
            return
          } else {
            this.$toast('请选择订制，再进行下一步!')
          }
        } else {
          if (this.currentIndex === 0) {
            if (this.currentPrice !== '') {
              this.currentIndex = 1
            } else {
              this.$toast('请选择价格，再进行下一步!')
            }
          } else if (this.currentIndex === 1) {
            if (this.currentEndurance !== '') {
              this.currentIndex = 2
            } else {
              this.$toast('请选择续航里程，再进行下一步!')
            }
          } else if (this.currentIndex === 2) {
            if (this.currentBrand !== '') {
              this.currentIndex = 3
            } else {
              this.$toast('请选择品牌，再进行下一步!')
            }
          }
        }
      }
      this.currentTabComponent = this.navList[this.currentIndex].componentName
      this.footerBtnGroup = this.navList[this.currentIndex].footerBtnGroup
    }
  }
}
</script>
<style lang="less" scoped>
    .cont-nav {
        display: flex;
        align-items: center;
        height: 2rem  /* 75/37.5 */;
        line-height: 2rem  /* 75/37.5 */;
        .nav-list {
            flex: 1;
            display: flex;
            font-size: 0.4rem  /* 15/37.5 */;
            color: #666666;
            text-align: center;
            & > li {
                flex: 1;
                position: relative;
                color: #999;
            }
            & > li.active {
                font-size: 0.48rem  /* 18/37.5 */;
                color: #050508;
                &:after {
                    content: '';
                    position: absolute;
                    left: 35%;
                    top: 73%;
                    display: inline-block;
                    height: 0.053rem  /* 2/37.5 */;
                    width: 0.587rem  /* 22/37.5 */;
                    background-color: #0BC5B1;
                    border-radius: .053rem;
                }
            }
        }
    }
    .recommendCar-footer {
      display: flex;
      .arrow-icon {
        width: 15px;
        margin: 0 10px;
        position: relative;
        transform: translateY(1.5px);
      }
    }
</style>
