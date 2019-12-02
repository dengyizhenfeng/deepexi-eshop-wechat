<template>
  <div class="comp-wrapper">
    <section
      v-if="!isShow"
      class="comp-cnt wrapper-padding"
    >
      <div class="recommendCar-btn-list">
        <div
          v-for="(item, index) in brandArr"
          :key="index"
          class="btn-item-wrapper"
        >
          <button-medium
            :btn-text="item.name"
            :class="{active: curIndex === item.id}"
            @click.native="handleChooseEndurance(item)"
          />
          <img
            v-if="item.logoUrl"
            :src="item.logoUrl"
            class="brandLogo"
          >
        </div>
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
      brandArr: [],
      curIndex: '',
      isShow: true
    }
  },
  created () {
    this.getBrandList()
  },
  methods: {
    handleChooseEndurance (item) {
      this.curIndex = item.id
      this.$emit('getBrand', item.id)
    },
    async getBrandList () {
      const data = await this.$api.recommend.getBrandList()
      this.brandArr = data.payload
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
    .btn-item-wrapper{
        position: relative;
        .brandLogo {
            // width: .8rem;
            height: 0.8rem  /* 30/37.5 */;
            position: absolute;
            left: 0.3rem ;
            top: 0.17rem  ;
        }
    }
    .btn-item-wrapper .medium-btn{
      position: relative;
      height: 1.173rem;
      border: 0.027rem solid #F0F1F1;
      border-radius: 4.4rem;
      display: flex;
      align-items: center;
      padding: 0 .3rem;
      box-shadow: 0 0.053rem 0.213rem 0 rgba(195, 204, 220, 0.19);
      margin-bottom: .4rem;
      padding-left: 1.9rem;
    }
    .btn-item-wrapper .medium-btn.active{
      border-color: #0BC5B1;
    }
    .btn-item-wrapper::after{
      content: ' ';
      width: 1px;
      height: .5rem;
      background: #d8d8d8;
      top: .35rem;
      left: 1.6rem;
      position: absolute;
      z-index: 1;
    }
</style>
