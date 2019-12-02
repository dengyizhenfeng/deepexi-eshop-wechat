<template>
  <div>
    <div
      v-for="(carItem, index) in list"
      :key="index"
      class="car-list"
      @click="handleNavigate(carItem.id)"
    >
      <img-w :img-url="carItem.activityUrl"/>
      <div class="car-cont">
        <h3 class="car-title">
          {{ carItem.activityName }}
        </h3>
        <carTimeAndNumber
          :car-info="carItem"
          name="activity"
        />
      </div>
      <div class="car-flag">
        {{ carItem.activityType === 'GROUPBUYING' ? '团购': '促销' }}
      </div>
    </div>
  </div>
</template>
<script>
  import carTimeAndNumber from '@/components/carTimeAndNumber.vue'
  import ImgW from '@/components/imageWrapper.vue'
    export default {
      components: {
        carTimeAndNumber,
        ImgW
      },
      props: {
        list: {
          type: Array,
          default: () => []
        }
      },
      methods: {
        handleNavigate (id) {
          this.$router.push({
            name: 'groupBuy',
            query: { groupId: id }
          })
        }
      }
    }
</script>
<style lang="less" scoped>
    .car-list {
        position: relative;
    }
    .car-title {
        margin: 0;
        font-size: 0.48rem  /* 18/37.5 */;
        font-weight: 500;
    }
    .car-cont {
        padding: 0.4rem 0;
    }
    .car-flag {
        position: absolute;
        left: 0.267rem  /* 10/37.5 */;
        top: 0;
        width: 1.28rem  /* 48/37.5 */;
        height: 1.12rem  /* 42/37.5 */;
        line-height: 1rem  /* 42/37.5 */;
        background-color: #0BC5B1;
        font-size:0.347rem  /* 13/37.5 */;
        color: #ffffff;
        text-align: center;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
    }
</style>
