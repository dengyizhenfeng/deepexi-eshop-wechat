export default {
  path: '/personalExcel',
  meta: {
    name: '个人桩报表'
  },
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: '',
      name: 'personalExcelIndex',
      meta: {
        name: '个人桩报表',
        level: 2
      },
      component: () => import('./index.vue')
    },
    {
      path: 'InputExcelIndex',
      name: 'InputExcelIndex',
      meta: {
        name: '填写办电信息',
        level: 2
      },
      component: () => import('./inputNews.vue')
    },
    {
      path: 'InputCreateIndex',
      name: 'InputCreateIndex',
      meta: {
        name: '填写建桩信息',
        level: 2
      },
      component: () => import('./inputCreateNews.vue')
    },
    {
      path: 'inputFinish',
      name: 'inputFinish',
      meta: {
        name: '提交完成',
        level: 2
      },
      component: () => import('./finish.vue')
    }
  ]
}
