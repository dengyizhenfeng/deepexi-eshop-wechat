<template>
  <div class="page-wrapper">
    <van-list
      v-model="isLoading"
      :finished="finished"
      finished-text="没有更多数据"
      :offset="10"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      class="pullUp-refresh-list"
      @load="onRefresh"
    >
      <div
        v-for="item in orderListArr"
        :key="item.id"
        class="order-list-item"
      >
        <div class="item-top">
          <img
            src="@img/myOrder/location.png"
            class="location-icon"
          >
          <span class="order-type">{{ item.shopName }}</span>
        </div>
        <OrderList :order-obj="item">
          <div class="list-item-bottom">
            <p class="timebox">
              <img
                src="@img/activity/time.png"
                class="time-icon"
              >
              <span class="order-date">
                {{ item.createdAt }}
              </span>
            </p>
            <ButtonComp
              btn-text="评价"
              @click.native="goEnjoy"
            />
          </div>
        </OrderList>
      </div>
    </van-list>
  </div>
</template>
<script>
import ButtonComp from '@/components/buttonMedium.vue'
import OrderList from '@/components/orderList.vue'

export default {
  components: {
    ButtonComp,
    OrderList
  },
  data () {
    return {
      orderListArr: [],
      size: 0,
      isLoading: false,
      totalSize: 0,
      finished: false,
      error: false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'tryDriving') {
      next({
        name: 'personalIndex'
      });
    } else {
      next();
    }
  },
  methods: {
    onRefresh () {
      this.size += 4
      this.isLoading = true
      this.getTryDrivingList()
    },
    getTryDrivingList () {
      this.$api.user.getTryDrivingList({
        size: this.size
      }).then(res => {
        this.totalSize = res.payload.totalElements
        this.orderListArr = res.payload.content.map(item => {
          item['name'] = item.itemName
          item['createdAt'] = item.createdAt.split(' ')[0]
          item['imgUrl'] = item.itemPhoto
          return item
        })
        if (this.size >= this.totalSize) {
          this.finished = true
        }
        this.isLoading = false
      }).catch(err => {
        this.error = true
      })
    },
    goEnjoy () {
      this.$router.push({
        name: 'enjoy'
      })
    }
  }
}
</script>
<style lang="less" scoped>
    .page-wrapper {
        padding: 0.667rem  /* 25/37.5 */ 0.4rem  /* 15/37.5 */;
    }
    .item-top {
        margin-bottom: 0.133rem  /* 5/37.5 */;
        .location-icon {
            width: 0.267rem  /* 10/37.5 */;
            margin-right: 0.187rem  /* 7/37.5 */;
            vertical-align: middle;
        }
        .order-type {
            font-size: 0.4rem  /* 15/37.5 */;
            color: #333333;
        }
    }
    .list-item-bottom {
        display: flex;
        align-items: center;
        .timebox{
          flex: 1;
          margin: 0;
          line-height: .32rem;
        }
        .order-date{
            color: #999999;
            font-size: 0.32rem  /* 12/37.5 */;
        }
      .time-icon {
        display: inline-block;
        height: 0.347rem  /* 13/37.5 */;
        margin-bottom: -0.053rem  /* -2/37.5 */;
        margin-right: 0.053rem  /* 2/37.5 */;
      }
        /deep/ .medium-btn {
            /*width: 1.86rem  95/37.5 */
          height: 0.69rem /* 34/37.5 */;
          line-height: 0.69rem /* 34/37.5 */;
          font-size: 0.32rem;
          border-radius: 0.1rem;
          background: #0BC5B1;
          color: #fff;
          border: none;
          box-shadow: none;
          width: auto;
        }
    }
    .order-list-item{
       background: #F3F3F3;
       margin-top: .53rem;
       border-radius: .1rem;
       box-shadow: 0 0.053rem 0.213rem 0 rgba(208,219,217,0.6);
       overflow: hidden;
    }
    .order-list-item:first-child{margin: 0;}
    .item-top {
        // margin-bottom: 0.267rem  /* 10/37.5 */;
        color: #363347;
        font-size: 0.32rem  /* 15/37.5 */;
        line-height: .32rem;
        padding: .1rem .26rem;
        display: flex;
        align-items: center;
        position: relative;
        .order-number {
          color: #676767;
        }
        .order-type{
          font-weight: bold;
          font-size: .32rem;
        }
        .status{
          background: #0BC5B1;
          position: absolute;
          left: .27rem;
          top: .93rem;
          font-size: .32rem;
          color: #fff;
          border-top-left-radius: .1rem;
          padding: .1rem .18rem;
          padding-right: .42rem;
          border-bottom-right-radius: 1rem;
        }
    }
</style>
