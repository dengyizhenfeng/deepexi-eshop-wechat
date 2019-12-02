<template>
  <div class="comp-wrapper">
    <section class="comp-cnt wrapper-padding">
      <div class="recommendCar-btn-list">
        <button-medium
          v-for="(item, index) in enduranceArr"
          :key="index"
          :btn-text="item"
          :class="{active: curIndex===index}"
          @click.native="handleChooseEndurance(index,item)"
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
      enduranceArr: ['100至200公里', '200至300公里', '300至400公里', '400公里以上'],
      curIndex: -1
    }
  },
  methods: {
    handleChooseEndurance (index, item) {
      this.curIndex = index
      this.$emit('getEndurance', this.getEndurance(item))
    },
    getEndurance (str) {
      let strs
      switch (str) {
        case '100至200公里':
          strs = '100:200'
          break
        case '200至300公里':
          strs = '200:300'
          break
        case '300至400公里':
          strs = '300:400'
          break
        case '400公里以上':
          strs = '400:'
          break
      }
      return strs
    }
  }
}
</script>
