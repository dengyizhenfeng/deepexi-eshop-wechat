export default {
  path: '/',
  meta: {
    name: ''
  },
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: 'citySelect',
      name: 'citySelect',
      meta: {
        name: '城市定位',
        level: 2
      },
      component: () => import('./citySelect.vue')
    },
    {
      path: 'classroom',
      name: 'classroomDetail',
      meta: {
        name: '课堂详情',
        level: 2
      },
      component: () => import('./classroom.vue')
    },
    {
      path: 'searchPage',
      name: 'searchPage',
      meta: {
        name: '搜索',
        level: 2
      },
      component: () => import('./searchPage.vue')
    }, {
      path: 'enjoy',
      name: 'enjoy',
      meta: {
        name: '分享',
        level: 2
      },
      component: () => import('./enjoy.vue')
    }, {
      path: 'myComment',
      name: 'myComment',
      meta: {
        name: '个人分享',
        level: 2
      },
      component: () => import('./myComment.vue')
    }
  ]
}
