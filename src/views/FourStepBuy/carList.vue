<template>
  <div class="carList">
    <span class="ft-18 , list">
      车辆列表
    </span>

    <CarListShop
      @getChooseCarInfo="getChooseCarInfo"
    />
    <button
      class="whiteBtn , add"
      @click="addCar"
    >
      从车型库中添加
    </button>
    <button
      v-if="!helpOrder"
      class="whiteBtn , add"
      @click="recommend"
    >
      根据引导推荐
    </button>
  </div>
</template>

<script>
import CarListShop from '@/components/carListShop.vue'

export default {
  name: 'CarList',
  components: {
    CarListShop
  },
  props: {
    needToast: {
      default: false,
      type: Boolean
    },
    helpOrder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      isShow: true,
      size: 4,
      total: 1,
      timer: null,
      carId: ''
    }
  },
  methods: {
    getChooseCarInfo (item) {
      this.carId = item.itemId;
      this.$emit('getCarId', item.itemId);
      this.$store.commit('shoper/setCurrentId', item.itemId);
      localStorage.setItem('chooseOrderId', item.id);
    },
    addCar () {
      this.$router.push({ name: 'car-recommend',
        query: {
          helpOrder: this.helpOrder
        }
      })
    },
    recommend () {
      this.$router.push({
        name: 'personalRecommendCar'
      })
    }
  },
  created() {
    
  }
}

</script>

<style scoped>
.carList{}
.list{
  line-height: 2.166667rem;
  font-weight:600;
  color:rgba(0,0,0,1);
  display:block;
  width: 100%;
  text-align: left;
}
.add{
    margin: 0 auto;
    display: block;
    margin-top: 0.4rem;
    margin-bottom: .3rem;
}
</style>
