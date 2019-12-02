<template>
  <div class="orderCarSixth">
    <section class="wrap">
      <img
        src="@img/fourStep/finish.png"
        alt=""
      >
      <span class="ft-18 , txta">合同签署成功</span>
      <span class="ft-15 , txtb">请到个人中心查看合同</span>
      <button
        class="lightBtn"
        @click="sendEmail"
      >
        发送合同至邮箱
      </button>
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
export default {
  name: 'OrderCarSixth',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    next () {
      this.$emit('nextCheck')
    },
    sendEmail () {
      //
    }
  }
}

</script>

<style lang="less" scoped>
.orderCarSixth {

}
.wrap{
  display: flex;
  flex-direction: column;
  width: 5.333333rem;
  height: 5.666667rem;
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
.txtb{
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
