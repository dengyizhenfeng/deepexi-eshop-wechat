<template>
  <section class="video-wrapper">
    <video-player
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      class="video-player-box vjs-big-play-centered"
    />
  </section>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'Vedio',
  components: {
    videoPlayer
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      playerOptions: {
        fluid: true,
        language: 'en',
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: ''
      }
    }
  },
  created () {
    this.playerOptions.sources[0].src = this.url
    this.playerOptions.poster = this.url + '?x-oss-process=video/snapshot,t_10000,m_fast'
  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>
.video-player-box {
  width: 100%;
}
</style>
