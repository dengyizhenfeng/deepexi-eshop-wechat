<template>
  <div class="swipe">
    <van-swipe :autoplay="3000" indicator-color="#0CAD79" touchable>
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        :class="$style.swipe"
        @click.native="goDetail(image.jumpUrl)"
      >
        <img v-lazy="image.url" :class="$style.img">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swipe",
  components: {},
  props: {
    images: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    goDetail(link) {
      this.$router.push({
        name: 'carDetail',
        query: {
          id: link.split('id=')[1]
        }
      });
    }
  }
};
</script>

<style lang="less" module>
.swipe {
  width: 9.2rem;
  height: 5.333333rem;
  img {
    width: 9.2rem;
    height: 5.333333rem;
    border-radius: 0.1rem;
  }
}
</style>
