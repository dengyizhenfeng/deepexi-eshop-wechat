export default {
    path: '/platformIntroduction',
    component: () => import('../../layouts/default.vue'),
    children: [
        {
            path: '',
            name: 'platformIntroduction',
            meta: {
                title: '平台简介'
            },
            component: () => import('./index.vue')
        }      
    ]  
}
