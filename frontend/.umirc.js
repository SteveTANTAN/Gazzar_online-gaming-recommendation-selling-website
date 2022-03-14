import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/admin/login', component: '@/admin/pages/login' },
    { path: '/admin', redirect: '/admin/login' },

    {
      path: '/admin/manage',
      component: '@/admin/layouts/index',
      routes: [
        { path: '/admin/manage/admins', component: '@/admin/pages/adminManage' }
      ],
    },
    { path: '/user/login', component: '@/user/pages/login' },
    { path: '/user/register', component: '@/user/pages/login/Register' },
    { path: '/user/password', component: '@/user/pages/login/Password' },
    { path: '/', redirect: '/user/home' },
    {
      path: '/user',
      component: '@/user/layouts/index',
      routes: [
        { path: '/user/home', component: '@/user/pages/home' },
        { path: '/user/search', component: '@/user/pages/home/SearchResult' },
        { path: '/user/detail', component: '@/user/pages/detail' },
        { path: '/user/cart', component: '@/user/pages/cart' },
        { path: '/user/order', component: '@/user/pages/order' },
        { path: '/user/order-detail', component: '@/user/pages/order/detail' },
        { path: '/user/payment', component: '@/user/pages/payment' },
        { path: '/user/profile', component: '@/user/pages/profile' },
        { path: '/user/lottery', component: '@/user/pages/lottery' },
      ],
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    "primary-color": "rgba(22, 155, 213, 1)",
  },
 
  fastRefresh: {},
});
