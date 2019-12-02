import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Find from './views/Find/router'
import Finds from './views/Find/routers'
import About from './views/BuyCar/router'
import Consultant from './views/Consultant/router'
import Consultants from './views/Consultant/routers'
import Charging from './views/Charging/router'
import Personal from './views/personal/router'
import Login from './views/Login/router'
import BuyCarChild from './views/BuyCarChild/router'
import FourStepBuy from './views/FourStepBuy/router'
import personalChild from './views/personalChild/router'
import PersonalNews from './views/PersonalNews/router'
import consultantPersonal from './views/personal/routers'
import material from './views/material/routers'
import platformIntroduction from './views/platformIntroduction/router'
import statistics from './views/statistics/router'
Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  base: '/sgcc-frontend-wechat/',
  routes: [
    { path: '/', redirect: { path: '/find' } },
    Login,
    Find,
    Finds,
    About,
    Consultant,
    Consultants,
    Charging,
    Personal,
    BuyCarChild,
    FourStepBuy,
    personalChild,
    PersonalNews,
    consultantPersonal,
    material,
    platformIntroduction,
    statistics
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
