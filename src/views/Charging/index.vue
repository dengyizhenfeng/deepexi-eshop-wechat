<template>
  <div class="charging">
    <iframe class="frame" :src="url"/>
  </div>
</template>

<script>
import judgeLoginMixin from '@/minxins/judgeLogin'
  
export default {
  data() {
    return {
      url: ""
    };
  },
  mixins: [judgeLoginMixin],
  created() {
    if (!this.hasLogin("findIndex")) {
      return
    }
    this.getChargPage();
  },
  methods: {
    async getChargPage() {
      const data = await this.$api.charging.getChargPage({
        localUrl:
          window.location.protocol +
          window.location.host +
          window.location.pathname,
          openid: sessionStorage.getItem("openid") || localStorage.getItem("openid") || 'oTtBCv3LCHhrUeqe7tTxEQJYxwVw',
          unionId: sessionStorage.getItem("unionId") || localStorage.getItem("unionId")
      });
      if (data.payload) {
        this.url = data.payload;
      } else {
        localStorage.setItem('userId', '999')
        this.hasLogin("findIndex")
}
    }
  }
};
</script>
<style lang="less" scoped="true">
  .frame {
    width: 100%;
    height: 100vh;
    border: none;
  }
</style>
