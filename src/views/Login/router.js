export default {
  path: '/',
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      path: 'register',
      name: 'register',
      meta: {
        name: '注册',
        level: 1
      },
      component: () => import('./register.vue')
    },
    {
      path: 'register-protocol',
      name: 'register-protocol',
      meta: {
        name: '注册协议',
        level: 1
      },
      component: () => import('./register-protocol.vue')
    },
    {
      path: 'login',
      name: 'login',
      meta: {
        name: '登录',
        level: 1
      },
      component: () => import('./login.vue')
    },
    {
      path: 'forget-password',
      name: 'forget-password',
      meta: {
        name: '忘记密码',
        level: 1
      },
      component: () => import('./forget-password.vue')
    }
  ]
}
