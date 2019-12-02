export default {
  path: '/find',
  meta: {
    name: 'Find',
    icon: ''
  },
  component: () => import('../../layouts'),
  children: [
    {
      path: '',
      name: 'findIndex',
      meta: {
        name: '发现',
        level: 1,
        keepAlive: true
      },
      component: () => import('./index.vue')
    }, 
    {
      path: 'findDetail',
      name: 'FindDetail',
      meta: {
        name: '发现细节',
        level: 2
      },
      component: () => import('./detail.vue')
    }, {
      path: 'activity1',
      name: 'activity',
      meta: {
        name: '活动',
        level: 2
      },
      component: () => import('./activity1.vue')
    }, {
      path: 'information',
      name: 'information',
      meta: {
        name: '资讯',
        level: 2
      },
      component: () => import('./information.vue')
    }, {
      path: 'enjoy',
      name: 'enjoy-common',
      meta: {
        name: '暂未开通',
        level: 2
      },
      component: () => import('./enjoy.vue')
    }, {
      path: 'newRelease',
      name: 'newRelease',
      meta: {
        name: '新车上市',
        level: 2
      },
      component: () => import('./newRelease.vue')
    }
  ]
}
