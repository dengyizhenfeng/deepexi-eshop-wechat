<template>
  <van-button
    slot="button"
    size="big"
    type="primary"
    :disabled="isDisabled"
    @click="handleClick"
  >
    {{ content }}
  </van-button>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('eventClick')
    }
  }
}
</script>

<style scoped>
.van-button--big {
    width: 6.4rem;
    height:1.30666rem;
    line-height: 1.30666rem;
    text-align: center;
    padding: 0 .213333rem;
    font-size: .48rem;
    border-radius:.66rem;
    background: #0BC5B1;
    display: block;
    margin: 0 auto;
}
</style>
