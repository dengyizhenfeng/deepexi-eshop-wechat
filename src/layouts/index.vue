<template>
  <div class="layout">
    <Tabbar />
    <router-view />
  </div>
</template>

<script>
import Tabbar from '@/components/tabbar.vue'

export default {
  name: 'Layout',
  components: {
    Tabbar
  }
}

</script>

<style scoped>
.layout{}
</style>
