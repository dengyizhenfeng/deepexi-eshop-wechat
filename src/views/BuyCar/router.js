export default {
  path: '/buyCar',
  meta: {
    name: '推荐',
    icon: ''
  },
  component: () => import('../../layouts'),
  children: [
    {
      path: '/',
      name: 'buyCarIndex',
      meta: {
        name: '推荐',
        level: 1
      },
      component: () => import('./index.vue')
    }
  ]
}
