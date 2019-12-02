<template>
  <div v-show="!shopId" class="citySelect">
    <section class="location">
      <span class="ft-13 , txta">定位城市</span>
      <p class="txtb">
        <!-- <van-icon
        name="location-o"
        color="#0CAD79"
        style="margin-right:.2rem"/>-->
        <img class="locationIco" src="@img/find/location.png">
        <span>{{ cityName }}</span>
      </p>
    </section>
    <section v-if="cityList.length">
      <van-row>
        <van-col>
          <ul class="cityList list">
            <li
              v-for="(item, index) in cityList"
              :key="item.cityCode"
              :class="{'active': index === chooseCityIndex }"
              @click="handleChooseCity(index)"
            >
              <span>{{ item.cityName }}</span>
            </li>
          </ul>
        </van-col>
        <van-col span="17">
          <div class="prompt">
            <span class="text">选择你的门店</span>
          </div>
          <ul class="shopList list">
            <li v-for="item in shopList" :key="item.id" @click="handleChooseShop(item)">
              <div class="shopItem">
                <van-icon
                  :name="item.id === chooseShopId ? 'passed' : 'circle'"
                  :class="item.id === chooseShopId ? 'icon-active' : ''"
                />
                <div class="shopItem-r">
                  <h6 class="shopItem-title">{{ item.name }}</h6>
                  <p class="shopItem-address">
                    <img class="location-icon" src="@img/find/location.png">
                    {{ item.detailAddress }}
                  </p>
                </div>
              </div>
            </li>
            <li v-if="!shopList.length" class="no-data">暂无门店</li>
          </ul>
        </van-col>
      </van-row>
    </section>
  </div>
</template>

<script>
import { wxGetLocation } from "@/assets/initWxFunction";
import { mapMutations, mapState } from "vuex";
import { deflate } from 'zlib';

export default {
  name: "CitySelect",
  computed: {
    ...mapState({
      addressComponent: state => state.wxCoords.addressComponent
    })
  },
  data() {
    return {
      cityList: [],
      subListener: null,
      cityName: "定位中",
      chooseShopId: "1",
      shopList: [],
      chooseCityIndex: 0,
      shopId: this.$route.query.shopId // 门店URL入口判断条件
    };
  },
  methods: {
    ...mapMutations({
      setCityCode: "tryDriving/setCityCode"
    }),
    handleChooseShop(shop) {
      const tmpCity = this.cityList[this.chooseCityIndex]; // 当前点击的城市
      // this.setCityCode(shop.cityCode);
      localStorage.setItem("tenantCode", shop.tenantCode);
      localStorage.setItem("shopId", shop.id);
      localStorage.setItem("shopInfo", JSON.stringify({
        name: shop.name,
        detailAddress: shop.detailAddress
      }));
      localStorage.setItem("cityCode", tmpCity.cityCode);
      localStorage.setItem("cityName", tmpCity.cityName);
      // 绑定专属顾问
      let userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
      if (userId && this.$userId !== userId) {
        this.$api.recommend.bindConsultant().catch(err => {
          this.$toast(err.payload)
        });
      }
      setTimeout(() => {
        let _this = this;
        // 1  新车上市  2  四步购车  3  专属推荐  4  充电
        switch (this.$route.query.id) {
          case '1':
            this.$router.push({
              name: 'newRelease',
              query: {
                id: this.$route.query.id
              }
            });
            break;
          case '2':
            this.$router.push({
              name: 'fourSteepBuyIndex',
              query: {
                id: this.$route.query.id
              }
            });
            break;
          case '3':
            this.$router.push({
              name: 'personalRecommendCar',
              query: {
                id: this.$route.query.id
              }
            });
            break;
          case '4':
            this.$router.push({
              name: 'charging',
              query: {
                id: this.$route.query.id
              }
            });
            break;
          default:
            this.$router.push({
              name: "findIndex",
              query: {
                cityName: tmpCity.cityName,
                query: {
                  id: this.$route.query.id
                }
              }
            })
        }
      }, 300)
    },
    handleChooseCity(index = 0) {
      const cityCode = this.cityList[index].cityCode;
      
      this.chooseCityIndex = index;
      this.setCityCode(cityCode);
      this.getShopList(cityCode);
      this.chooseShopId = sessionStorage.getItem('shopId') ||  localStorage.getItem("shopId");
    },
    async getShopList(cityCode) {
      const { payload } = await this.$api.find.getShopList({ cityCode });
      this.shopList = payload;

      if (this.shopId) { // 门店URL入口
        let shop = payload.filter(item => {
          return item.id === this.shopId;
        })
        if (!shop.length) {
          this.$toast('对不起，未找到指定营业厅！');
          this.shopId = '';
          return;
        }
        this.handleChooseShop(shop[0]);
      }
    },
    getCurrentCity() {
      let adcode = null;
      adcode = this.addressComponent.adcode;
      if (!adcode) return;
      this.cityName = this.addressComponent.province;
      this.cityList.forEach((e, index) => {
        if (adcode.substr(0, 2) === e.cityCode.substr(0, 2)) {
          // 判断本地已有的是否一致，不一致则存储，并自动选择
          if (localStorage.getItem("currentCityCode") !== e.cityCode) {
            localStorage.setItem("currentCityCode", e.cityCode);
          }
          this.handleChooseCity(index);
        }
      });
    },
    subscribleLocation() {
      this.getCurrentCity();
      this.subListener = this.$store.subscribe((mutation, state) => {
        const { type } = mutation;
        if (type === "wxCoords/setCoords") {
          this.getCurrentCity();
        }
      });
    },
    getCityList() {
      this.$api.find.getCityList().then(res => {
        this.cityList = res.payload;
        let tmpCity = this.$route.query.cityName;
        if (this.cityList.length) {
          this.cityList.forEach((item, index) => {
            if (item.cityName.indexOf(tmpCity) > -1) {
              this.handleChooseCity(index);
            }
          });
        }
      });
    }
  },
  created() {
    // 先订阅
    this.subscribleLocation();
    this.getCityList();
  },
  mounted() {
    wxGetLocation();
  },
  beforeDestroy() {
    typeof this.subListener === "function" && this.subListener();
  }
};
</script>

