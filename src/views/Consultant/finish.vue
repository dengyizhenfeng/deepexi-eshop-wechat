<template>
  <div class="finsh">
    <section class="wrap">
      <img
        src="@img/activity/finish.png"
        alt=""
      >
      <span class="ft-18 , txta">留言成功 </span>
      <span class="ft-14 , txtb">请等待您的专属顾问与您联系 </span>
      <button
        class="lightBtn"
        @click="back"
      >
        返回首页
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

    }
  },
  methods: {
    back () {
      this.$router.replace({ name: 'findIndex' })
      this.$store.commit('tab/setActive', 1)
    }
  }
}

</script>

<style scoped>
.finsh{}
.wrap{
  display: flex;
  flex-direction: column;
  height: 8.666667rem;
  justify-content: space-around;
  margin: 0 auto;
  text-align: center;
  margin-top: 40%
}
img{
  width: 1.92rem;
  height: 1.92rem;
  display: block;
  margin: 0 auto;
}
.txta{
  font-weight:500;
  color:rgba(0,0,0,1);
}
.txtb{
  font-weight:500;
color:rgba(153,153,153,1);
}

</style>
