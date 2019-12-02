<template>
  <div class="pickCarSecond">
    <section>
      <van-cell-group class="fourForm">
        <van-field
          v-model="address"
          label="地址"
          type="textarea"
          placeholder="请填写您的送车上门地址"
          rows="4"
          border
          autosize
          :error-message="addressMes"
          style="display: flex;flex-direction: column;"
        />
        <van-field
          v-model="phone"
          label="联系电话"
          type="number"
          placeholder="请输入联系电话"
          :error-message="phoneMes"
          @blur="onBlur"
        />
        <div class="timeBox">
          <span class="ft-15 , txt">时间</span>
          <span
            class="ft-15 , txtb"
            @click="chooseTime"
          >
            <span v-if="pickTime === ''">请选择日期</span>
            <span v-else>{{ $formatTime(pickTime / 1000, 'yyyy-mm-dd') }}</span>
          </span>
          <van-datetime-picker
            v-if="isShowPickTime"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="getTime"
          />
        </div>
      </van-cell-group>
    </section>
    <button
      class="next btn"
      @click="next"
    >
      确认
    </button>
  </div>
</template>

<script>
export default {
  name: 'PickCarSecond',
  components: {

  },
  data () {
    return {
      isShowPickTime: false,
      address: '',
      phone: '',
      currentDate: new Date(),
      addressMes: '',
      phoneMes: '',
      pickTime: '',
      minDate: new Date(),
      maxDate: new Date(3019, 10, 1),
      inputFocus: false
    }
  },
  watch: {
    address (newVal) {
      this.addressMes = newVal === '' ? '请输入地址' : ''
    },
    phone (newVal) {
      this.phoneMes = newVal === '' ? '请输入电话' : ''
    }
  },
  methods: {
    onBlur () {
      window.scroll(0, 0)
    },
    next () {
      if (this.address === '' || this.phone === '' || this.pickTime === '') {
        this.$toast('请填写完信息，再进行下一步！')
        return
      }
      this.$emit('newsNext', { ser: this.address, phone: this.phone, time: this.$formatTime(this.pickTime / 1000, 'yyyy-mm-dd') })
    },
    chooseTime () {
      this.isShowPickTime = !this.isShowPickTime
    },
    getTime (time) {
      this.pickTime = new Date(time).getTime()
      this.currentDate = time
      this.isShowPickTime = false
    }
  }
}

</script>

<style scoped>
.pickCarSecond{
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  background: #fafafa;
  padding: .4rem;
}
.btn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.txt{
  width: 30%;
}
.txtb{
  width: 70%;
  color: #999;
  text-align: right;
}
.timeBox{
  background: #fff;
  border-radius: .1rem;
  display: flex;
  justify-content: space-between;
  padding: .4rem;
  flex-wrap: wrap;
}
.van-picker{
  width: 100%;
}
</style>
