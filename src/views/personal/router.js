export default {
  path: '/personal',
  meta: {
    name: '我的',
    icon: ''
  },
  component: () => import('../../layouts'),
  children: [
    {
      path: '',
      name: 'personalIndex',
      meta: {
        name: '我的',
        level: 1
      },
      component: () => import('./index.vue')
    }
  ]
}
