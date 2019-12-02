<template>
  <section class="salesDetail-page">
    <div class="filter-wrapper">
      <!--更改-->
      <ul class="filter-list">
        <li
          :class="{'active': curIndex==0}"
          @click="handleFilter(0)"
        >
          按金额
        </li>
        <li
          :class="{'active': curIndex==1}"
          @click="handleFilter(1)"
        >
          按时间
        </li>
      </ul>
      <div class="list-wrapper">
        <ul class="shopList">
          <li v-for="(item, index) in detailList"
              :key="index"
          >
            <div class="item-left">
              <span class="name">{{ item.name }}</span>
              <div class="date">
                <img src="@img/activity/time.png" class="date-icon">
                <span>{{ $formatTime(item.date/1000, 'yyyy年mm月dd日') }}</span>
              </div>
            </div>
            <div class="item-right">
              <span>{{ item.value }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SalesDetail',
    data() {
      return {
        curIndex: 0,
        detailList: []
      }
    },
    created() {
      this.switchClick(2);
    },
    methods: {
      switchClick(index, title) {
        let shopId = this.$route.query.shopId;
        if (this.$route.query.date) {
          var year = this.$route.query.date.split("年")[0];
          var month = this.$route.query.date.split("年")[1].split("月")[0];
          let starTiime = year + "-" + month + "-01 00:00:00.0";
          let endDate = new Date(year + "-" + month);
          let month2 = endDate.getMonth();
          let nextMonth = ++month2;
          let nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
          let oneDay = 1000 * 60 * 60 * 24;
          let dateString = new Date(nextMonthFirstDay - oneDay);
          let dateYar = dateString.toLocaleDateString();
          let end0 = dateYar.replace(new RegExp('/', 'g'), "-") + " 23:59:59.999";
          var arr = end0.split("-");
          if (arr[1] < 10) {
            arr[1] = "0" + arr[1]
          }
          var end = arr.join("-");
          let orderby = index == 0 ? 2 : index;

          this.$api.material.getShopCars(starTiime, end, orderby, shopId).then(res => {
            this.detailList.splice(0, this.detailList.length);
            let { payload } = res
            for (let i = 0; i < payload.length; i++) {
              if (payload[i].name) {
                let obj1 = {}
                // if (payload[i].name.length > 19) {
                  // obj1.name = payload[i].name.substring(0, 19) + "...";
                // }
                obj1.name = payload[i].name;
                obj1.value = payload[i].money;
                obj1.date = payload[i].createDate;
                this.detailList.push(obj1)
              }
            }
          });
        } else {
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          month = (month < 10 ? "0" + month : month);
          let mydate = (year.toString() + "-" + month.toString());
          let starTiime = mydate + "-01 00:00:00.0";
          let endDate = new Date(mydate);
          let month2 = endDate.getMonth();
          let nextMonth = ++month2;
          let nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
          let oneDay = 1000 * 60 * 60 * 24;
          let dateString = new Date(nextMonthFirstDay - oneDay);
          let dateYar = dateString.toLocaleDateString();
          let end = dateYar.replace(new RegExp('/', 'g'), "-") + " 23:59:59.999";
          let orderby = index == 0 ? 2 : index;
          this.$api.material.getShopCars(starTiime, end, orderby, shopId).then(res => {
            this.detailList.splice(0, this.detailList.length);
            let { payload } = res
            for (let i = 0; i < payload.length; i++) {
              if (payload[i].name) {
                let obj1 = {}
                obj1.name = payload[i].name;
                obj1.value = payload[i].money;
                obj1.date = payload[i].createDate;
                this.detailList.push(obj1)
              }
            }
          });
        }
        // 弹出框
        // this.$toast(title);
      },

      handleFilter (index) {
        this.curIndex = +index;
        this.size = 4;
        this.isLoading = true;
        this.finished = false;
        this.switchClick(index);
      }
    }
  }
</script>
<style lang="less" scoped="true">
  .salesDetail-page {
    .filter-wrapper {
      .filter-list {
        width:100%;
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
              border-width: 0.16rem  /* 6/37.5 */ 0.16rem  /* 6/37.5 */ 0;
              border-style: solid dashed;
              border-color: #0BC5B1 transparent transparent;
              overflow: hidden;
              border-radius: .5rem;
            }
          }
        }
      }
      /*原始*/
        .list-wrapper {
          padding: 0.347rem  /* 13/37.5 */;
          background-color: #F7F7F7;
        }
        .shopList {
          & > li {
            display: flex;
            align-items: center;
            height: 1.52rem  /* 51/37.5 */;
            padding: 0 0.373rem  /* 14/37.5 */;
            margin-bottom: 0.267rem  /* 10/37.5 */;
            background-color: #ffffff;
            border-radius: 0.133rem  /* 5/37.5 */;
            .item-left {
              flex: 1;
              display: flex;
              flex-direction: column;
              .name {
                position: relative;
                padding-left: 0.267rem  /* 10/37.5 */;
                color: #333333;
                font-size: 0.4rem  /* 15/37.5 */;
                &:before {
                  position: absolute;
                  left: 0;
                  top: 0.187rem  /* 7/37.5 */;
                  content: '';
                  width: 0.133rem  /* 5/37.5 */;
                  height: 0.133rem  /* 5/37.5 */;
                  border-radius: 100%;
                  background-color: #00DCAA;
                }
              }
              .date {
                display: flex;
                align-items: center;
                margin-top: 0.133rem  /* 5/37.5 */;
                color: #666666;
                font-size: 0.267rem  /* 10/37.5 */;
                .date-icon {
                  width: 0.133rem  /* 5/37.5 */;
                  margin-right: 0.213rem  /* 8/37.5 */;
                }
              }
            }
            .item-right {
              display: flex;
              align-items: center;
              color: #999999;
              font-size: 0.347rem  /* 13/37.5 */;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
    }
  }
</style>
