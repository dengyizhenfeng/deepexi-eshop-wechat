<template>
  <div class="page-wrapper">
    <div v-if="!isShow">
      <Swipe
        :images="images"
        class="swipe-car-detail"
      />
      <div class="page-top wrapper-padding">
        <h3 class="car-title ft-18">
          {{ carDetailObj.eo && carDetailObj.eo.name }}
          <img src="@/assets/image/consultant/share.png" class="share-icon" @click="onShowPromptPage">
        </h3>
        <p class="car-desc">
          {{ carDetailObj.title }}
        </p>
        <p>
          <span v-if="carDetailObj.preferentialPrice" class="car-price">¥{{ $handleMoney(carDetailObj.preferentialPrice.toString()) }}</span>
          <span class="car-help-money">含补贴{{ (carDetailObj.eo && carDetailObj.eo.subsidy) || 0 }}元</span>
        </p>
        <figure
          class="car-charging-wrapper"
          @click="handleNavigateCharge"
        >
          <img src="@img/carDetail/chargingLogo.png">
          <figcaption>附近电桩</figcaption>
        </figure>
      </div>

      <section class="page-cont wrapper-padding">
        <div class="cont-nav">
          <ul class="nav-list">
            <li
              :class="{'active': currentIndex==1}"
              @click="handleChange('CarConfigure', 1)"
            >
              配置
            </li>
            <li
              :class="{'active': currentIndex==2}"
              @click="handleChange('CarVideo', 2)"
            >
              视频
            </li>
            <li
              :class="{'active': currentIndex==3}"
              @click="handleChange('CarImages', 3)"
            >
              图片
            </li>
            <li
              v-if="articleList && articleList.length"
              :class="{'active': currentIndex==4}"
              @click="handleChange('CarArticles', 4)"
            >
              文章
            </li>
            <li
              v-if="activityList && activityList.length"
              :class="{'active': currentIndex==5}"
              @click="handleChange('CarActivity', 5)"
            >
              活动
            </li>
          </ul>
        </div>
        <div class="nav-cont">
          <keep-alive>
            <component
              :is="currentTabComponent"
              :callback-data="callbackData"
            />
          </keep-alive>
        </div>
      </section>
    </div>

    <van-tabbar
      v-if="!isShow && !userId"
      class="carDetail-tabbar"
    >
      <van-tabbar-item
        :icon="focusIcon"
        :class="{'focusCar': hasFocus}"
        @click="handleFocusCar()"
      >
        <span>{{ hasFocus ? '已关注': '关注' }}</span>
      </van-tabbar-item>
      <van-tabbar-item
        icon="service-o"
        @click="handleNavigate('consultantIndex')"
      >
        <span>顾问</span>
        <img
          slot="icon"
          src="@img/tabbar/cs.png"
        >
      </van-tabbar-item>
      <van-tabbar-item
        icon="exchange"
        @click="handleNavigateTryDriving('tryDriving')"
      >
        <span>试驾</span>
        <img
          slot="icon"
          src="@img/tabbar/tryDrive.png"
        >
      </van-tabbar-item>
      <van-tabbar-item
        class="buyCar-btn"
        @click="addShopCart('addShopCart')"
      >
        开始购车
      </van-tabbar-item>
    </van-tabbar>
  
    <van-tabbar
      v-if="!isShow && userId"
      class="carDetail-tabbar"
    >
      <van-tabbar-item
        class="buyCar-btn-2"
        @click="addShopCart('addShopCart', 'nologin')"
      >
        开始购车
      </van-tabbar-item>
    </van-tabbar>
  
    <transition name="fade">
      <article v-show="showPromptPage" class="share-page" @click="onShowPromptPage">
        <img src="@/assets/image/consultant/share-text.png" >
      </article>
    </transition>
  
    <transition name="fade">
      <article v-if="showSharePage" class="share-page" @click="onShowSharePage">
        <div class="share-cont">
          <div class="head-img">
            <img
              :src="avatarUrl"
            >
          </div>
          <h3 class="userName">{{ nickName }}</h3>
          <p class="prompt">邀请你来一起买车</p>
          <button-big content="立即购车" class="share-submit-btn" @click.native="addShopCart('fourSteepBuyIndex')"/>
        </div>
      </article>
    </transition>
  </div>
