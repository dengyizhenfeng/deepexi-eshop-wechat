export default {
    path: '/material',
    meta: {
      name: '营销素材',
      icon: ''
    },
    component: () => import('../../layouts/default.vue'),
    children: [
      {
        path: '/',
        name: 'material',
        meta: {
          title: '营销素材',
          level: 1
        },
        component: () => import('./index.vue')
      }
    ]
  }
