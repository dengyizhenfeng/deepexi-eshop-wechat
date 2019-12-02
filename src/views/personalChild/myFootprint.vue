<template>
  <div class="page-wrapper">
    <div class="order-list-wrapper wrapper-padding">
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
          @click="handleNavigate(item.itemId)"
        >
          <OrderList :order-obj="item.orderInfo">
            <p class="list-item-bottom">
              <span class="order-price">¥ {{ $handleMoney(item.extJson.preferentialPrice.toString()) }}</span>
            </p>
          </OrderList>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  import ButtonComp from '@/components/buttonMedium.vue'
  import OrderList from '@/components/orderList.vue'

  export default {
    components: {
      // eslint-disable-next-line
      ButtonComp,
      OrderList
    },
    data () {
      return {
        orderListArr: [],
        size: 0,
        isLoading: false,
        finished: false,
        error: false
      }
    },
    methods: {
      onRefresh () {
        this.size += 4
        this.isLoading = true
        this.getMyFootprintList()
      },
      getMyFootprintList () {
        this.$api.user.getMyFootprintList({
          size: this.size
        }).then(res => {
          this.orderListArr = res.payload.content.map(item => {
            item.extJson = JSON.parse(item.extJson);
            item['orderInfo'] = {
              imgUrl: item.extJson.productPhoto,
              name: item.extJson.name,
              title: item.extJson.title
            };
            return item
          })

          if (this.size >= res.payload.totalElements) {
            this.finished = true
          }
          this.isLoading = false
        }).catch(err => {
          this.error = true
        })
      },
      handleNavigate(carId) {
        this.$router.push({
          name: 'carDetail',
          query: {
            id: carId
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
    .myOrder-search {
        display: none;
    }
    .list-item-bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin: 0;
        .order-price{
            color: #F4A31C;
            font-size: 0.48rem  /* 18/37.5 */;
            line-height: .48rem;
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
        justify-content: space-between;
        position: relative;
        .order-number {
            color: #676767;
        }
        .order-type{
            font-weight: bold;
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
    .order-list-wrapper {
        padding-top: 0.3rem  /* 30/37.5 */;
        box-shadow: 0 0.053rem  /* 2/37.5 */ 0.16rem  /* 6/37.5 */ 0 rgba(204,204,204,0.5) inset;
        background: #fafafa;
    }
</style>
