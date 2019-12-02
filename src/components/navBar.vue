<template>
  <div class="navBar">
    <van-nav-bar
      :title="metaName"
      right-text="按钮"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  components: {

  },
  data () {
    return {
      metaName: '',
      level: 0
    }
  },
  watch: {
    '$route' () {
      this.metaName = this.$route.meta.name
      this.level = this.$route.meta.level
    }
  },
  created () {
    this.metaName = this.$route.meta.name
    this.level = this.$route.meta.level
  },
  methods: {
    onClickLeft () {
      this.$router.back()
      this.$toast('返回')
    },
    onClickRight () {
      this.$toast('按钮')
    }
  }
}

</script>

<style scoped>
.navBar{}
</style>
