<template>
  <carousel-3d
    class="wrap"
    autoplay
    border="0"
    :autoplay-timeout="1500"
    perspective="50"
    display="80"
    bias="left"
    animation-speed="500"
  >
    <slide
      v-for="(slide, i) in images"
      :key="i"
      :index="i"
      class="img"
    >
      <template slot-scope="{ index }">
        <img
          :data-index="index"
          :src="slide.url"
          class="img"
        >
      </template>
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name: 'Switch3d',
  components: {
    Carousel3d,
    Slide
  },
  props: {
    images: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}

</script>

<style scoped>
.switch3d{}
.wrap{
 width: 100%;
 height: 5.333333rem !important
}
img{
  width: 100% !important;
  height: 5.333333rem !important
}
.carousel-3d-slide{
  background-color: white
}

</style>
