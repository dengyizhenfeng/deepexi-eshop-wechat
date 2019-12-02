<template>
  <div class="page-wrapper wrapper-padding pages-bottom">
    <div v-if="!isShow">
      <h2 class="title">
        {{ info.informationTitle }}
      </h2>
      <CarComponent
        :car-info="info"
        :name="name"
      >
        <span class="origin">来源：暂无</span>
      </CarComponent>
      <p
        class="content"
        style="margin-top: 22px;"
      />
      <p
        class="content"
        v-html="info.informationContent"
      />
    </div>
  </div>
</template>
<script>
import CarComponent from '../../components/carTimeAndNumber.vue'

export default {
  components: {
    CarComponent
  },
  data () {
    return {
      carInfo: {},
      info: {},
      name: 'infoDetail',
      isShow: true
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const data = await this.$api.find.getInfoDetail(this.$route.query.infoId)
      this.info = data.payload
      this.isShow = false
    }
  }
}
</script>
<style scoped>
    .page-wrapper {
        padding-top: 0.613rem  /* 23/37.5 */;
    }
    .title {
        line-height: 1.5;
        font-size:0.587rem  /* 22/37.5 */;
    }
    .origin {
        font-size:0.32rem  /* 12/37.5 */;
        color: #989898;
    }
    .content {
        font-size:0.4rem  /* 15/37.5 */;
        color: #323232;
        line-height: 1.8;
        margin: 0;
    }
    .content >>> img{
      width: 100% !important;
      height: 5.52rem
    }
    .KolEditor img {
      width: 100%;
    }
</style>
