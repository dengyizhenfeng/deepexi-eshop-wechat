<template>
  <div class="comp-wrapper">
    <activity-list :list="callbackData"/>
  </div>
</template>
<script>
  import CarTimeAndNumber from '@/components/carTimeAndNumber.vue'
  import CarList from '@/components/carList.vue'
  import activityList from '@/components/activityList.vue'
  export default {
    components: {
      CarList,
      CarTimeAndNumber,
      activityList
    },
    props: {
      callbackData: {
        type: Array,
        default: function () {
          return []
        }
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
