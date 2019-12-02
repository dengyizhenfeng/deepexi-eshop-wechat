<template>
  <div class="page-wrapper">
    <p class="chooseTime-info">
      请选择试驾时间（必填）
    </p>
    <div class="chooseTime-wrapper">
      <ul class="time-list van-clearfix">
        <li
          v-for="(item, index) in timeArr"
          :key="index"
          :class="{'active': curIndex === index}"
          @click="handleChooseTime(index)"
        >
          <span>{{ item.name }}</span>
          <p><span class="ft-16">{{ item.time }}</span><span class="choose-text">选择</span></p>
        </li>
      </ul>
    </div>
    <div
      class="btn-wrapper"
      @click="handleSubmit"
    >
      <ButtonCommon content="确定" />
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import ButtonCommon from '../../components/buttonBig.vue'
import { Dialog } from 'vant'
import Vue from 'vue'
Vue.use(Dialog)
export default {
  components: {
    ButtonCommon
  },
  data () {
    return {
      curIndex: -1,
      timeArr: [],
      tomorrow: '',
      afterTomorrow: ''
    }
  },
  created () {
    this.tomorrow = this.getDate(Date.now() + 24 * 60 * 60 * 1000)
    this.afterTomorrow = this.getDate(Date.now() + 24 * 60 * 60 * 1000 * 2)
    this.timeArr = (this.getArr('明天')).concat(this.getArr('后天'))
  },
  methods: {
    getDate (time) {
      return this.$formatTime(time / 1000, 'yyyy-mm-dd')
    },
    getArr (msg) {
      let arr = []
      for (let i = 1; i <= 6; i++) {
        arr.push({
          name: msg,
          date: msg === '明天' ? this.tomorrow : this.afterTomorrow
        })
      }
      let start = 8
      arr.forEach(item => {
        item['time'] = `${start}:00-${start + 2}:00`
        start += 2
      })
      return arr
    },
    handleChooseTime (index) {
      this.curIndex = index
    },
    handleSubmit () {
      if (this.curIndex < 0) {
        this.$toast('请选择看车时间')
        return
      }
      let chooseTime = this.timeArr[this.curIndex].date + ' ' + this.timeArr[this.curIndex].time
      this.setTime(chooseTime)
      this.$router.push({
        name: 'tryDriving'
      })
    },
    ...mapMutations({
      setTime: 'tryDriving/setTime'
    })
  }
}
</script>
<style scoped>
    .page-wrapper {
        padding: 0.8rem  /* 30/37.5 */ 0.4rem  /* 15/37.5 */ 1.067rem  /* 40/37.5 */;
    }
    .chooseTime-info {
        font-size: 0.4rem  /* 15/37.5 */;
        color: #333333;
    }
    .chooseTime-wrapper {
        margin: 0.587rem  /* 22/37.5 */ 0 0.933rem  /* 35/37.5 */;
    }
    .time-list > li {
        width: 48%;
        list-style: none;
        height: 1.707rem  /* 64/37.5 */;
        padding: 0.267rem  /* 10/37.5 */;
        margin-bottom: 0.267rem  /* 10/37.5 */;
        color: #0BC5B1;
        font-size: 0.32rem  /* 12/37.5 */;
        box-sizing: border-box;
        box-shadow:0 0.053rem  /* 2/37.5 */ 0.213rem  /* 8/37.5 */ 0 rgba(204,204,204,0.5);
        border-radius:0.08rem  /* 3/37.5 */;
    }
    .time-list > li:nth-child(2n) {
        float: right;
    }
    .time-list > li:nth-child(2n + 1) {
        float: left;
    }
    .time-list > li.active {
        background: #0BC5B1 url("../../assets/image/choose.png") no-repeat 95% center;
        background-size: 0.613rem  /* 23/37.5 */ 0.613rem  /* 23/37.5 */;
        color: #ffffff;
    }
    .time-list > li.active .choose-text{
        visibility: hidden;
    }
    .choose-text {
        float: right;
        margin-top: 0.08rem  /* 3/37.5 */;
    }
    .btn-wrapper .van-button--big{
        width: 100%;
    }
</style>
