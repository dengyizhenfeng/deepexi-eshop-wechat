<template>
  <div class="orderHeader">
    <div v-if="isQuery">
      <div
        v-for="(item,index) in carlist"
        :key="index"
        class="car-list-item"
      >
        <img-w :img-url="item.productPhoto" @click.native="goDetail(item.id)"/>
        <span class="car-title">
          {{ item.itemName }}
        </span>
        <car-list-child
          :car-info="item"
          name="query"
        />
      </div>
    </div>
    <div v-if="!isQuery">
      <div
        v-for="(item,index) in carlist"
        :key="index"
        class="car-list-item"
      >
        <img-w :img-url="item.productPhoto" @click.native="goDetail(item.id)"/>
        <span class="car-title">
          {{ item.name }}
        </span>
        <car-list-child
          :car-info="item"
          name="buycarList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CarListChild from '@/components/carListChild.vue'
import ImgW from '@/components/imageWrapper.vue'

export default {
  name: 'OrderHeader',
  components: {
    CarListChild,
    ImgW
  },
  props: {
    carlist: {
      type: Array,
      default: () => []
    },
    isQuery: {
      type: Boolean,
      default: false
    },
    helpOrder: {
      // eslint-disable-next-line
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    goDetail (id) {
      this.$router.push({ name: 'carDetail', query: { id, helpOrder: this.helpOrder || false } })
    }
  }
}

</script>

<style scoped>
.orderHeader{
}
.orderFifth .car-list-item{
  border: none;
}
.orderCarThird .car-list-item{
  border: none;
}
.car-list-item {
        padding-bottom: 0.613rem  /* 23/37.5 */;
        margin-bottom: 0.533rem  /* 20/37.5 */;
        border-bottom: 0.027rem  /* 1/37.5 */ solid #E6E6E6;
    }
    .car-title {
        margin: 0.4rem  /* 15/37.5 */ 0;
        font-size: 0.48rem  /* 18/37.5 */;
        /* padding: 0 .4rem; */
    }
</style>
