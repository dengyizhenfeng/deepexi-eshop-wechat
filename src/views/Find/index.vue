<template>
  <div class="page">
    <div class="location-wrapper" @click="goSelectCity">
      <img class="locationIco" src="@img/find/location.png">
      {{ cityName }}
    </div>
    <van-tabs
      v-model="active"
      title-active-color="#000"
      class="find-tabs"
      type="line"
      :line-width="20"
      color="#0BC5B1"
      title-inactive-color="#999"
    >
      <van-tab title="活动">
        <Activity/>
      </van-tab>
      <van-tab title="资讯">
        <Information/>
      </van-tab>
      <van-tab title="课堂">
        <Classroom-index/>
      </van-tab>
      <van-tab title="分享">
        <enjoy/>
      </van-tab>
    </van-tabs>
    <div class="search-icon-wrapper">
      <van-icon name="search" @click="goSearch"/>
    </div>
  </div>
</template>

<script>
import { wxGetLocation } from "@/assets/initWxFunction";
import Activity from "./activity1.vue";
import Information from "./information.vue";
import ClassroomIndex from "./classRoomIndex.vue";
import enjoy from "./enjoy.vue";
import { mapState } from "vuex";
import judgeLoginMinxin from "@/minxins/judgeLogin";
export default {
  name: "Find",
  mixins: [judgeLoginMinxin],
  components: {
    Activity,
    Information,
    ClassroomIndex,
    enjoy
  },
  computed: {
    ...mapState({
      addressComponent: state => state.wxCoords.addressComponent
    })
  },
  data() {
    return {
      active: 0,
      subListener: null,
      cityName: "定位中"
    };
  },
  created() {
    if (this.hasLogin("findIndex")) {
    
    }
  },
  methods: {
    goSelectCity() {
      this.$router.push({
        name: "citySelect",
        query: { cityName: this.cityName }
      });
    },
    goSearch() {
      this.$router.push({ name: "searchPage" });
    },
    async getUserInfo() {
      let msg = await this.$api.user.getUser();
      this.$store.commit("user/setPersonalInfo", msg.payload);
    },
    async getShopList(cityCode) {
      this.shopList = [];
      const { payload } = await this.$api.find.getShopList({ cityCode });
      this.shopList = payload[0][1].shops;
      if (this.pathFrom === "user" || this.shopList.length < 1) return;
      if (this.addressComponent) {
        this.handleChooseShop(this.shopList[0]);
      }
    },
    goSelectPage() {
      this.cityName = this.$route.query.cityName ? this.$route.query.cityName : "北京";
      this.$router.push({ name: "citySelect", query: { cityName: this.cityName } });
    },
    alertCityModal() {
      if (
        this.cityName != "定位中" &&
        this.addressComponent.province &&
        this.addressComponent.province.indexOf(
          localStorage.getItem("canncelCity")
        ) < 0
      ) {
        this.$dialog
          .confirm({
            title: "温馨提示",
            message: "检测到当前省份发生改变，是否选择新门店？"
          })
          .then(() => {
            this.goSelectPage();
          })
          .catch(() => {
            localStorage.setItem("canncelCity", this.addressComponent.province);
          });
      }
    },
    getCurrentCity() {
      let adcode = null;
      adcode = this.addressComponent.adcode;
      this.alertCityModal();
      // if (!sessionStorage.getItem("shopId") && !localStorage.getItem("shopId")) {
      //   this.$router.replace({
      //     name: "citySelect",
      //     query: { city: this.city }
      //   });
      // }
      if (
        sessionStorage.getItem("cityName") ||
        localStorage.getItem("cityName")
      ) {
        this.cityName =
          sessionStorage.getItem("cityName") ||
          localStorage.getItem("cityName");
        return;
      }
      if (!adcode) return;
      this.getCityList(adcode);
    },
    async getCityList(adcode) {
      const { payload } = await this.$api.find.getCityList();
      let flag = false;
      payload.forEach((e, index) => {
        if (adcode.substr(0, 2) === e.cityCode.substr(0, 2)) {
          // 判断本地已有的是否一致，不一致则存储，并自动选择
          if (localStorage.getItem("currentCityCode") !== e.cityCode) {
            localStorage.setItem("currentCityCode", e.cityCode);
          }
          this.cityName = e.cityName;
          flag = true;
        }
      });
      this.cityName = this.addressComponent.province;
      if (flag) {
        let pathName = this.$route.name;
        this.$router.replace({
          name: pathName,
          query: {
            cityName: this.cityName
          }
        });
      }
    },
    rectifyRouterPath() {
      let tmpCity = this.$route.query.cityName;
      if (!tmpCity) {
        this.cityName = sessionStorage.getItem("cityName") || localStorage.getItem("cityName");
      }
    },
    stepFlow() {
      // 先订阅
      this.subscribleLocation();
      this.rectifyRouterPath();
      wxGetLocation();
    },
    // 订阅location接口
    subscribleLocation() {
      this.getCurrentCity();
      this.subListener = this.$store.subscribe((mutation, state) => {
        const { type } = mutation;
        if (type === "wxCoords/setCoords") {
          this.getCurrentCity();
        }
      });
    }
  },
  activated() {
    this.stepFlow();
  },
  deactivated() {
    typeof this.subListener === "function" && this.subListener();
  }
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  padding-bottom: 1.227rem;
}
.location-wrapper {
  position: absolute;
  left: 0.4rem /* 15/37.5 */;
  top: 0.667rem /* 25/37.5 */;
  z-index: 100;
  font-size: 0.4rem /* 15/37.5 */;
  color: rgba(5, 5, 8, 1);
  display: flex;
  align-items: center;
}
.tabs-wrapper .van-tabs__wrap {
  height: 1.867rem /* 70/37.5 */ !important;
  font-size: 0.4rem /* 15/37.5 */;
  color: #7f7f7f;
}
.search-icon-wrapper {
  position: absolute;
  right: 0.4rem /* 15/37.5 */;
  top: 0.667rem /* 25/37.5 */;
  z-index: 100;
  color: #999999;
  font-size: 0.48rem /* 18/37.5 */;
}
.locationIco {
  width: 0.35rem;
  margin-right: 0.1rem;
}
.van-popup {
  width: 60%;
  padding: 0.3rem;
  p {
    font-size: 0.43rem;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .van-button {
    width: 1.8rem;
    padding: 0;
  }
}
</style>
