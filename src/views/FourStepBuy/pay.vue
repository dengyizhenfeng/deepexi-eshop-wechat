<template>
  <div class="pay">
    <van-radio-group
      v-model="radio"
      @change="whichChecked"
    >
      <van-cell-group>
        <div
          v-for="(check,index) in checks"
          :key="index"
          class="radioGroup"
        >
          <img
            :src="check.url"
            alt=""
          >
          <van-cell
            class="cell"
            :title="check.name"
            clickable
            @click="radio = check.value"
          >
            <van-radio
              :name="check.value"
              checked-color="#0BC5B1"
            />
          </van-cell>
        </div>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  name: 'Pay',
  components: {

  },
  data () {
    return {
      radio: '',
      checks: [
        { url: '@img/fourStep/wechat.png', name: '微信', value: 1 }
      ],
      whichPay: 0
    }
  },
  methods: {
    whichChecked (name) {
      this.whichPay = name
      this.$emit('getPAy', this.whichPay)
    }
  }
}

</script>

<style lang="less" scoped>
.pay{}
.radioGroup{
  display: flex;
  // height: 1.706667rem;
  border-bottom:1px solid #ccc;
  align-items: center;
  .cell{
    // margin-top: .3rem
  }
  img{
    height: .533333rem;
  }
}
</style>
