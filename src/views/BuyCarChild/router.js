export default {
  path: '/carDetail',
  meta: {
    name: '车辆详情'
  },
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: 'car-recommeng',
      name: 'car-recommend',
      meta: {
        name: '车辆列表',
        level: 2
      },
      component: () => import('./recommend.vue')
    },
    {
      path: '',
      name: 'carDetail',
      meta: {
        name: '车辆详情',
        level: 2,
        onshare: true
      },
      component: () => import('./carDetail.vue')
    },
    {
      path: 'tryDriving',
      name: 'tryDriving',
      meta: {
        name: '试乘试驾',
        level: 2
      },
      component: () => import('./tryDriving.vue')
    },
    {
      path: 'chooseTryDrivingTime',
      name: 'chooseTryDrivingTime',
      meta: {
        name: '试乘试驾',
        level: 2
      },
      component: () => import('./chooseTryDrivingTime.vue')
    },
    {
      path: 'carMAp',
      name: 'carMAp',
      meta: {
        name: '试乘试驾',
        level: 2
      },
      component: () => import('./trySelect.vue')
    },
    {
      path: 'articleDetail',
      name: 'articleDetail',
      meta: {
        name: '文章详情',
        level: 2
      },
      component: () => import('./articleDetail.vue')
    },
    {
      path: 'recommendCar',
      name: 'personalRecommendCar',
      meta: {
        name: '专属推荐',
        level: 2
      },
      component: () => import('./recommendCar.vue')
    },
    {
      path: 'groupBuy',
      name: 'groupBuy',
      meta: {
        name: '团购',
        level: 2,
        onshare: true
      },
      component: () => import('./groupBuy.vue')
    },
    {
      path: 'enroll',
      name: 'enroll',
      meta: {
        name: '团购',
        level: 2
      },
      component: () => import('./enroll.vue')
    },
    {
      path: 'compareCar',
      name: 'compareCar',
      meta: {
        name: '车辆对比',
        level: 2
      },
      component: () => import('./compareCar.vue')
    }
  ]
}
