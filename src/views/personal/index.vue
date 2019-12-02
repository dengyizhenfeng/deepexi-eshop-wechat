<template>
  <div class="page-wrapper">
    <div class="bg"/>
    <section class="person-center">
      <div class="page-top">
        <img :src="userInfo.avatarUrl" class="user-avatar">
        <div class="top-cont">
          <h2 class="username">{{ userInfo.nickName }}</h2>
          <p class="phone-number">
            <img class="img" src="@img/fourStep/phone.png">
            <span>{{ userInfo.mobile }}</span>
          </p>
        </div>
        <img src="@/assets/image/consultant/scanCode.png" class="scan-code" @click="onScanQRcode">
      </div>
      <ul class="statistic-list">
        <li v-for="(item, index) in itemArr" :key="index" @click="handleNavigatePage(index)">
          <span class="number">{{ item.number }}</span>
          <p class="title">{{ item.name }}</p>
        </li>
      </ul>
    </section>
    <ul class="indicate-list">
      <li @click="handleNavigate('myOrder')">
        <img class="img-icon" src="@img/personalCenter/my-order.png">
        <span class="img-text">我的订单</span>
      </li>
      <li @click="handleNavigate('myCar')">
        <img class="img-icon" src="@img/personalCenter/my-car.png">
        <span class="img-text">我的车辆</span>
      </li>
    </ul>
    
    <ul class="nav-list">
      <li
        v-for="(item, index) in navigateArr"
        :key="index"
        @click="handleNavigateLink(item.navigateTo)"
      >
        <div>
          <img class="img-icon" :src="item.iconUrl">
          <span class="img-text">{{ item.name }}</span>
        </div>
        <van-icon name="arrow" class="arrowRight"/>
      </li>
    </ul>
    <p class="copyRight">CopyRight © 2019 国网电动汽车服务有限公司</p>
  </div>
</template>
<script>
import judgeLoginMinxin from "@/minxins/judgeLogin";
import citylist from "@/assets/citylist";