</template>
<script>
import Swipe from '@/components/swipe.vue'
import CarArticles from './carArticles.vue'
import CarActivity from './CarActivity.vue'
import CarConfigure from './carConfigure.vue'
import CarImages from './carImages.vue'
import CarVideo from './carVideo.vue'
import { mapMutations } from 'vuex'
import judgeLoginMixin from '@/minxins/judgeLogin'
import buttonBig from "@/components/buttonBig.vue";
import shareRouteMixin from "@/minxins/shareRoute";

export default {
  components: {
    Swipe,
    CarArticles,
    CarActivity,
    CarConfigure,
    CarImages,
    CarVideo,
    buttonBig
  },
  mixins: [judgeLoginMixin, shareRouteMixin],
  data () {
    return {
      imgBaseUrl: '/carDetail/',
      currentTabComponent: CarConfigure,
      currentIndex: 1,
      images: [],
      carDetailObj: [],
      callbackData: [],
      articleList: [],
      activityList: [],
      carId: '',
      hasFocus: false,
      focusIcon: 'star-o',
      extJson: {},
      showActivityIcon: false,
      showSharePage: false,
      showPromptPage: false,
      helpOrder: this.$route.query.helpOrder || false,
      customerInfo: JSON.parse(sessionStorage.getItem('customerInfo') || localStorage.getItem('customerInfo')) || {},
      userId: '', // 代客下单
      nickName: sessionStorage.getItem('nickName') || localStorage.getItem('nickName') || '',
      avatarUrl: sessionStorage.getItem('avatarUrl') || localStorage.getItem('avatarUrl') || '@img/touxiang.png'
    }
  },
  computed: {
    isShow() {
      return this.$store.state.isLoading;
    }
  },
  async created () {
    await this.shareRoute();
    this.userId = this.customerInfo.memberId
    
    this.carId = this.$route.query.id;
    this.getCarDetail();
    this.getArticleList();
    this.getCarActivityList();
  },
  methods: {
    ...mapMutations({
      setCarInfo: 'tryDriving/setCarInfo',
      setAddress: 'tryDriving/setAddress'
    }),
    updateAppMessageShareData() {
      let shareOptions = {
        title: `这车 "${this.carDetailObj.eo.name} " 真不错`, // 分享标题
        desc: `您的好友 ${this.nickName} 邀请您一起购车`, // 分享描述
        link: location.href
      }
      this.wxShare(shareOptions);
    },
    onShowSharePage() {
      this.showSharePage = false;
    },
    onShowPromptPage() {
      this.showPromptPage = !this.showPromptPage;
    },
    getCarDetail() {
      this.$api.recommend.getCarDetail({
        id: this.carId
      }).then(res => {
        this.carDetailObj = res.payload
        if (!this.carDetailObj) {
          this.$toast('对不起，此车辆已下架！');
          this.$router.go(-1);
          return;
        }
        
        this.updateAppMessageShareData();
        
        this.images = this.strTransformArr(this.carDetailObj.eo.productPhoto)
        this.callbackData = this.carDetailObj.basePropList
        this.hasFocus = (this.carDetailObj.collect === 'y');
        if (this.hasFocus) {
          this.focusIcon = 'star';
        }
        this.extJson = {
          productPhoto: this.carDetailObj.eo.productPhoto,
          name: this.carDetailObj.eo.name,
          title: this.carDetailObj.eo.title,
          guidePrice: this.carDetailObj.guidePrice,
          preferentialPrice: this.carDetailObj.preferentialPrice
        };
      })
    },
    getCarActivityList () {
      this.$api.recommend.getCarActivityList({ id: this.carId }).then(res => {
        this.activityList = res.payload;
      })
    },
    async getArticleList () {
      const data = await this.$api.recommend.getCarArticleList({ itemId: this.carId })
      this.articleList = data.payload.content
    },
    handleChange (component, index) {
      if (this.carDetailObj.eo) {
        switch (component) {
          case 'CarConfigure':
            this.callbackData = this.carDetailObj.basePropList
            break
          case 'CarImages':
            this.callbackData = this.strTransformArr(this.carDetailObj.eo.showPhoto)
            break
          case 'CarVideo':
            this.callbackData = this.strTransformArr(this.carDetailObj.eo.showVideo)
            break
          case 'CarArticles':
            this.callbackData = this.articleList
            break
          case 'CarActivity':
            this.callbackData = this.activityList
            break
        }
      }
      this.currentTabComponent = component
      this.currentIndex = index
    },
    handleNavigate (page) {
      if (!this.hasLogin()) {
        return
      }
      this.$router.push({
        name: page
      })
    },
    handleNavigateCharge () {
      this.$router.push({
        name: 'chargingIndex'
      })
    },
    handleNavigateTryDriving (page) {
      if (!this.hasLogin()) {
        return
      }
      this.setAddress({
        id: this.carDetailObj.eo.shopId,
        name: this.carDetailObj.eo.shopName
      });
      this.setCarInfo(this.extJson);
      localStorage.setItem('curCarId', this.carId);
      this.$router.push({
        name: page,
        query: { isFirst: true, id: this.carDetailObj.eo.id }
      })
    },
    strTransformArr (str) {
      let imgArr = str.split(',')
      return imgArr.map(item => {
        return {
          url: item
        }
      })
    },
    handleFocusCar() {
      if (!this.hasLogin()) {
        return
      }
      if (!this.hasFocus) {
        this.focusCar();
      } else {
        this.cancelFocusCar();
      }
    },
    focusCar() {
      if (!this.hasLogin()) {
        return
      }
      this.$api.recommend.focusCar({
        itemId: this.carId,
        type: 1,
        shopId: sessionStorage.getItem('shopId') || localStorage.getItem('shopId'),
        extJson: JSON.stringify(this.extJson)
      }).then(res => {
        if (res.payload.itemId) {
          this.$toast('关注成功');
          this.hasFocus = true;
          this.focusIcon = 'star'
        }
      })
    },
    cancelFocusCar() {
      if (!this.hasLogin()) {
        return
      }
      this.$api.recommend.cancelFocusCar({
        itemId: this.carId,
        shopId: sessionStorage.getItem('shopId') || localStorage.getItem('shopId')
      }).then(res => {
        if (res.payload === 'success') {
          this.$toast('已取消关注');
          this.hasFocus = false;
          this.focusIcon = 'star-o'
        }
      })
    },
    addShopCart(page, flag = '') {
      if (!flag && !this.hasLogin()) {
        return
      }
      if (page === 'addShopCart') {
        page = !this.helpOrder ? 'fourSteepBuyIndex' : 'helpCustomerOrder'
      }
      let params = {
        itemId: this.carId,
        shopId: sessionStorage.getItem('shopId') || localStorage.getItem('shopId'),
        extJson: JSON.stringify(this.extJson)
      }
      
      this.$api.fourStep.addShopCart(params, this.userId).then(res => {
        if (res.payload) {
          this.$router.replace({
            name: page
          })
        }
      }).catch(err => {
        this.$toast(err.payload)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .share-page {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background:rgba(0,0,0,0.45);
    text-align: right;
    
    & > img {
      height: 6.72rem  /* 252/37.5 */;
    }
    .share-cont {
      height: 8.88rem  /* 333/37.5 */;
      margin: 2.667rem  /* 100/37.5 */ 1.253rem  /* 47/37.5 */ 0;
      padding-top: 0.027rem  /* 1/37.5 */;
      border-radius: 0.213rem  /* 8/37.5 */;
      text-align: center;
      background: url("../../assets/image/consultant/share-car-detail.png") no-repeat center center;
      background-size: auto 100%;
      .userName {
        margin: 0.587rem  /* 22/37.5 */ 0 0.187rem  /* 7/37.5 */;
        font-size: 0.587rem  /* 22/37.5 */;
        font-weight: 500;
      }
      .prompt {
        margin: 0;
        font-size: 0.373rem  /* 14/37.5 */;
        color: #9A9A9A;
      }
      .head-img {
        width: 2.027rem  /* 76/37.5 */;
        height: 2.027rem  /* 76/37.5 */;
        margin: -1.12rem  /* -42/37.5 */ auto 0;
        border-radius: 100%;
        text-align: center;
        border: 0.24rem  /* 9/37.5 */ solid rgba(198,255,249,0.21);
        & > img {
          width: 100%;
          border-radius: 100%;
        }
      }
      .share-submit-btn {
        margin-top: 3.2rem  /* 120/37.5 */;
      }
    }
  }
  .swipe-car-detail {
    padding: 0 0.4rem  /* 15/37.5 */;
  }
  .focusCar {
    color: #F4A31C
  }
    .page-wrapper {
      position: relative;
      margin-bottom: 1.867rem  /* 70/37.5 */;
    }
    .page-top {
        position: relative;
        padding-top: 0.613rem  /* 23/37.5 */;
        padding-bottom: 0.613rem  /* 23/37.5 */;
        border-bottom: 0.187rem  /* 7/37.5 */ solid #F5F5F5;
        p {
            margin-top: 0.267rem  /* 10/37.5 */;
            margin-bottom: 0;
            display: flex;
            align-items: center;
        }
        .car-title {
          position: relative;
          padding-right: 0.533rem  /* 20/37.5 */;
          margin: 0;
        }
        .car-desc {
            color: #999999;
            font-size: 0.347rem  /* 13/37.5 */;
        }
        .car-price {
            color: #F4A31C;
            font-size: 0.48rem  /* 18/37.5 */;
        }
        .car-help-money {
            padding: 0.133rem  /* 5/37.5 */;
            margin-left: 0.48rem  /* 18/37.5 */;
            border-radius: 0.107rem  /* 4/37.5 */;
            color: #0CAD79;
            font-size: 0.32rem  /* 12/37.5 */;
            background-color: #E5F4EF;
        }
        .car-charging-wrapper {
            margin: 0;
            display: inline-block;
            position: absolute;
            right: 0.4rem  /* 15/37.5 */;
            bottom: 0.533rem  /* 20/37.5 */;
            text-align: center;
            color: #999999;
            font-size: 0.32rem  /* 12/37.5 */;
            img {
                width: 0.64rem  /* 24/37.5 */;
            }
          .number {
            position: absolute;
            top: -0.16rem /* -6/37.5 */;
            left: 0.753rem /* 20/37.5 */;
            width: 0.373rem /* 14/37.5 */;
            height: 0.373rem /* 14/37.5 */;
            line-height: 0.393rem /* 14/37.5 */;
            text-align: center;
            background-color: #FF0000;
            font-size: 0.267rem /* 10/37.5 */;
            color: #ffffff;
            border-radius: 50%;
            letter-spacing: 0;
          }
        }
      .share-icon {
        position: absolute;
        right: 0;
        top: 0.16rem  /* 6/37.5 */;
        width: 0.4rem  /* 15/37.5 */;
      }
    }
  .cont-nav {
    display: flex;
    align-items: center;
    height: 2rem  /* 75/37.5 */;
    line-height: 2rem  /* 75/37.5 */;
    .nav-list {
      flex: 1;
      display: flex;
      font-size: 0.4rem  /* 15/37.5 */;
      color: #666666;
      & > li {
        width: 2.133rem  /* 80/37.5 */;
      }
      & > li.active {
        font-size: 0.48rem  /* 18/37.5 */;
        color: #000000;
      }
    }
    .activity-wrapper {
      width: 30%;
      font-size: 0.48rem  /* 18/37.5 */;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      & > img {
        width: 0.453rem  /* 17/37.5 */;
        margin-right: 0.133rem  /* 5/37.5 */;
        vertical-align: text-top;
      }
    }
  }
  .page-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.307rem  /* 49/37.5 */;
    line-height: 1.307rem  /* 49/37.5 */;
    display: flex;
    align-items: center;
    text-align: center;
    .icon-list {
      flex: 1;
      font-size: 0.32rem  /* 12/37.5 */;
      color: #666666;
      & > li {
        float: left;
        width: 25%;
        & > span {
          display: block;
        }
      }
    }
    .buyCar-btn {
      width: 4.987rem  /* 187/37.5 */;
      color: #ffffff;
      font-size: 0.48rem  /* 18/37.5 */;
      background-color: #0CAD79;
    }
  }
  .carDetail-tabbar{
    & img {
      width: 0.5066rem;
    }
    .buyCar-btn-2 {
      width: 100%;
      color: #ffffff;
      font-size: 0.48rem  /* 18/37.5 */;
      background-color: #0BC5B1;
    }
  }
</style>
