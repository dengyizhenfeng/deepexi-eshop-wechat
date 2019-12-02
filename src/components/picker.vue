<template>
  <div class="picker">
    <van-radio-group
      v-model="sale"
      @change="whichSale"
    >
      <van-cell-group>
        <van-cell
          v-for="(item,index) in lists"
          :key="index"
          :title="item"
          clickable
          :class="item === '不限价格' ? 'active' : ''"
        >
          <van-radio
            :name="item"
            checked-color="#07c160"
          />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Picker',
  components: {

  },
  props: {
    price: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sale: '',
      lists: ['不限价格', '5万以下', '5万-10万', '10万-15万', '15万-20万', '20万-30万', '30万以上']
    }
  },
  watch: {
    price: {
      immediate: true,
      handler () {
        this.sale = ''
      }
    }
  },
  created () {
    //
  },
  methods: {
    whichSale (item) {
      this.sale = item
      this.$emit('getPrice', this.getPrice(item))
    },
    getPrice (str) {
      let strs
      switch (str) {
        case '不限价格':
          strs = ''
          break
        case '5万以下':
          strs = ':50000'
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
    }
  }
}

</script>

<style scoped>
 .active{
      color:#F7AD18
    }
</style>
