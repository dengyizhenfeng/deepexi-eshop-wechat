<template>
  <div class="enjoy">
    <!-- 静态页 在旁边 enjoy.1 -->
    <wait-dev/>
  </div>
</template>

<script>
import waitDev from "@/components/waitDev.vue";

export default {
  name: "Enjoy",
  components: {
    waitDev
  },
  data() {
    return {
      listGroup: [],
      show: false
    };
  },
  methods: {},
  created() {}
};
</script>
<style scoped>
.enjoy {
  height: calc(100vh - 1.30666rem);
  top: 1.867rem;
  position: absolute;
  left: 0;
  right: 0;
}
</style>
