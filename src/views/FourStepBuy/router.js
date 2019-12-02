export default {
  path: '/fourSteepBuy',
  meta: {
    name: '四步购车'
  },
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: 'index',
      name: 'fourSteepBuyIndex',
      meta: {
        name: '四步购车',
        level: 2
      },
      component: () => import('./index.vue')
    },
    {
      path: 'buyProgressFinish',
      name: 'buyProgressFinish',
      meta: {
        name: '购买完成',
        level: 2
      },
      component: () => import('./lastPage.vue')
    },
    {
      path: 'helpCustomerOrder',
      name: 'helpCustomerOrder',
      meta: {
        name: '代客户下单',
        level: 1
      },
      component: () => import('./helpCustomerOrder.vue')
    }
  ]
}
