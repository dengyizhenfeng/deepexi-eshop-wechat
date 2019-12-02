<template>
  <div class="comp-wrapper">
    <CarList
      v-for="(item, index) in articleList"
      :key="index"
      :car-info="item"
      @click.native="handleNavigate(item.id)"
    >
      <CarTimeAndNumber
        :car-info="item"
        name="info"
      />
    </CarList>
    <p
      v-if="!articleList.length"
      class="no-data"
    >
      暂无数据
    </p>
  </div>
</template>
<script>
import CarTimeAndNumber from '@/components/carTimeAndNumber.vue'
import CarList from '@/components/carList.vue'
export default {
  components: {
    CarList,
    CarTimeAndNumber
  },
  props: {
    callbackData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    articleList () {
      return this.callbackData.map(item => {
        return {
          id: item.id,
          url: item.url,
          information: {
            mainTitle: item.informationTitle
          },
          createdAt: item.createdAt,
          pageView: item.views
        }
      })
    }
  },
  methods: {
    handleNavigate (id) {
      this.$router.push({
        name: 'articleDetail',
        query: {
          infoId: id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
