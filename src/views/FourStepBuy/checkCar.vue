<template>
  <div class="checkCar">
    <section class="wrap">
      <span class="ft-15 , txt">请选择您的验车方式</span>
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
  name: 'CheckCar',
  components: {
    Radios
  },
  data () {
    return {
      radios: [
        { title: '线上直播验车', info: '(敬请期待)', ser: '委托第三方机构提供公正视频验车服务', value: 1, checked: false, disable: true },
        { title: '线下现场验车', info: '', ser: '您可亲自到现场实地验车', value: 2, checked: true, disabled: false }
      ],
      checkType: 0
    }
  },
  methods: {
    getCheckType (item) {
      this.checkType = item
    },
    next () {
      if (this.checkType === 0) {
        this.$toast('请至少选择一种验车方式，再进行下一步！')
        return
      }
      this.$emit('checkCarNext', this.checkType)
    }
  }
}

</script>

<style scoped>
.checkCar{
  padding: 0 .4rem;
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
  width: 100%
}

</style>
