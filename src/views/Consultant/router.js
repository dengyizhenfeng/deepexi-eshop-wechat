export default {
  path: '/consultant',
  meta: {
    name: '专属顾问',
    icon: ''
  },
  component: () => import('../../layouts'),
  children: [
    {
      path: '',
      name: 'consultantIndex',
      meta: {
        name: '专属顾问',
        level: 1
      },
      component: () => import('./index.vue')
    }
  ]
}
