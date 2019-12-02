<template>
  <div class="orderCarFifth">
    <div class="wrap">
      <img
        src="@img/contract.png"
        alt=""
        class="img"
      >
    </div>
    <button
      class="next , btn"
      @click="next"
    >
      签署
    </button>
  </div>
</template>

<script>
export default {
  name: 'OrderCarFifth',
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
.orderCarFifth{
  padding-bottom: 2rem;
}
.btn{
    position: fixed;
    bottom: 0rem;
    left: 0;
    width: 100%
  }
  .wrap{
    width: 100%
  }
  .img{
    width: 9.2rem;
    display: block;
    margin: 0 auto;
  }
</style>
