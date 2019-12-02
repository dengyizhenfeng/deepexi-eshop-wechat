<template>
  <div class="configureLight">
    <ul class="list van-clearfix configure-detail">
      <li
        v-for="(item, index) in configureKey"
        :key="index"
      >
        <img
          :src="`${imgBaseUrl + item.imgUrl}`"
          class="icon"
        >
        <p class="desc">
          {{ item.desc }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ConfigureLight',
  components: {

  },
  props: {
    configureKey: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      imgBaseUrl: '/images/carDetail/'
    }
  },
  methods: {

  }
}

</script>

<style lang="less" scoped>
.configureLight{}
.list{
  display: flex;
  flex-wrap: wrap

}
.list li{
  width: 33%
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
</style>
