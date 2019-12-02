export default {
    path: '/personal',
    component: () => import('../../layouts/default.vue'),
    children: [
      {
        path: 'QRcodePage',
        name: 'QRcodePage',
        meta: {
          name: '专属顾问'
        },
        component: () => import('./QRcodePage.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        meta: {
          name: '设置'
        },
        component: () => import('./setting.vue')
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        meta: {
          name: '修改密码'
        },
        component: () => import('./changePassword.vue')
      },
      {
        path: 'consultant_new',
        name: 'consultant_new',
        meta: {
          name: '顾问个人中心',
          allowBack: false
        },
        component: () => import('./consultant_new.vue')
      },
      {
        path: 'myClient',
        name: 'myClient',
        meta: {
          name: '我的客户'
        },
        component: () => import('./myClient.vue')
      },
      {
        path: 'connection',
        name: 'connection',
        meta: {
          name: '大客户登陆'
        },
        component: () => import('./../personalChild/connection.vue')
      }
    ]
  }
