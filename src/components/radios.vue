<template>
  <div class="raios">
    <van-radio-group
      v-model="radio"
      class="radio"
      @change="selectValue"
    >
      <van-radio
        v-for="(item,index) in radios"
        :key="index"
        :name="item.value"
        :disabled="item.disable"
        checked-color="#0BC5B1"
        class="allWrap"
        :class="item.disable ? '' : 'active'"
      >
        <img
          v-if="item.disable"
          slot="icon"
          src="@img/fourStep/no.png"
        >
        <div class="radioWrap">
          <span class="ft-15 , txta">{{ item.title }}<span
            v-if="item.info"
            class="ft-13 , txtb"
          >{{ item.info }}</span>
            <van-icon
              v-if="item.distance"
              name="location-o"
              class="txte"
              color="#0BC5B1"
            />
            <span
              v-if="item.distance"
              class="ft-13 , txtc"
            >{{ item.distance }}</span>
          </span>
          <span class="ft-13 , txtb">{{ item.ser }}</span>
          <div
            v-if="item.phone"
            class="infos phone"
          >
            <img
              src="@img/fourStep/phone.png"
              class="img"
            >
            <span class="ft-13 , txtb">{{ item.phone }}</span>
          </div>
          <div
            v-if="item.time"
            class="infos time"
          >
            <img
              src="@img/fourStep/time.png"
              class="img"
            >
            <span class="ft-13 , txtb">{{ item.time }}</span>
          </div>
        </div>
      </van-radio>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  name: 'Raios',
  components: {

  },
  props: {
    radios: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      radio: ''
    }
  },
  methods: {
    selectValue () {
      this.$emit('getCheckType', this.radio)
    }
  }
}

</script>

<style scoped>
.raios{}
.allWrap{
  width: 100%;
  background:rgba(234,234,234,1);
  box-shadow:0px 1px 8px 0px rgba(204,204,204,0.5);
  border-radius:5px;
  display: flex;
  margin-bottom: .8rem;
  align-items: center;
}
.txt{
  display: block;
  width: 100%;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  font-weight:500;
  color:rgba(102,102,102,1);
}
.radioWrap{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: .266667rem;
  margin: .56rem 0;
  width: 100%

}
.txta{
  display: block;
  font-weight: 600;
  color: #666;
  margin-bottom: .18rem;
}
.txtb{
    font-weight: 500;
    color: rgba(102,102,102,1);
    line-height: .34667rem;
}
.txtc{
  font-weight: 500;
  color:rgba(102,102,102,1)
}
.txte{
  font-weight: 500;
  color:rgba(102,102,102,1);
  margin-left: 1.9rem
}
.active{
  background: #fff
}
img{
  width: .533333rem;
  height: .533333rem;
}
.img{
  width: .433333rem;
  height: .433333rem;
  margin-right: .3rem
}
.infos{
  display: flex;
  align-items: center;
  margin-top: .21rem;
}
.infos.phone img{
  width: .26rem;
  height: .37rem;
  margin-left: .06rem;
}
.infos.time img{
  width: .37rem;
  height: .37rem;
}
</style>
