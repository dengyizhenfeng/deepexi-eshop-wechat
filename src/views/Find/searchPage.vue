<template>
  <div class="searchPage">
    <section>
      <van-search
        v-model="searchValue"
        class="search"
        placeholder="大家都在搜: 比亚迪"
        show-action
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </section>
    <section class="all">
      <div
        v-for="(item,index) in searchHistory"
        :key="index"
        class="wrap"
      >
        <div class="history-item">
          <img
            class="img"
            src="@img/find/time.png"
            alt=""
          >
          <span class="txt" @click="handleClick(item)">{{ item }}</span>
          <van-icon name="cross" class="closeIcon" @click="handleDelete(item)"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  components: {

  },
  data () {
    return {
      searchValue: '',
      searchHistory: []
    }
  },
  created() {
    this.searchHistory = this.$store.state.searchCar.searchCont;
  },
  methods: {
    onSearch() {
      if (!this.searchValue) {
        this.$toast('请输入搜索内容');
        return;
      }
      this.$router.replace({
        name: 'car-recommend',
        query: {
          name: this.searchValue
        }
      })
      this.$store.commit('searchCar/setSearchCont', this.searchValue);
    },
    handleDelete(cont) {
      this.$store.commit('searchCar/deleteSearchCont', cont);
    },
    handleClick(cont) {
      this.$router.replace({
        name: 'car-recommend',
        query: {
          name: cont
        }
      })
    }
  }
}

</script>

<style scoped>
.searchPage{
  height: 94vh;
  background:rgba(250,250,250,1);
}
.all{
 background: white;
}
.wrap{
  display: flex;
  justify-content: space-between;
  margin: 0 .4rem;
  border-bottom: 1px solid #ccc;
}
.img{
  height: .373333rem;
  width: .373333rem;
  margin-right: .3rem;
}
.imgb{
  height: .373333rem;
  width: .373333rem;
  margin-top: .6rem
}
.txt{
  flex: 1;
  font-size:.373333rem;
  font-weight:500;
  color:rgba(54,51,71,1);
}
.history-item {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
}
  .closeIcon {
    font-size: 16px;
    color: rgba(54,51,71,1);
  }
</style>
