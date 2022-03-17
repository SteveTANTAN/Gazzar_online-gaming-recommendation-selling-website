import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/admin/login', component: '@/admin/pages/login' },
    { path: '/admin', redirect: '/admin/login' },

    {
      path: '/admin/manage',
      component: '@/admin/layouts/index',
      routes: [
        { path: '/admin/manage/admins', component: '@/admin/pages/adminManage' },
        { path: '/admin/manage/games', component: '@/admin/pages/gameManage' },
        { path: '/admin/manage/Peripherals', component: '@/admin/pages/PeripheralsManage' },
        { path: '/admin/manage/games/add', component: '@/admin/pages/addGame' },
        { path: '/admin/manage/gameedit', component: '@/admin/pages/gameEdit' },
        { path: '/admin/manage/Peripherals/add', component: '@/admin/pages/addPeripherals' },


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
  proxy: {
    '/api': {
    target: 'http://127.0.0.1:55467',//后端实际api地址
    changeOrigin: true,
    //pathRewrite会对前端的请求地址截取 如前端访问地址
    //http://localhost:8888/api/esbapi/manager/cm0004 截取/api/esbapi后再重新定位到 后端 http://127.0.0.1:56668/manager
  }
},
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    "primary-color": "rgba(22, 155, 213, 1)",
  },
 
  fastRefresh: {},
});
