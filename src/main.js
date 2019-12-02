import Vue from 'vue'
import 'amfe-flexible/index.js'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
// wechat
import { wechatUrlFn } from '@/assets/wechat'
// global css
import './assets/global.css'

// animate.css
import animated from 'animate.css' // npm install animate.css --save安装，在引入

// Vant
import Vant, { Toast, Notify, Lazyload, Dialog, Area } from 'vant'
import 'vant/lib/index.css'
import './assets/css/resetUi.css'

// serviec
import api from './api'

import { IndexList, IndexSection, Cell } from 'mint-ui'
import 'mint-ui/lib/style.css'

// Time
import formatTime from '@/assets/js/formatTime.js'
import deleteSTKey from '@/assets/js/deleteState.js' // 删除sessionStorage 存储的值

// Money
import handleMoney from '@/assets/handleMoney.js'
import wxShareMixin from '@/minxins/wxShare'

import ECharts from 'vue-echarts'

Vue.mixin(wxShareMixin);

Vue.use(formatTime)
Vue.use(deleteSTKey)

Vue.prototype.$handleMoney = handleMoney

Vue.prototype.IMAGEURL = '/sgcc-frontend-wechat'

Vue.use(api)

Vue.use(Vant)

Vue.use(Lazyload)

Vue.use(Dialog)

Vue.use(Area)

Vue.use(animated)

Vue.use(VueAwesomeSwiper)

Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
Vue.component('v-chart', ECharts)

Vue.prototype.$toast = Toast
Vue.prototype.$Notice = Notify
Vue.prototype.$dialog = Dialog
Vue.prototype.$userId = '999'

Vue.config.productionTip = false

// 路由全局守卫
const showLoadingPageArr = [
  'carDetail',
  'fourSteepBuyIndex',
  'buyCarIndex',
  'compareCar',
  'findIndex',
  'personalIndex',
  'buyElectricPile',
  'personalRecommendCar',
  'articleDetail',
  'classroomDetail'
]

router.beforeEach((to, from, next) => {
  Dialog.close();
  let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
  
  if (!wechatInfo && process.env.NODE_ENV === 'production') {
    Dialog.alert({
      title: '温馨提示',
      message: '请在微信端访问此链接！'
    }).then(() => {
      next(false);
    });
  } else {
    if (showLoadingPageArr.includes(to.name)) {
      store.commit('setLoading', true);
    }

    // 全局判断是否定位且依据标识定位到对应菜单
    let excludePages = ['citySelect', 'consultantLogin', 'consultantRegister', 'platformIntroduction', 'headStatics', 'platformStatics'];
    if (!localStorage.getItem("shopId") && !excludePages.includes(to.name)) {
      next({
        name: 'citySelect',
        query: {
          id: to.query.id
        }
      });
    } else {
      if (!localStorage.getItem('userId') && !excludePages.includes(to.name)) {
        api.user
        .getUser()
        .then(res => {
          localStorage.setItem("userId", res.payload.memberId);
        }) 
        .catch(err => {
          Toast(err.payload);
          localStorage.setItem("userId", "999");
          sessionStorage.removeItem('loginOut');
        }); 
      }

      next();
    }
  }
})
router.afterEach((to, from) => {
  // 设置初始url,IOS单独处理
  const tmpUrl = location.origin + location.pathname + location.search;
  if (window.__wxjs_is_wkwebview) {
    if (window.iosSignUrl === '' || window.iosSignUrl === undefined) {
      window.iosSignUrl = tmpUrl;
    }
  } else {
    window.iosSignUrl = tmpUrl;
  }
  // ⬆⬆⬆
})

// 重载url 
wechatUrlFn().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
