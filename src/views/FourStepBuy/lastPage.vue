<template>
  <div class="lastPage">
    <section class="wrap">
      <img
        src="@img/fourStep/finish.png"
        alt=""
      >
      <span class="ft-18 , txta">{{ finishMsg }}</span>
      <span class="ft-15 , txtb">页面将在<span class="time">{{ time }}s</span>后跳转至首页</span>
      <button
        class="lightBtn"
        @click="checkOrder"
      >
        查看订单
      </button>
      <button
        v-if="$store.state.fourstep.order || cityCode == 37"
        class="lightBtn"
        @click="inputNews"
      >
        填写个人装安装信息
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LastPage',
  data () {
    return {
      time: 10,
      timer: null,
      finishMsg: '',
      cityCode: localStorage.getItem('cityCode').slice(0, 2) // 37:山东省门店显示安装服务
    }
  },
  created () {
    this.finishMsg = this.$route.query.finishMsg || '购车服务完成';
    this.Timer()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    Timer () {
      this.timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          this.$router.replace({ name: 'findIndex' })
          this.$store.commit('tab/setActive', 1)
          clearInterval(this.timer)
        }
      }, 1000)
    },
    checkOrder () {
      this.$router.replace({ name: 'myOrder',
        query: {
          userId: sessionStorage.getItem('userId') || localStorage.getItem('userId')
        } })
    },
    inputNews () {
      this.$router.push({ name: 'personalExcelIndex' })
    }
  }
}

</script>

<style scoped>
.lastPAge{}
.wrap{
  display: flex;
  flex-direction: column;
  width: 5.333333rem;
  height: 7.666667rem;
  margin: 0 auto;
  text-align: center;
  margin-top: 40%
}
img{
  width: 1.226667rem;
  height: 1.306667rem;
  margin: 0 auto;
}
.txta{
  margin-top: 0.693rem  /* 26/37.5 */;
  font-weight:500;
  color:rgba(0,0,0,1);
}
.txtb{
  margin-top: 0.267rem  /* 10/37.5 */;
  margin-bottom: 0.987rem  /* 37/37.5 */;
  font-weight:500;
  color:rgba(102,102,102,1);
}
.time{
  font-weight:500;
  color:red;
  margin: 0 .2rem
}
  .lightBtn {
    margin-bottom: 0.64rem  /* 24/37.5 */;
  }
</style>
