<template>
  <div class="myClient">
    <my-client-child
      v-for="(item, i) in list"
      :key="i"
      :item="item"
    />
    <p v-if="!list.length" class="no-data">暂无数据</p>
  </div>
</template>
<script>
import myClientChild from '@/components/myClientChild';
import { getConsultants } from '@/api/storage.js';
export default {
  name: 'MYCLIENT',
  components: {
    myClientChild
  },
  data() {
    return {
      list: [],
      userId: ''
    };
  },
  created() {
    this.$store.commit('setLoading', true);
    this.userId = JSON.parse(getConsultants()).id;
    this.getList();
  },
  methods: {
    async getList() {
      await this.$api.recommend.getconsultantAdd({
        userId: this.userId
      })
      .then(res => {
        if (res.payload) {
          this.$store.commit('setLoading', false);
          this.list = [ ...res.payload ]
        }
      })
      .catch(err => {

      })
    }
  }
}
</script>
<style lang="less" scoped>
.myClient {
  box-sizing: border-box;
}
</style>
