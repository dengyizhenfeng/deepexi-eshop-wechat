<template>
  <div>
    <div
      v-if="name==='buycarList'"
      :class="$style.carListChild"
    >
      <p
        class="ft-13"
        :class="$style.info"
      >
        {{ carInfo.shopName }}
      </p>
      <section :class="$style.infoes">
        <div :class="$style.wrap">
          <span
            class="ft-18"
            :class="$style.money"
          >
            ¥{{ $handleMoney(carInfo.sellPrice.toString()) }}
          </span>
          <span
            class="ft-12"
            :class="$style.subsidy"
          >
            <span>含补贴{{ carInfo.subsidy }}元</span>
          </span>
        </div>
        <img
          v-if="true"
          class="ft-18"
          :class="$style.pk"
          src="@img/carDetail/pk.png"
          alt=""
          @click="handleNavigate('compareCar', carInfo.id)"
        >
      </section>
    </div>

    <div
      v-if="name==='query'"
      :class="$style.carListChild"
    >
      <p
        class="ft-13"
        :class="$style.info"
      >
        {{ carInfo.itemName }}
      </p>
      <section :class="$style.infoes">
        <div :class="$style.wrap">
          <span
            class="ft-18"
            :class="$style.money"
          >
            ¥{{ $handleMoney(carInfo.preferentialPrice.toString()) }}
          </span>
          <span
            class="ft-12"
            :class="$style.subsidy"
          >
            <span>含补贴{{ carInfo.subsidy }}元</span>
          </span>
        </div>
        <span
          v-if="false"
          class="ft-18"
          :class="$style.pk"
          src="@img/carDetail/pk.png"
          alt=""
          @click="handleNavigate('compareCar',carInfo.id)"
        />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarListChild',
  components: {

  },
  props: {
    carInfo: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleNavigate(page, id) {
      if (page === 'compareCar') {
        this.$store.dispatch('pkCar/addPKCar', id).then(res => {
          if (res) {
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
          } else {
            this.$store.state.isLoading = false;
          }
        });
      }
      this.$router.push({
        name: page
      })
    }
  }
}

</script>

<style lang="less" module>
.carListChild{
  .info{
    color: #999;
  }
  .infoes{
    display: flex;
    justify-content: space-between;
  }
  .wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .money{
    font-weight:600;
    color:#F4A31C;
    // line-height:.353333rem;
    letter-spacing:1px;
    margin-right: .5rem;
    // margin-bottom: .4rem
  }
  .subsidy{
  height: .533333rem;
  background:rgba(229,244,239,1);
  border-radius:4px;
  text-align: center;
  font-weight:400;
  color:#0BC5B1;
  line-height:.533333rem;
  padding: 0 .2rem;
  }
  .pk{
  font-family:'ESP_Italic';
  width:1.28rem;
  height: .746667rem;
  background:rgba(229,244,239,1);
  border-radius:4px;
  text-align: center;
  font-weight:400;
  color:rgba(12,173,121,1);
  line-height:.746667rem;
  letter-spacing:1px;
  }
}
</style>
