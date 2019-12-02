<template>
  <div class="comp-wrapper">
    <figure-param :figure-param="configureParams" />
    <div
      v-if="false"
      class="configure-title hidden"
    >
      <h3 class="title">
        配置亮点
      </h3>
      <p class="more">
        查看更多<van-icon name="arrow" />
      </p>
    </div>
    <ul
      class="list van-clearfix configure-detail hidden"
    >
      <li
        v-for="(item, index) in configureKey"
        :key="index"
      >
        <img
          :src="`@img${item.url}`"
          class="icon"
        >
        <p class="desc">
          {{ item.desc }}
        </p>
      </li>
    </ul>
    <imageW
      v-if="false"
      :img-url="`${imgBaseUrl}car1.png`"
      :img-height="228"
    />
    <p
      v-if="false"
      class="car-desc"
    >
      现在所有在特斯拉工厂生产的车型（包括Model 3）均配备具有全自动驾驶功能的硬件，相比人类驾驶，新硬件将从根本上提高车辆行驶的安全性。
    </p>
  </div>
</template>
<script>
import imageW from '@/components/imageWrapper.vue'
import figureParam from '@/components/figureParam';

export default {
  components: {
    imageW,
    figureParam
  },
  props: {
    callbackData: {
      type: Array,
      require: true,
      default: null
    }
  },
  data () {
    return {
      imgBaseUrl: '/images/carDetail/'
    }
  },
  computed: {
    configureKey () {
      let newArr = []
      this.callbackData.forEach(item => {
        if (item.name === '配置亮点') {
          newArr = item.value.split(',')
        }
      })
      return newArr.map(item => {
        return {
          desc: item,
          url: '/carDetail/1.png'
        }
      })
    },
    configureParams () {
      return this.callbackData.filter(item => {
        return item.name !== '配置亮点'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .hidden {
    display: none;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
  }
  .list li{
    width: 33%;
    &:nth-child(3n + 1) {
      text-align: left;
    }
    &:nth-child(3n + 2) {
      text-align: center;
    }
    &:nth-child(3n + 3) {
      text-align: right;
    }
    .configure-name {
      margin: 0;
      color: #989898;
      font-size: 0.373rem  /* 14/37.5 */;
    }
    .configure-value {
      margin-top: 0.267rem  /* 10/37.5 */;
      margin-bottom: 0.587rem  /* 22/37.5 */;
      font-size: 0.4rem  /* 15/37.5 */;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .configure-title {
    display: flex;
    margin-bottom: 0.533rem  /* 20/37.5 */;
    align-items: center;
    .title {
      font-size: 0.48rem  /* 18/37.5 */;
      margin: 0;
    }
    .more {
      flex: 1;
      margin: 0;
      text-align: right;
      color: #999999;
      font-size: 0.373rem  /* 14/37.5 */;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .configure-detail {
    width: 90%;
    margin: 0 auto;
    & > li {
      text-align: center;
    }
    .icon {
      width: 0.8rem  /* 30/37.5 */;
    }
    .desc {
      font-size: 0.32rem  /* 12/37.5 */;
      margin-top: 0;
    }
  }
  .car-desc {
    line-height: 1.5;
    text-indent: 2em;
    font-size: 0.4rem  /* 15/37.5 */;
    color: #656565;
  }
</style>
