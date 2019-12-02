<template>
  <div class="car-btn-wrapper">
    <div
      v-if="name === 'info' || 'infoDetail' && name !== 'activity'"
      class="car-btn-left"
    >
      <p class="time">
        <img src="@img/activity/time.png">
        <span>{{ $formatTime(carInfo.createdAt/1000) }}</span>
      </p>
      <p class="count">
        <img src="@img/activity/attention.png" class="atten_pic"> <span>{{ carInfo.pageView }}</span>
      </p>
    </div>
    <div
      v-if="name === 'activity'"
      class="car-btn-left"
    >
      <p class="time">
        <img src="@img/activity/time.png">
        <span>
          {{ $formatTime(carInfo.activityStartTime/1000,'yyyy/mm/dd') }}-{{ $formatTime(carInfo.activityEndTime/1000,'yyyy/mm/dd') }}
        </span>
      </p>
      <p class="count">
        <img src="@img/activity/attention.png" class="atten_pic"> <span>{{ carInfo.views }}</span>
      </p>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    carInfo: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.car-btn-wrapper {
    display: flex;
    align-items: center;
    margin-top: 0.347rem  /* 13/37.5 */;
    align-items: center;
}
.car-btn-left {
    flex: 1;
    margin: 0;
    font-size: 0.32rem  /* 12/37.5 */;
    color: #989898;
    line-height: 13px;
    display: flex;
    align-items: center;
}
.car-btn-left .time,.car-btn-left .count{
  margin: 0;
  padding: 0;
}
.car-btn-left span{
  padding: 0 5px;
}
.car-btn-left  {
  img{
    height: 0.347rem ;
    vertical-align: middle;
  }
  .atten_pic{
    height: 0.345rem;
  }
}
.car-btn-left .count {
    margin-left: 0.267rem  /* 10/37.5 */;
}
</style>
