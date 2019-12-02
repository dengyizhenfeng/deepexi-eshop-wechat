<template>
  <div class="pickTags">
    <section
      v-for="(tages,indexs) in tags"
      :key="indexs"
    >
      <p class="ft-14, title">
        {{ tages.title }}
      </p>
      <div class="wrap">
        <div
          v-for="(tag,index) in tages.values"
          :key="index"
          class="tag"
          :class="tages.active === tag ? 'active' : ''"
          @click="getSelect(tages,tag)"
        >
          {{ tag }}
        </div>
      </div>
    </section>
    <button
      class="btn_default btn"
      @click="reset"
    >
      重置
    </button>
    <button
      class="btn_default btns"
      @click="finish"
    >
      完成
    </button>
  </div>
</template>

<script>
export default {
  name: 'PickTags',
  components: {

  },
  props: {
    tags: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      activeSale: 0,
      title: '',
      price: null,
      endurance: null,
      power: null,
      copyTags: JSON.stringify(this.tags)
    }
  },
  methods: {
    getSelect (tag, item) {
      tag.active = item
      if (tag.title === '价格') {
        this.price = this.getPrice(item)
      } else if (tag.title === '续航里程（公里）') {
        this.endurance = this.getEndurance(item)
      } else if (tag.title === '动力类型') {
        this.power = item
      }
    },
    reset () {
      const tags = JSON.parse(this.copyTags)
      this.$emit('getTags', tags)
      this.price = null
      this.endurance = null
      this.power = null
      this.search()
    },
    finish () {
      this.search()
    },
    async search () {
      const data = await this.$api.recommend.pickAll({
        price: this.price,
        endurance: this.endurance,
        dynamic: this.power
      })

      this.$emit('getList', data.payload)
    },
    getPrice (str) {
      let strs
      switch (str) {
        case '5万以下':
          strs = '0:50000'
          break
        case '5万-10万':
          strs = '50000:100000'
          break
        case '10万-15万':
          strs = '100000:150000'
          break
        case '15万-20万':
          strs = '150000:200000'
          break
        case '20万-30万':
          strs = '200000:300000'
          break
        case '30万以上':
          strs = '300000:'
          break
      }
      return strs
    },
    getEndurance (str) {
      let strs
      switch (str) {
        case '100-200':
          strs = '100:200'
          break
        case '200-300':
          strs = '200:300'
          break
        case '300-400':
          strs = '300:400'
          break
        case '400以上':
          strs = '400:'
          break
      }
      return strs
    }
  }
}

</script>

<style scoped>
.title{
   font-size: .373333rem;
  font-weight:500;
  color:rgba(101,101,101,1);
  line-height: .533333rem;
  letter-spacing:1px;
}
.tag{
  width:105px;
  height:32px;
  background:rgba(240,240,240,1);
  border-radius:4px;
  font-size: .373333rem;
  line-height: .803333rem;
  text-align: center;
  color:#656565;
  margin-bottom: .4rem
}
.wrap{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap
}
.active{
  color:#0CAD79;
  background:rgba(229,244,239,1);
}
.btn_default {
  width:4.986667rem;
  height:1.173333rem;
  font-weight:500;
  line-height: 1.173333rem;
  text-align: center;
  font-size: 14px;
  margin-bottom: 0rem;
  border:none;
  box-shadow:0px 4px 4px 0px rgba(0,0,0,0.15),0px 1px 0px 0px rgba(228,228,228,0.5);
}
.btn{
  background:rgba(255,255,255,1);
  margin-left: -.4rem;
  color:rgba(11,197,177,1);
  border-top: 0.5px solid #ccc;
}
.btns{
  background:rgba(11,197,177,1);
  color:white;
  border-top: 1px solid #ccc;
  margin-right: -.4rem;
}
</style>
