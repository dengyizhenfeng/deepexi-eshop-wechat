<template>
  <div class="inputCreateNews">
    <create-news @next="next" />
  </div>
</template>

<script>
import CreateNews from './createNews.vue'

export default {
  name: 'InputCreateNews',
  components: {
    CreateNews
  },
  data () {
    return {

    }
  },
  methods: {
    next () {
      // .log('x')
      this.$router.push({ name: 'inputFinish' })
    }
  }
}

</script>

<style scoped>
.inputCreateNews{}
</style>
