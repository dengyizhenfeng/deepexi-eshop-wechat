<template>
  <div class="pickupcar">
    <section class="wrap">
      <span class="ft-15 , txt">请选择您的提车方式</span>
      <Radios
        :radios="radios"
        @getCheckType="getCheckType"
      />
    </section>
    <button
      class="next , btn"
      @click="next"
    >
      下一步
    </button>
  </div>
</template>

<script>
import Radios from '@/components/radios.vue'

export default {
  name: 'Pickupcar',
  components: {
    Radios
  },
  data () {
    return {
      radios: [],
      checkType: -1
    }
  },
  created() {
    this.radios = [
      { title: '送车上门服务', ser: '暂无数据', phone: '', time: '', value: 0, checked: true, disabled: false }
    ]
    let chooseShopInfo = JSON.parse(sessionStorage.getItem('shopInfo') || localStorage.getItem('shopInfo'));
    if (chooseShopInfo.detailAddress) {
      let defaultObj = { title: chooseShopInfo.name, distance: '', ser: chooseShopInfo.detailAddress, value: 1, checked: true, disabled: false };
      this.radios.push(defaultObj)
    }
  },
  methods: {
    getCheckType (item) {
      this.checkType = item
    },
    next () {
      if (this.checkType === -1) {
        this.$toast('请至少选择一种提车方式，再进行下一步！')
        return
      }
      this.$emit('pickCarNext', {
        checkType: this.checkType,
        address: this.radios[this.checkType]
      })
    }
  }
}

</script>

<style scoped>
.pickupcar{
  padding: 0 .4rem;
  padding-bottom: 2rem;
}
.txt{
  display: block;
  width: 100%;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  font-weight:500;
  color:rgba(102,102,102,1);
}
.btn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

</style>
