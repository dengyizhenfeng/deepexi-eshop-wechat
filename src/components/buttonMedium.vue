<template>
  <button
    type="button"
    class="medium-btn"
  >
    {{ btnText }}
  </button>
</template>
<script>
export default {
  props: {
    btnText: {
      type: String,
      default: '确定'
    }
  }
}
</script>
<style lang="less" scoped>
    .medium-btn {
        padding: 0 .3rem;  /* 165/37.5 */;
        height: 1.173rem;  /* 44/37.5 */;
        line-height: 1.073rem  /* 44/37.5 */;
        text-align: center;
        font-size: 0.4rem  /* 15/37.5 */;
        color: #363347;
        box-shadow:0 0.053rem  /* 2/37.5 */ 0.213rem  /* 8/37.5 */ 0 rgba(195,204,220,0.19);
        border-radius:0.587rem  /* 22/37.5 */;
        border:0.027rem  /* 1/37.5 */ solid rgba(240,241,241,1);
        background-color: #fff;
    }
</style>
