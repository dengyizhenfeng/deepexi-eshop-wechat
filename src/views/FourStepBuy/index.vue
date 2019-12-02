<template>
  <div :class="$style.fourstep">
    <nav-header/>
  </div>
</template>

<script>
import navHeader from './navHeader.vue'
import judgeLoginMinxin from "@/minxins/judgeLogin";
export default {
  name: 'Fourstep',
  mixins: [judgeLoginMinxin],
  components: {
    navHeader
  },
  created() {
    if (this.hasLogin("fourSteepBuyIndex")) {
      
    }
  },
   methods: {
     
  }
}
</script>

<style lang='less' module>
.fourstep{}
</style>
