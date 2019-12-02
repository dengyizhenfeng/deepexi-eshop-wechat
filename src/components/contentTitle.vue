<template>
  <div :class="$style.contentTitle">
    <p
      class="ft-18"
      :class="$style.recom"
    >
      {{ content }}
    </p>
    <div
      class="ft-14"
      :class="$style.recoms"
      @click="handleClick"
    >
      {{ recom }}
      <div :class="$style.icon">
        <van-icon
          name="arrow"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentTitle',
  props: {
    content: {
      default: '',
      type: String
    },
    recom: {
      default: '',
      type: String
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleClick () {
      this.$emit('eventClick')
    }
  }
}

</script>

<style lang="less" module>
.contentTitle{
  // width: 9.2rem;
  height:.666667rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .recom{
    line-height:.666667rem;
  };
  .recoms{
    color:#999;
    display: flex;
    line-height:1.466667rem;
    justify-content: space-between;
  }
  .icon{
    margin-top: .07rem
  }
}
</style>
