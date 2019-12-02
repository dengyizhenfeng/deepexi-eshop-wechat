<template>
  <section class="platformStatics-page">
    <!--    时间过滤-->
    <div class="filter-wrapper">
      <div class="flex-common">
        <van-field
          v-model="userListForm.end_time"
          placeholder="选择时间" readonly="readonly"
          @click="endTimePop = true"
        />
        <van-icon name="arrow-down" class="arrow-down"/>
      </div>
      <van-popup v-model="endTimePop" label="离开时间" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate_end"
          :min-date="minDate"
          :max-date="maxDate"
          type="year-month"
          @cancel="endTimePop = false"
          @confirm="endTimeChange"
        />
      </van-popup>
    </div>

    <!--    饼图-->
    <v-chart class="echarts" :options="polar"/>

    <!--    列表-->
    <div class="list-wrapper">
      <ul class="cityList">
        <li v-for="(item, index) in cityList"
            :key="index"
            @click="handleNavigate(item.shopId)"
        >
          <div class="item-left">
            {{ item.name }}
          </div>
          <div class="item-right">
            <span>{{ item.value }}</span>
            <van-icon name="arrow" class="arrow-r"/>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/polar'
  import 'echarts/lib/component/legend'
  let data1 = [];
  let data2 = [];

  export default {
    name: 'HeadStatics',
    data() {
      return {
        minDate: new Date(2017, 12, 1),
        maxDate: new Date(2022, 11, 30),
        userListForm: {
          // 设置默认时间
          // end_time: new Date().getFullYear()+"-"+(new Date().getMonth() + 1)
          end_time: ""
        },
        endTimePop: false,
        currentDate_end: new Date(),
        cityList: [],
        polar: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}:{c}({d}%)"
          },
          color: [
            '#2EC088',
            '#FDD96F',
            '#9D9AEF',
            '#43A4D5',
            '#45C5E5',
            '#72E0E1',
            '#50DBAB'
          ],
          legend: {
            orient: 'horizontal',
            left: 'center',
            top: '76%',
            itemWidth: 8,
            itemHeight: 8,
            textStyle: {
              fontSize: 14
            },
            show: true,
            data: data1
          },
          series: [
            {
              name: '销售总额',
              type: 'pie',
              radius: ['18%', '28%'],
              hoverOffset: 4,
              selectedOffset: 8,
              avoidLabelOverlap: true,
              center: ['center', '40%'],
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: "{b}:\n{c} ({d}%)"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: data2
            }
          ]
        }
      }
    },

    created() {
      // 饼图
      this.endTimeChange();
    },
    methods: {
      endTimeChange(e) {
        this.endTimePop = false;
        if (e) {
          let tenantCode = this.$route.query.id;
          // 格式化时间
          let years = e.getFullYear();
          let months = e.getMonth() + 1;
          let endTimeArr = [];
          endTimeArr.push(years.toString());
          endTimeArr.push(months.toString());
          // var endTimeArr = e.getValues();
          // this.userListForm.end_time = `${endTimeArr[0]}-${endTimeArr[1]}`
          this.userListForm.end_time = `${endTimeArr[0]}年${endTimeArr[1]}月`
          let starTiime = endTimeArr.join("-") + "-01 00:00:00.0";
          let endDate = new Date(endTimeArr.join("-"));
          let month2 = endDate.getMonth();
          let nextMonth = ++month2;
          let nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
          let oneDay = 1000 * 60 * 60 * 24;
          let dateString = new Date(nextMonthFirstDay - oneDay);
          let dateYar = dateString.toLocaleDateString();
          let end = dateYar.replace(new RegExp('/', 'g'), "-") + " 23:59:59.999";

          this.$api.material.getOrderCount2(starTiime, end, 7, tenantCode).then(res => {
            data1.splice(0, data1.length);
            data2.splice(0, data2.length);
            let { payload } = res
            for (let i = 0; i < payload.length; i++) {
              if (payload[i].name) {
                let obj1 = {}
                data1.push(payload[i].name);
                obj1.name = payload[i].name;
                obj1.value = payload[i].orderCount;
                data2.push(obj1);
              }
            }
          });
          this.$api.material.getOrderCount2(starTiime, end, 8, tenantCode).then(res => {
            this.cityList.splice(0, this.cityList.length);
            let { payload } = res
            for (let i = 0; i < payload.length; i++) {
              if (payload[i].name) {
                let obj1 = {}
                obj1.name = payload[i].name;
                obj1.value = payload[i].orderCount;
                obj1.shopId = payload[i].code;
                this.cityList.push(obj1)
              }
            }
          });
        } else {
          let tenantCode = this.$route.query.id;
          // 对跳转的时间处理
          if (this.$route.query.date) {
            // this.userListForm.end_time = `${endTimeArr[0]}年${endTimeArr[1]}月`
            this.userListForm.end_time = this.$route.query.date;
            let year = this.$route.query.date.split("年")[0];
            let month = this.$route.query.date.split("年")[1].split("月")[0];
            let starTiime = year + "-" + month + "-01 00:00:00.0";
            let endDate = new Date(year + "-" + month);
            let month2 = endDate.getMonth();
            let nextMonth = ++month2;
            let nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);
            let oneDay = 1000 * 60 * 60 * 24;
            let dateString = new Date(nextMonthFirstDay - oneDay);
            let dateYar = dateString.toLocaleDateString();
            let end0 = dateYar.replace(new RegExp('/', 'g'), "-") + " 23:59:59.999";
            let arr = end0.split("-");
            if (arr[1] < 10) {
              arr[1] = "0" + arr[1]
            }
            let end = arr.join("-");
            this.$api.material.getOrderCount2(starTiime, end, 7, tenantCode).then(res => {
              data1.splice(0, data1.length);
              data2.splice(0, data2.length);
              let { payload } = res;
              for (let i = 0; i < payload.length; i++) {
                if (payload[i].name) {
                  let obj1 = {};
                  data1.push(payload[i].name);
                  obj1.name = payload[i].name;
                  obj1.value = payload[i].orderCount;
                  data2.push(obj1);
                }
              }
            });
            this.$api.material.getOrderCount2(starTiime, end, 8, tenantCode).then(res => {
              this.cityList.splice(0, this.cityList.length);
              let { payload } = res;
              for (let i = 0; i < payload.length; i++) {
                if (payload[i].name) {
                  let obj1 = {};
                  obj1.name = payload[i].name;
                  obj1.value = payload[i].orderCount;
                  obj1.shopId = payload[i].code;
                  this.cityList.push(obj1);
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
            this.$api.material.getOrderCount2(starTiime, end, 7, tenantCode).then(res => {
              data1.splice(0, data1.length);
              data2.splice(0, data2.length);
              let { payload } = res;
              for (let i = 0; i < payload.length; i++) {
                if (payload[i].name) {
                  let obj1 = {};
                  data1.push(payload[i].name);
                  obj1.name = payload[i].name;
                  obj1.value = payload[i].orderCount;
                  data2.push(obj1);
                }
              }
            });
            this.$api.material.getOrderCount2(starTiime, end, 8, tenantCode).then(res => {
              this.cityList.splice(0, this.cityList.length);
              let { payload } = res;
              for (let i = 0; i < payload.length; i++) {
                if (payload[i].name) {
                  let obj1 = {}
                  obj1.name = payload[i].name;
                  obj1.value = payload[i].orderCount;
                  obj1.shopId = payload[i].code;
                  this.cityList.push(obj1);
                }
              }
            });
          }
        }
      },
      handleNavigate (shopId) {
        this.$router.push({ name: "salesDetail",
          query: {
            shopId: shopId,
            date: this.userListForm.end_time
          } })
      }

    }
  }
</script>
<style lang="less">
  .platformStatics-page {
    .van-field__control {
      text-align: right;
    }
  }
</style>
<style lang="less" scoped="true">
  .platformStatics-page {
    .filter-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #F7F7F7;
      .van-cell {
        padding: 0.267rem  /* 10/37.5 */ 0;
        background-color: #F7F7F7;
      }
      .flex-common {
        display: flex;
        align-items: center;
        font-size: 0.267rem  /* 10/37.5 */;
        .arrow-down {
          margin-left: 0.133rem  /* 5/37.5 */;
        }
        &:first-child .van-cell {
          width: 2.667rem  /* 100/37.5 */;
        }
      }
    }
    .echarts {
      width: 100%;
      height: 7.467rem  /* 280/37.5 */;
    }
    .cityList {
      & > li {
        display: flex;
        align-items: center;
        height: 1.36rem  /* 51/37.5 */;
        padding: 0 0.373rem  /* 14/37.5 */;
        margin-bottom: 0.267rem  /* 10/37.5 */;
        background-color: #ffffff;
        border-radius: 0.133rem  /* 5/37.5 */;
        .item-left {
          flex: 1;
          color: #333333;
          font-size: 0.4rem  /* 15/37.5 */;
        }
        .item-right {
          display: flex;
          align-items: center;
          color: #999999;
          font-size: 0.347rem  /* 13/37.5 */;
          .arrow-r {
            margin-left: 0.133rem  /* 5/37.5 */;
          }
        }
        &:before {
          margin-right: 0.267rem  /* 10/37.5 */;
          content: '';
          width: 0.133rem  /* 5/37.5 */;
          height: 0.133rem  /* 5/37.5 */;
          border-radius: 100%;
          background-color: #00DCAA;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .list-wrapper {
      padding: 0.347rem  /* 13/37.5 */;
      background-color: #F7F7F7;
    }
  }
</style>
