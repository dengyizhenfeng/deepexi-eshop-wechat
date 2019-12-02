export default {
  path: '/consultant',
  meta: {
    name: '留言'
  },
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: 'scanError',
      name: 'scanError',
      meta: {
        name: '扫描失败',
        level: 1
      },
      component: () => import('./scanError.vue')
    },
    {
      path: 'leaveMessage',
      name: 'leaveMessage',
      meta: {
        name: '留言',
        level: 1
      },
      component: () => import('./message.vue')
    },
    {
      path: 'messageFinish',
      name: 'messageFinish',
      meta: {
        name: '留言成功',
        level: 1
      },
      component: () => import('./finish.vue')
    },
    {
      path: 'helpPlaceAnOrder',
      name: 'helpPlaceAnOrder',
      meta: {
        name: '代他下单',
        level: 1
      },
      component: () => import('./helpPlaceAnOrder.vue')
    },
    {
      path: 'consultantOrder',
      name: 'consultantOrder',
      meta: {
        name: '我的订单',
        level: 1
      },
      component: () => import('./consultantOrder.vue')
    },
    {
      path: 'consultantLogin',
      name: 'consultantLogin',
      meta: {
        name: '专属顾问',
        level: 1
      },
      component: () => import('./consultantLogin.vue')
    },
    {
      path: 'consultantRegister',
      name: 'consultantRegister',
      meta: {
        name: '专属顾问',
        level: 1
      },
      component: () => import('./consultantRegister.vue')
    }
  ]
}
