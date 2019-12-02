<template>
  <div class="page-wrapper">
    <figure class="img-wrapper">
      <img :src="carInfo.productPhoto">
    </figure>
    <section class="cont-wrapper">
      <div class="cont-info-wrapper border-common">
        <h3 class="car-title">
          {{ carInfo.name }}
        </h3>
        <p class="car-description">
          {{ carInfo.title }}
        </p>
      </div>
      <div class="cont-item border-common">
        <div class="item-left">
          <span>试驾时间</span>
        </div>
        <div class="item-right">
          <span
            :class="{'cl-cd': !newTime, 'cl-33': newTime}"
            @click="handleNavigate('chooseTryDrivingTime')"
          >{{ newTime ? newTime : '请选择试驾时间' }}</span>
          <img
            class="arrow"
            src="@img/carDetail/arrow-right.png"
          >
        </div>
      </div>
      <div class="cont-item border-common">
        <div class="item-left">
          <span>试驾地址</span>
        </div>
        <div
          class="item-right"
          @click="handleNavigate('carMAp')"
        >
          <span :class="{'cl-cd': !newAddress.name, 'cl-33': newAddress.name}">{{ newAddress.name ? newAddress.name : '请选择试驾地址' }}</span>
          <img
            class="arrow"
            src="@img/carDetail/arrow-right.png"
          >
        </div>
      </div>
      <div class="tryDriving-cont-wrapper">
        <van-checkbox
          v-model="checked"
          checked-color="#0BC5B1"
        >
          同意《国网电动车试驾条款》
        </van-checkbox>
      </div>
      <div class="btn-wrapper">
        <ButtonBig
          content="立即提交"
          :is-disabled="!checked"
          @click.native="handleSubmit"
        />
      </div>
    </section>
  </div>
</template>
<script>
import ButtonBig from '@/components/buttonBig.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    ButtonBig
  },
  data () {
    return {
      checked: true,
      hasChooseTime: false,
      chooseAddress: {},
      isFirst: false
    }
  },
  computed: {
    ...mapGetters({
      newAddress: 'tryDriving/newAddress',
      carInfo: 'tryDriving/newCarInfo',
      newTime: 'tryDriving/newTime'
    })
  },
  created () {
    this.isFirst = this.$route.query.isFirst
    if (this.isFirst) {
      this.$store.commit('tryDriving/setTime', '')
    }
    this.isFirst = false;
  },
  methods: {
    handleNavigate (page) {
      this.$router.push({ name: page })
    },
    handleSubmit () {
      if (!this.validate()) {
        return
      }
      let arr = this.newTime.split(' ')
      let arr2 = arr[1].split('-')
      this.$api.recommend.applyTryDriving({
        itemId: sessionStorage.getItem('curCarId') || localStorage.getItem('curCarId'),
        shopId: this.newAddress.id,
        startTime: arr[0] + ' ' + arr2[0] + ':00',
        endTime: arr[0] + ' ' + arr2[1] + ':00'
      }).then(res => {
        if (res.payload.id) {
          this.$toast('提交成功');
          localStorage.removeItem('curCarId')
          this.$router.push({
            name: 'myTryDriving'
          })
        }
      })
    },
    validate () {
      if (!this.newTime) {
        this.$toast('请选择试驾时间')
        return false
      }
      if (!this.newAddress.name) {
        this.$toast('请选择试驾地址')
        return false
      }
      return true
    }
  }
}
</script>
<style scoped>
    .img-wrapper {
        height: 5.867rem  /* 220/37.5 */;
        margin: 0;
    }
    .img-wrapper > img{
        height: 100%;
        width: 100%;
    }
    .cont-wrapper {
        position: relative;
        z-index: 10;
        margin-top: -1.067rem  /* -40/37.5 */;
        background-color: #fff;
        margin-left: 0.4rem  /* 15/37.5 */;
        margin-right: 0.4rem  /* 15/37.5 */;
        border-radius: 0.053rem  /* 2/37.5 */;
    }
    .border-common {
        box-shadow:0 0.053rem  /* 2/37.5 */ 0.213rem  /* 8/37.5 */ 0 rgba(204,204,204,0.5);
        border-radius:0.08rem  /* 3/37.5 */;
    }
    .cont-info-wrapper {
        padding: 0.4rem  /* 15/37.5 */;
    }
    .car-title {
        margin: 0;
        font-size:0.48rem  /* 18/37.5 */;
        color: #000000;
    }
    .car-description {
        margin-top: 0.187rem  /* 7/37.5 */;
        margin-bottom: 0;
        font-size:0.347rem  /* 13/37.5 */;
        color: #999999;
    }
    .cont-item {
        display: flex;
        align-items: center;
        height: 1.387rem  /* 52/37.5 */;
        line-height: 1.387rem  /* 52/37.5 */;
        padding: 0 0.24rem  /* 9/37.5 */;
        margin-top: 0.533rem  /* 20/37.5 */;
        font-size:0.4rem  /* 15/37.5 */;
    }
    .item-right {
        flex: 1;
        position: relative;
        color: #333333;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .arrow{
      width: 0.4266rem;
    }
    .cl-cd {
        color: #CDCDCD;
    }
    .cl-33 {
      color: #333333;
    }
    .tryDriving-cont-wrapper {
      display: none;
      margin: 1.333rem  /* 50/37.5 */ 0 0.667rem  /* 25/37.5 */ 0;
      text-align: center;
      font-size:0.373rem  /* 14/37.5 */;
      color: #999999;
    }
    .btn-wrapper {
      margin-top: 0.533rem  /* 20/37.5 */;
    }
    .btn-wrapper .van-button--big {
        width: 80%;
    }
</style>
