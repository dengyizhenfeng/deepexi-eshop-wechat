<template>
  <div class="footer">
    <van-tabbar class="carDetail-tabbar">
      <van-tabbar-item icon="star-o" @click="handleNavigate('compareCar')">
        <span>车辆对比</span>
        <img
          slot="icon"
          src="@img/tabbar/pk.png"
        >
      </van-tabbar-item>
      <van-tabbar-item icon="phone-circle-o" @click="handleNavigate('consultantIndex')">
        <span>顾问</span>
        <img
          slot="icon"
          src="@img/tabbar/cs.png"
        >
      </van-tabbar-item>
      <van-tabbar-item
        class="buyCar-btn"
        @click="next"
      >
        下一步
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    next () {
      sessionStorage.removeItem('customerInfo')
      this.$emit('next')
    },
    handleNavigate(page) {
      if (page === 'compareCar') {
        this.compareCar(page);
      } else {
        this.$router.push({
          name: page
        })
      }
    },
    compareCar(page) {
      let shopList = this.$store.state.shoper.shopList;
      if (shopList.length > 3) {
        this.$toast('车辆对比请勿超过三辆');
        return;
      }
      if (!shopList.length) {
        this.$toast('请选择对比车辆');
        return;
      }
      let ids = [];
      this.$store.commit('pkCar/setCarLists', []);
      this.$store.commit('pkCar/setPKCarIds', []);
      shopList.forEach(item => {
        ids.push(item.itemId);
        this.getCarDetail(item.itemId);
      });
      this.$store.commit('pkCar/setPKCarIds', ids);
      this.$router.push({
        name: page
      })
    },
    getCarDetail(id) {
      this.$api.recommend.getCarDetail({
        id
      }).then(res => {
        this.$store.commit('pkCar/savePKCarList', {
          id: res.payload.id,
          pkParam: res.payload.pk,
          name: res.payload.eo.name,
          title: res.payload.eo.title
        });
      })
    }
  }
}

</script>

<style scoped>
.footer{
}
</style>
