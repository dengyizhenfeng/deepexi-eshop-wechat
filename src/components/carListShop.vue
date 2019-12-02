<template>
  <div class="carsholist">
    <van-radio-group
      v-model="radio"
      @change="selectItem"
    >
      <van-radio
        v-for="item in carlist"
        :key="item.id"
        :name="item"
        checked-color="#0BC5B1"
        class="checkbox"
      >
        <section class="wrap">
          <div class="img">
            <img
              :src="item.extJson.productPhoto"
              alt=""
            >
          </div>

          <div class="txtWrap">
            <div>
              <span class="ft-18 title intercept-line-1">
                {{ item.extJson.name }}
              </span>
              <span class="ft-12 info intercept-line-2">
                {{ item.extJson.title }}
              </span>
            </div>
            <div class="cancel">
              <span class="ft-18 money">
                ¥{{ $handleMoney( item.extJson.preferentialPrice.toString()) }}
              </span>
              <img
                src="@img/delete.png"
                alt=""
                class="imgs"
                @click="deleteItem(item.id)"
              >
            </div>
          </div>
        </section>
      </van-radio>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  name: 'Carsholist',
  data () {
    return {
      radio: 1,
      carlist: [],
      customerInfo: JSON.parse(sessionStorage.getItem('customerInfo') || localStorage.getItem('customerInfo')) || {},
      userId: '' // 代客下单
    }
  },
  created() {
    this.userId = this.customerInfo.memberId;
    this.getShopCartList();
  },
  methods: {
    selectItem () {
      this.$emit('getChooseCarInfo', this.radio)
    },
    deleteItem (carId) {
      this.$dialog.confirm({
        title: '提示',
        message: '你确认删除此车吗?'
      }).then(() => {
        let params = {
          ids: [carId]
        }
        this.$api.fourStep.deleteShopCart(params, this.userId).then(res => {
          if (res.payload) {
            this.$toast('删除成功');
            this.getShopCartList();
          }
        })
      });
    },
    getShopCartList() {
      let params = {}
      if (this.userId) { // 代客下单，获取客户id
        params.userId = this.userId
      } else { // 正常四部购车流程，判断用户是否登录
        let wxUserId = sessionStorage.getItem('userId') || localStorage.getItem('userId')
        if (!wxUserId || this.$userId === wxUserId) {
          this.$store.commit('setLoading', false);
          return;
        }
      }
      this.$api.fourStep.getShopCartList(params).then(res => {
        this.carlist = res.payload.map(item => {
          item.extJson = JSON.parse(item.extJson);
          return item
        });

        this.$store.commit('shoper/setShopList', this.carlist);
      }).catch(err => {
        this.$toast(err.payload)
      })
    }
  }
}

</script>

<style scoped>
.carsholist{}
.checkbox{
  display: flex;
  align-items: center;
  margin-bottom: .773rem;
}
.img{
  width: 3.4666rem;
  height: 2.24rem;
  margin-right: .4rem;
  border-radius: .1rem;
  overflow: hidden;
}
.wrap{
  display: flex;
  justify-content: space-between
}
.txtWrap{
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
.img img{
  width: 100%;
  height:100%;

}
.title{
  margin-bottom: 8px;
  font-weight:500;
  color:rgba(0,0,0,1);
}
.info {
  color:#999999;
  display: block;
}
.cancel{
  display: flex;
  justify-content: space-between
}
.money {
  font-weight:600;
  color:#F4A31C;
   margin-top: .1rem
}
.icon{
  font-weight:100;
  color:rgba(0,0,0,1);
  margin-top: .28rem
}
.imgs{
  width: .4rem;
  height: .4rem;
  margin-top: .2rem
}
</style>
