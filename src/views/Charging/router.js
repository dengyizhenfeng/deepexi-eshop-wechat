export default {
  path: '/charging',
  meta: {
    name: '充电',
    icon: ''
  },
  component: () => import('../../layouts/default.vue'),
  children: [
    {
      path: '/',
      name: 'chargingIndex',
      meta: {
        name: '充电',
        level: 1
      },
      component: () => import('./index.vue')
    }
  ]
}
