<template>
  <div class="wrapper-padding page-wrapper">
    <span class="ft-18 , txt">请参考下列资料清单</span>
    <section class="wrap">
      <div>
        <span class="ft-15 , txta">1. 车位使用证明</span>
        <span class="ft-13 , txtb">（任选其一）</span>
      </div>
      <span class="ft-15 , txtc">车位产权证／车位租赁证明／施工证明 </span>
    </section>
    <section class="wrap">
      <div>
        <span class="ft-15 , txta">2. 身份证明</span>
        <span class="ft-13 , txtb">（任选其一）</span>
      </div>
      <span class="ft-15 , txtc">身份证／军官证／护照／户口簿／公安机关户籍证明 </span>
    </section>
    <section class="wrap">
      <div>
        <span class="ft-15 , txta">3. 物业证明</span>
      </div>
      <span class="ft-15 , txtc">物业所允许的相关证明等</span>
    </section>
    <button
      class="next , btn"
      @click="next"
    >
      开始办理
    </button>
  </div>
</template>

<script>
export default {
  name: 'FormOne',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    next () {
      this.$emit('next')
    }
  }
}

</script>

<style scoped>
  .page-wrapper {
    margin-bottom: 1.6rem  /* 60/37.5 */;
  }
.formOne{
  padding: 0 .4rem;
}
.btn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%
}
.wrap{
  padding: .58rem .5rem;
  background:rgba(255,255,255,1);
  box-shadow:0rem  /* 0/37.5 */ 0.027rem  /* 1/37.5 */ 0.213rem  /* 8/37.5 */ 0rem  /* 0/37.5 */ rgba(204,204,204,0.5);
  border-radius:0.133rem  /* 5/37.5 */;
  margin-bottom: .8rem;
  box-sizing: border-box;
}
.txta{
font-weight:600;
color:rgba(54,51,71,1);
}
.txtb{
font-weight:400;
color:rgba(153,153,153,1);
}
.txtc{
font-weight:500;
color:#0BC5B1;
margin-top: .373rem;
display: block;
}
.txt{
  width: 100%;
  display: block;
  height: 2.72rem;
  line-height: 2.72rem;
  font-weight:600;
  color:rgba(54,51,71,1);
  text-align: center
}
</style>
