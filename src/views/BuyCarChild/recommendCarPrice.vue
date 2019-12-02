<template>
  <div class="comp-wrapper">
    <section class="comp-cnt wrapper-padding">
      <div class="recommendCar-btn-list">
        <button-medium
          v-for="(item, index) in priceArr"
          :key="index"
          :btn-text="item"
          :class="{active: curIndex===index}"
          @click.native="handleChoosePrice(index,item)"
        />
      </div>
    </section>
  </div>
</template>
<script>
import ButtonMedium from '../../components/buttonMedium.vue'
export default {
  components: {
    ButtonMedium
  },
  data () {
    return {
      priceArr: ['10万以下', '10万-15万', '15万-20万', '20万-25万', '25万-30万', '30万-40万'],
      curIndex: -1,
      currentPrice: ''
    }
  },
  methods: {
    handleChoosePrice (index, item) {
      this.curIndex = index
      this.currentPrice = this.getPrice(item)
      this.$emit('getPrice', this.getPrice(item))
    },
    getPrice (str) {
      let strs
      switch (str) {
        case '10万以下':
          strs = ':100000'
          break
        case '10万-15万':
          strs = '100000:150000'
          break
        case '15万-20万':
          strs = '150000:200000'
          break
        case '20万-25万':
          strs = '200000:250000'
          break
        case '25万-30万':
          strs = '250000:300000'
          break
        case '30万-40万':
          strs = '300000:400000'
          break
      }
      return strs
    }
  }
}
</script>
