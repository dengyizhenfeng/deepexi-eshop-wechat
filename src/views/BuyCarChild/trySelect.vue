<template>
  <div class="trySelect">
    <section class="cont">
      <van-radio-group
        v-model="radioItem"
        @change="handleChange"
      >
        <van-radio
          v-for="(item,index) in shopList"
          :key="index"
          :name="item"
          class="wrap"
          checked-color="#07c160"
        >
          <div class="wraps">
            <span class="txta">{{ item.name }}</span>
          </div>
        </van-radio>
      </van-radio-group>
    </section>
    <div class="recommendCar-footer">
      <van-button
        size="large"
        class="next-btn"
        type="primary"
        @click.native="submit"
      >
        确定
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'TrySelect',
  data () {
    return {
      checkItem: {},
      shopList: [],
      radioItem: {}
    }
  },
  created () {
    this.getShops()
  },
  methods: {
    ...mapMutations({
      setAddress: 'tryDriving/setAddress'
    }),
    submit () {
      if (!this.checkItem.id) {
        this.$toast('请选择试驾地址')
        return
      }
      this.setAddress(this.checkItem)
      this.$router.push({
        name: 'tryDriving'
      })
    },
    async getShops () {
      this.$api.recommend.getShops({
        cityCode: sessionStorage.getItem('cityCode') || localStorage.getItem('cityCode')
      }).then(res => {
        this.shopList = res.payload
      }).catch(err => {
        this.$toast(err.payload || '网络异常，请稍后重试')
      })
    },
    handleChange (item) {
      this.checkItem = item
    }
  }
}

</script>

<style scoped>
.trySelect{
  padding: 0 .4rem
}
.wrap{
  width: 9.2rem;
  /* height: 2.533333rem; */
  background: white;
  margin: .4rem 0;
  box-shadow:0px 2px 8px 0px rgba(204,204,204,0.5);
  padding: .54rem 0;
  display: flex;
  align-items: center;
}
.wraps{
  padding-left: .4rem
}
.cont{
  margin-bottom: 70px;
}
.img{
  height: .4rem;
  width: .293333rem;
  margin-bottom: -.05rem;
  margin-right:.2rem
}
.txta{
  font-size:.4rem;
  font-weight:bold;
  color:rgba(50,50,50,1);
  display: block;
}
.txtb{
  font-size:.32rem;
  color:rgba(154,154,154,1);
}
</style>
