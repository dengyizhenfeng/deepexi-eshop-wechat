<template>
  <div class="comp-wrapper">
    <section class="comp-cnt wrapper-padding">
      <div class="recommendCar-btn-list">
        <button-medium
          v-for="(item, index) in customizeArr"
          :key="index"
          :btn-text="item"
          :class="{active: curIndex===index}"
          @click.native="handleChooseCustomize(index,item)"
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
      customizeArr: ['70后', '80后', '90后', '00后', '白领', '爱郊游', '代步工具', '接送小孩'],
      curIndex: -1
    }
  },
  methods: {
    handleChooseCustomize (index, item) {
      this.curIndex = index
      this.$emit('getOrder', item)
    }
  }
}
</script>
