<template>
  <figure class="imgWrapper">
    <img
      :src="imgUrl"
    >
  </figure>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>
<style lang="less" scoped>
  .imgWrapper {
    width: 100%;
    margin: 0;
    img {
      width: 100%;
    }
  }
</style>
