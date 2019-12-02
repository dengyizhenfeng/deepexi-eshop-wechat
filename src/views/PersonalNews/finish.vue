<template>
  <div class="finsh">
    <section class="wrap">
      <img
        src="@img/fourStep/finish.png"
        alt=""
      >
      <span class="ft-18 , txta">尊敬的客户你好， </span>
      <span class="ft-15 , txtb">您的充电桩报装申请已提交， </span>
      <span class="ft-15 , txtb">我们将尽快与您确认相关信息,</span>
      <span class="ft-15 , txtb">感谢您的支持与配合！</span>
      <span class="ft-15 , txtc">页面将在<span class="time">{{ time }}s</span>后跳转至首页</span>
      <button
        class="lightBtn"
        @click="checkOrder"
      >
        查看业务进度
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Finsh',
  components: {

  },
  data () {
    return {
      time: 10,
      timer: null
    }
  },
  created () {
    this.Timer()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    checkOrder () {
      //
      this.$router.replace({ name: 'myOrder',
        query: {
          userId: sessionStorage.getItem('userId') || localStorage.getItem('userId')
        } })
    },
    Timer () {
      this.timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          this.$router.replace({ name: 'findIndex' })
          this.$store.commit('tab/setActive', 1)
          clearInterval(this.timer)
        }
      }, 1000)
    }
  }
}

</script>

<style scoped>
.finsh{}
.wrap{
  display: flex;
  flex-direction: column;
  width: 5.333333rem;
  height: 8.666667rem;
  justify-content: space-around;
  margin: 0 auto;
  text-align: center;
  margin-top: 40%
}
img{
  width: 1.226667rem;
  height: 1.306667rem;
  margin-left: 2.1rem
}
.txta{
  font-weight:500;
  color:rgba(0,0,0,1);
}
.txtc{
  font-weight:500;
  color:rgba(102,102,102,1);
}
.txtb{
  font-weight:500;
color:rgba(153,153,153,1);
}
.time{
  font-weight:500;
  color:red;
  margin: 0 .2rem
}
</style>
