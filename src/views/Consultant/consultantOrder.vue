<template>
  <div class="page-wrapper">
    <form action="/" class="myOrder-search">
      <van-search v-model="searchValue" placeholder="订单搜索" show-action/>
    </form>
    <ul class="filter-list">
      <li :class="{'active': curIndex==0}" @click="handleFilter(0)">已完成</li>
      <li :class="{'active': curIndex==1}" @click="handleFilter(1)">未完成</li>
    </ul>
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
          @click="handleNavigate(item)"
        >
          <div class="item-top">
            <span class="order-type">{{ item.id | filterOrderType }}</span>
            <span class="order-number">{{ item.id }}</span>
            <span v-if="item.orderType === 1 && item.status != 'car_deliver_commented'" class="status">{{ item.status | getOrderState }}</span>
            <span v-else>{{ item.status | getPileStatus }}</span>
          </div>
          <OrderList :order-obj="item.orderInfo">
            <p class="list-item-bottom">
              <span class="order-userName">客户姓名：<span class="name">{{ item.memberName }}</span></span>
              <ButtonComp v-if="item.status != 'car_deliver_commented'" :btn-text="item | getBtnText"/>
            </p>
          </OrderList>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import ButtonComp from "@/components/buttonMedium.vue";
import OrderList from "@/components/orderList.vue";
import { orderState, pileOrderState } from '@/const'
import { mapMutations } from 'vuex'
export default {
  components: {
    ButtonComp,
    OrderList
  },
  name: "ConsultantOrder",
  filters: {
    getBtnText(item) {
      if (item.orderType === 2) {
         return '查看明细';
      } else { // 购车订单
          return '查看进度';
      }
    },
    getOrderState (state) {
      return orderState[state]
    },
    getPileStatus (state) {
      return pileOrderState[state]
    },
    filterOrderType (id) {
      return +(id.split('-')[1]) === 1 ? '购车订单' : '建桩订单'
    }
  },
  data() {
    return {
      searchValue: '',
      curIndex: 0,
      orderListArr: [],
      size: 0,
      isLoading: false,
      finished: false,
      error: false
    };
  },
  created() {
    if (this.$route.query.curIndex != undefined) {
      this.curIndex = this.$route.query.curIndex
    }
  },
  methods: {
    ...mapMutations({
      setCharging: 'fourstep/setCharging',
      setOrder: 'fourstep/setOrder'
    }),
    onRefresh () {
      this.size += 4
      this.getOrderList()
    },
    handleFilter (index) {
      this.curIndex = +index;
      this.size = 4;
      this.isLoading = true;
      this.finished = false;
      this.getOrderList();
    },
    handleNavigate (item) {
      this.$router.push({
        name: 'orderDetail',
        query: {
          id: item.id,
          orderType: item.orderType,
          curIndex: this.curIndex,
          pageKey: 'consultant' // 专属顾问订单标识
        }
      })
    },
    getOrderList () {
      let param = {
        userId: this.$route.query.id,
        size: this.size
      };
       if (this.curIndex === 0) {
         param['type'] = 'car_deliver_commented';
       } else {
         param['type'] = ''
       }
      this.$api.user.getOrderList(param).then(res => {
        this.orderListArr = res.payload.list.map((item, index) => {
          if (item.outDtoTradeOrderLines && item.outDtoTradeOrderLines.length) {
            item['orderInfo'] = {
              imgUrl: item.outDtoTradeOrderLines[0].imgUrl,
              name: item.outDtoTradeOrderLines[0].itemName,
              title: item.outDtoTradeOrderLines[0].itemTitle
            }
            item['orderType'] = +(item.id.split('-')[1])// 1 购车订单, 2 建桩订单
            return item
          }
        })

        if (this.size >= res.payload.total) {
          this.finished = true
        }
        this.isLoading = false
      }).catch(err => {
        this.error = true
      })
    }
  }
};
</script>
<style lang="less" scoped="true">
.myOrder-search {
    display: none;
  }
  .filter-list {
      display: flex;
      margin: 0.48rem  /* 18/37.5 */ 0;
      padding: 0;
      text-align: center;
      color: #363347;
      font-size: 0.4rem  /* 15/37.5 */;
      & > li {
          flex: 1;
          position: relative;
          &:first-child {
              border-right: 0.027rem  /* 1/37.5 */ solid #CCCCCC;
          }
          &.active {
              color: #0BC5B1;
              font-size: 0.48rem  /* 18/37.5 */;
              &:after {
                  position: absolute;
                  top: 0.747rem  /* 28/37.5 */;
                  left: 46.5%;
                  display: inline-block;
                  content: '';
                  height: 0;
                  width: 0;
                  border-width: 6px 6px 0;
                  border-style: solid dashed;
                  border-color: #0BC5B1 transparent transparent;
                  overflow: hidden;
                  border-radius: .5rem;
              }
          }
      }
  }
  .list-item-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
      .order-userName{
        color: rgba(5, 5, 8, 1);
        font-size: 0.32rem  /* 18/37.5 */;
        line-height: .32rem;
        flex: 1;
        .name{
          color:rgba(153, 153, 153, 1);
        }
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