export default {
  mixins: [judgeLoginMinxin],
  data() {
    return {
      navigateArr: [
        {
          name: "电桩购买",
          iconUrl: require("@img/personalCenter/my-pile.png"),
          navigateTo: "buyElectricPile"
        },
        {
          name: "我的足迹",
          iconUrl: require("@img/personalCenter/my-track.png"),
          navigateTo: "myFootprint"
        },
        {
          name: "联系顾问",
          iconUrl: require("@img/personalCenter/my-consultant.png"),
          navigateTo: "consultantIndex"
        },
        {
          name: '大客户采购需求',
          iconUrl: require('@img/personalCenter/my-Purchase.png'),
          navigateTo: 'connection'
        }
      ],
      userInfo: {
        memberId: ''
      }
    };
  },
  computed: {
    itemArr() {
      return [
        {
          name: "关注",
          number: this.userInfo.aim_count || 0
        },
        {
          name: "订单",
          number: this.userInfo.order_count || 0
        },
        {
          name: "试驾",
          number: this.userInfo.driveTest_count || 0
        }
      ];
    }
  },
  created() {
    if (this.hasLogin("findIndex")) {
      this.getWXConfig();
    }
  },
  mounted() {
    this.getUserInfo();
    sessionStorage.setItem("loginOut", 1);
  },
  methods: {
    onScanQRcode() {
      if (!this.wechatInfo) {
        this.$toast("请在微信端访问！");
      }

      window.wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          let index = result.indexOf("=");
          this.$api.user
            .scanConsultantQRCode({
              userId: result.slice(index + 1)
            })
            .then(qrCodeRes => {
              qrCodeRes.msg && this.$toast(qrCodeRes.msg);
              if (qrCodeRes.result === "error") {
                return;
              }

              let { scShopDto } = qrCodeRes;
              let provinceName = citylist.province_list[scShopDto.cityCode];

              sessionStorage.setItem("tenantCode", scShopDto.tenantCode);
              sessionStorage.setItem("shopId", scShopDto.shopId);
              sessionStorage.setItem("cityCode", scShopDto.cityCode);
              sessionStorage.setItem(
                "cityName",
                provinceName.slice(0, provinceName.length - 1)
              );
              sessionStorage.setItem(
                "shopInfo",
                JSON.stringify({
                  name: scShopDto.name,
                  detailAddress: scShopDto.detailAddress
                })
              );
              this.$router.push({
                name: "consultantIndex"
              });
            });
        }
      });
    },
    handleNavigate(page) {
      this.$router.push({
        name: page,
        query: {
          userId: this.userInfo.memberId
        }
      });
    },
    handleNavigatePage(index) {
      if (index === 2) {
        this.$router.push({
          name: "myTryDriving"
        });
      } else if (index === 1) {
        this.$router.push({
          name: "myOrder",
          query: {
            userId: this.userInfo.memberId
          }
        });
      } else {
        this.$router.push({
          name: "myFocusCar"
        });
      }
    },
    handleNavigateLink(page) {
      this.$api.fourStep.orderCheck({}).then(res => {
        if (res) {
          this.$router.push({
            name: page,
            query: { orderSingStam: res.payload }
          });
        } else {
          this.$router.push({
            name: page
          });
        }
      })
      if (page === 'buyElectricPile') {
        this.$api.fourStep.orderCheck({}).then(res => {
          if (res) {
            this.$router.push({
              name: page,
              query: { orderSingStam: res.payload }
            });
          }
        })
      } else {
        this.$router.push({
          name: page
        });
      }
    },
    getUserInfo() {
      this.$api.user
        .getUser()
        .then(res => {
          this.userInfo = res.payload;
          localStorage.setItem("userId", this.userInfo.memberId);
        })
        .catch(err => {
          this.$toast(err.payload);
          localStorage.setItem("userId", "999");
          sessionStorage.removeItem("loginOut");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.page-wrapper {
  position: relative;
  padding-bottom: 0.8rem /* 30/37.5 */;
  .copyRight {
    position: fixed;
    bottom: 1.333rem /* 50/37.5 */;
    width: 100%;
    font-size: 0.32rem /* 12/37.5 */;
    color: #9a9a9a;
    text-align: center;
  }
  .bg {
    height: 4.08rem /* 153/37.5 */;
    background-color: #0bc5b1;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
  }
  .person-center {
    position: absolute;
    box-sizing: border-box;
    top: 0.667rem /* 25/37.5 */;
    left: 0.4rem /* 15/37.5 */;
    width: 9.173rem /* 344/37.5 */;
    padding: 0.533rem /* 20/37.5 */;
    box-shadow: 0 0.027rem /* 1/37.5 */ 0.213rem /* 8/37.5 */ 0
      rgba(204, 204, 204, 0.5);
    border-radius: 0.187rem /* 7/37.5 */;
    background-color: #ffffff;
    .username {
      font-size: 0.64rem /* 24/37.5 */;
      margin: 0;
    }
    .phone-number {
      margin-top: 0.187rem /* 7/37.5 */;
      margin-bottom: 0;
      color: #989898;
      font-size: 0.4rem /* 15/37.5 */;
      display: flex;
      align-items: flex-end;
    }
    .statistic-list {
      display: flex;
      margin-top: 0.533rem /* 20/37.5 */;
      text-align: center;
      & > li {
        flex: 1;
        .number {
          font-size: 0.48rem /* 18/37.5 */;
        }
        .title {
          font-size: 0.4rem /* 15/37.5 */;
          color: #9a9a9a;
          margin-top: 0.187rem /* 7/37.5 */;
          margin-bottom: 0;
        }
      }
    }
    .page-top {
      display: flex;
      align-items: center;
    }
    .top-cont {
      flex: 1;
    }
    .user-avatar {
      width: 1.867rem /* 70/37.5 */;
      height: 1.867rem /* 70/37.5 */;
      margin-right: 0.267rem /* 10/37.5 */;
      border-radius: 100%;
    }
    .scan-code {
      width: 0.64rem /* 24/37.5 */;
      margin-top: -0.267rem /* -10/37.5 */;
    }
  }
  .indicate-list {
    display: flex;
    height: 1.307rem /* 49/37.5 */;
    line-height: 1.307rem /* 49/37.5 */;
    margin-top: 1.867rem /* 70/37.5 */;
    text-align: center;
    font-size: 0.4rem /* 15/37.5 */;
    box-shadow: 0 0.027rem /* 1/37.5 */ 0.133rem /* 5/37.5 */ 0
      rgba(204, 204, 204, 0.5);
    & > li {
      flex: 1;
      position: relative;
    }
    & > li:first-child:after {
      position: absolute;
      right: 0;
      top: 0.267rem /* 10/37.5 */;
      content: "";
      width: 0.017rem /* 1/37.5 */;
      height: 0.8rem /* 30/37.5 */;
      background-color: rgba(230, 230, 230, 1);
    }
  }
  .nav-list {
    margin: 0 0.4rem /* 15/37.5 */;
    color: #333333;
    font-size: 0.4rem /* 15/37.5 */;
    & > li {
      position: relative;
      // height: 1.307rem ;
      padding: 0.4rem 0;
      // line-height: 1.307rem;
      border-bottom: 0.027rem /* 1/37.5 */ solid #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:after {
        position: absolute;
        right: 0;
        content: "";
        display: inline-block;
        color: #999999;
        font-size: 0.48rem /* 18/37.5 */;
      }
    }
  }
}
.img {
  width: 0.24rem;
  height: 0.4rem;
  margin-right: 0.1rem;
}
.phone-number span {
  line-height: 0.4rem;
}
.img-icon {
  height: 0.373rem /* 14/37.5 */;
  vertical-align: middle;
}
.img-text {
  vertical-align: middle;
  margin-left: 0.133rem /* 5/37.5 */;
}
</style>
