<template>
  <div class="page-wrapper">
    <img src="@/assets/image/consultant/scanError.png">
    <p>请在e车购</p>
    <p>个人中心扫描专属顾问二维码</p>
  </div>
</template>
<script>
  export default {
    name: 'ScanError'
  }
</script>
<style lang="less" scoped="true">
  .page-wrapper {
    text-align: center;
    & > img {
      width: 3.867rem  /* 145/37.5 */;
      margin-top: 2.24rem  /* 84/37.5 */;
      margin-bottom: 0.533rem  /* 20/37.5 */;
    }
    & > p {
      margin: 0;
      line-height: 1.5;
      color: #050508;
      font-size: 0.48rem  /* 18/37.5 */;
    }
  }
</style>
