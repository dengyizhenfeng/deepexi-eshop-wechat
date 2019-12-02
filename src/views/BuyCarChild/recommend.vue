<template>
  <div class="pages">
    <section class="selectss">
      <Select
        @getBrandId="getBrandId"
        @getPrice="getPrice"
        @defaultSort="defaultSort"
        @getSelectPrice="getSelectPrice"
        @getList="getList"
      />
    </section>

    <van-list
      v-if="isShow"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="pullUp-refresh-list"
      @load="loadMore"
    >
      <Header
        :carlist="carlist"
        :is-query="isQuery"
        :help-order="helpOrder"
      />
    </van-list>
  </div>
</template>

<script>
import Header from '../FourStepBuy/orderHeader.vue'
import Select from '@/components/select.vue'

export default {
  name: 'Recommend',
  components: {
    Header,
    Select
  },
  data () {
    return {
      carlist: [],
      loading: false,
      finished: false,
      isShow: false,
      size: 4,
      total: 1,
      timer: null,
      carId: '',
      brandId: null,
      price: null,
      isPickAll: false,
      isQuery: false,
      helpOrder: this.$route.query.helpOrder
    }
  },
  created () {
    this.getCarLists()
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    handleNavigate () {
      this.$router.push({
        path: '/carDetail'
      })
    },
    async getCarLists () {
      let param = {
        page: 1,
        size: this.size,
        type: 'NEW_CARS',
        brandId: this.brandId,
        price: this.price
      };
      let name = this.$route.query.name;
      if (name) {
        param['name'] = name;
      }
      const data = await this.$api.fourStep.getCarLists(param);
      this.carlist = data.payload.list
      this.total = data.payload.total
      this.isShow = true
    },
    getList (item) {
      this.isQuery = true
      this.finished = true
      this.carlist = item
    },
    loadMore () {
      this.timer = setTimeout(() => {
        this.size += 4
        this.getCarLists()
        this.loading = false
        if (this.size >= this.total) {
          this.finished = true
        }
      }, 1000)
    },
    async  defaultSort () {
      this.isQuery = false
      this.brandId = null
      this.price = null
      this.loading = true
      await this.getCarLists()
      this.loading = false
    },
    async getBrandId (item) {
      this.isQuery = false
      this.brandId = item
      this.loading = true
      await this.getCarLists()
      this.loading = false
    },
    async getPrice (item) {
      this.isQuery = false
      this.price = item
      this.loading = true
      await this.getCarLists()
      this.loading = false
    },
    async getSelectPrice (item) {
      this.isQuery = false
      this.price = item
      this.loading = true
      await this.getCarLists()
      this.loading = false
    }
  }
}

</script>

<style scoped>
.recommend{}
.selectss{
  margin-bottom:.2rem;
}
</style>
