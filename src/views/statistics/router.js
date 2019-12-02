export default {
  path: '/headStatics',
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: '',
      name: 'headStatics',
      meta: {
        name: '总部端统计',
        level: 1
      },
      component: () => import('./head.vue')
    },
    {
      path: 'platformStatics',
      name: 'platformStatics',
      meta: {
        name: '合资公司端统计',
        level: 1
      },
      component: () => import('./platform.vue')
    },
    {
      path: 'salesDetail',
      name: 'salesDetail',
      meta: {
        name: '统计详情',
        level: 1
      },
      component: () => import('./sales-detail.vue')
    }
  ]
}
