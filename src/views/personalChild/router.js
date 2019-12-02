export default {
  path: '/myOrder',
  component: () => import('../../layouts/default.vue'),
  children: [
    {
      path: '',
      name: 'myOrder',
      meta: {
        name: '我的订单',
        level: 2
      },
      component: () => import('./myOrder.vue')
    },
    {
      path: 'myCar',
      name: 'myCar',
      meta: {
        name: '我的车辆',
        level: 2
      },
      component: () => import('./myCar.vue')
    },
    {
      path: 'myFootprint',
      name: 'myFootprint',
      meta: {
        name: '我的足迹',
        level: 2
      },
      component: () => import('./myFootprint.vue')
    },
    {
      path: 'myFocusCar',
      name: 'myFocusCar',
      meta: {
        name: '我的关注',
        level: 2
      },
      component: () => import('./myFocusCar.vue')
    },
    {
      path: 'orderDetail',
      name: 'orderDetail',
      meta: {
        name: '订单详情',
        level: 2,
        onshare: true
      },
      component: () => import('./orderDetail.vue')
    },
    {
      path: 'payment',
      name: 'payment',
      meta: {
        name: '支付尾款',
        level: 2
      },
      component: () => import('./payment.vue')
    },
    {
      path: 'myTryDriving',
      name: 'myTryDriving',
      meta: {
        name: '我的试驾',
        level: 2
      },
      component: () => import('./myTryDriving.vue')
    },
    {
      path: 'buyElectricpile',
      name: 'buyElectricPile',
      meta: {
        name: '买电桩',
        level: 2
      },
      component: () => import('./buyElectricpile.vue')
    },
    {
      path: 'pileDetail',
      name: 'pileDetail',
      meta: {
        name: '电桩详情',
        level: 2
      },
      component: () => import('./pileDetail.vue')
    },
    {
      path: 'payOrderCommon',
      name: 'payOrderCommon',
      meta: {
        name: '支付公用',
        level: 2
      },
      component: () => import('./payOrderCommon.vue')
    },
    {
      path: 'connection',
      name: 'connection',
      meta: {
        name: '大客户登陆',
        level: 2
      },
      component: () => import('./connection.vue')
    }
  ]
}
