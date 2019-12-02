<template>
  <div class="orderCar">
    <div v-if="!isShow">
      <Header :carlist="carInfo" />
      <h3 class="ft-18 , con">
        参数
      </h3>
      <figure-param :figure-param="configureParams" />
      <div v-if="false">
        <h3 class="ft-18 , con">
          配置亮点
        </h3>
        <configureLight :configure-key="configureKey" />
      </div>
    </div>
    <button
      class="next , btn"
      @click="next"
    >
      下一步
    </button>
  </div>
</template>

<script>
import Header from './orderHeader.vue'
import figureParam from '@/components/figureParam';
import configureLight from './configureLight.vue'

export default {
  name: 'OrderCar',
  components: {
    Header,
    figureParam,
    configureLight
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      list: {},
      carInfo: {},
      configureParams: [],
      isShow: true,
      configureKey: [
        {
          imgUrl: '1.png',
          desc: '膝部气囊'
        },
        {
          imgUrl: '2.png',
          desc: '零胎压继续行驶'
        },
        {
          imgUrl: '1.png',
          desc: '车道偏离预警系统'
        },
        {
          imgUrl: '1.png',
          desc: '可变悬架'
        },
        {
          imgUrl: '2.png',
          desc: '运动风格座椅'
        },
        {
          imgUrl: '1.png',
          desc: '电动座椅记忆'
        }
      ]
    }
  },
  created () {
    this.getOrderCarFirst()
  },
  methods: {
    next () {
      this.$emit('next')
    },
    async getOrderCarFirst () {
      const data = await this.$api.fourStep.getOrderCarFirst(this.id)
      this.list = data.payload
      this.carInfo = [{
        guidePrice: this.list.guidePrice,
        id: this.list.id,
        name: this.list.name,
        productPhoto: this.list.eo.productPhoto,
        sellCount: this.list.sellCount,
        sellPrice: this.list.preferentialPrice,
        shopId: this.list.eo.shopId,
        shopName: this.list.eo.shopName,
        subsidy: this.list.eo.subsidy
      }]
      this.$emit('getCarDetails', this.carInfo)
      this.configureParams = this.list.basePropList
      this.isShow = false
    }
  }
}

</script>

<style scoped>
.orderCar{
  padding: 0 .4rem;
  padding-bottom: 2rem;
}
.con{
  font-weight:600;
  color:rgba(0,0,0,1);
}

    .btn{
      position: fixed;
      bottom: 0;
      left: 0;
      width:100%
    }
</style>