<style lang="less" scoped>
.list {
  max-height: 13.333rem /* 500/37.5 */;
  overflow: auto;
}
.location {
  display: flex;
  flex-direction: column;
  /* height: 3.04rem; */
  padding-top: 0.8rem;
  padding-bottom: 0.6rem;
  padding-left: 0.4rem;
  justify-content: space-around;
  background: #fafafa;
}
.all {
  margin-bottom: 1.5rem;
}
.txta {
  font-weight: 500;
  color: rgba(101, 101, 101, 1);
  margin-bottom: 0.3rem;
  /* margin-left: .2rem */
}
.txtb {
  font-size: 0.586667rem;
  font-weight: bold;
  color: rgba(5, 5, 8, 1);
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-end;
  letter-spacing: 0.053rem /* 2/37.5 */;
}
.locationIco {
  width: 0.35rem;
  margin-right: 0.2rem;
  margin-bottom: 0.15rem;
}
.wrap {
  width: 100%;
  padding-top: 0.266667rem;
}
.item {
  width: 2.666667rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0rem /* 0/37.5 */;
  text-align: center;
  margin-bottom: 0.266667rem;
  margin-top: 0.266667rem;
  margin-left: 0.4rem;
  color: rgba(54, 51, 71, 1);
  border: 0.027rem /* 1/37.5 */ solid rgba(237, 239, 238, 1);
}
.active {
  background: rgba(11, 197, 177, 1);
  color: white;
  border-color: rgba(11, 197, 177, 1);
}
.no-data {
  color: #050508;
}

.cityList {
  width: 2.667rem /* 100/37.5 */;
  & > li {
    height: 1.44rem /* 54/37.5 */;
    line-height: 1.44rem /* 54/37.5 */;
    background-color: #f2f2f2;
    color: #050508;
    font-size: 0.373rem /* 14/37.5 */;
    text-align: center;
    margin-bottom: 0.027rem /* 1/37.5 */;
    &.active {
      background-color: #ffffff;
      color: #0bc5b1;
      border-left: 0.133rem /* 5/37.5 */ solid #0bc5b1;
    }
  }
}

.prompt {
  position: relative;
  width: 60%;
  margin: 0.533rem /* 20/37.5 */ auto;
  text-align: center;
  border-bottom: 0.027rem /* 1/37.5 */ solid #d8d8d8;
  .text {
    position: absolute;
    left: 15%;
    top: -0.187rem /* -7/37.5 */;
    padding: 0 0.267rem /* 10/37.5 */;
    background-color: #ffffff;
    font-size: 0.373rem /* 14/37.5 */;
    color: #050508;
  }
}

.shopItem {
  display: flex;
  align-items: center;
  padding: 0.267rem /* 10/37.5 */;
  margin-left: 0.267rem /* 10/37.5 */;
  border-bottom: 0.027rem /* 1/37.5 */ solid #e6e6e6;
  .shopItem-r {
    margin-left: 0.4rem /* 15/37.5 */;
  }
  .shopItem-title {
    margin-bottom: 0.267rem /* 10/37.5 */;
    margin-top: 0;
    color: #050508;
    font-size: 0.4rem /* 15/37.5 */;
  }
  .shopItem-address {
    margin: 0;
    color: #9a9a9a;
    font-size: 0.32rem /* 12/37.5 */;
    .location-icon {
      height: 0.4rem /* 15/37.5 */;
      vertical-align: middle;
    }
  }
  /deep/ .van-icon {
    font-size: 0.4rem /* 15/37.5 */;
    color: #cccccc;
  }
  .icon-active {
    color: #0bc5b1;
  }
}
</style>
