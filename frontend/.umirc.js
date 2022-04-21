import {
  defineConfig
} from 'umi';

export default defineConfig({
  routes: [{
      path: '/admin/login',
      component: '@/admin/pages/login'
    },
    {
      path: '/admin',
      redirect: '/admin/login'
    },

    {
      path: '/admin/manage',
      component: '@/admin/layouts/index',
      routes: [
        { path: '/admin/manage/admins', component: '@/admin/pages/adminManage' },
        { path: '/admin/manage/orders', component: '@/admin/pages/orderManage' },
        { path: '/admin/manage/games', component: '@/admin/pages/gameManage' },
        { path: '/admin/manage/games/add', component: '@/admin/pages/gameAdd' },
        { path: '/admin/manage/games/edit/:gameid', component: '@/admin/pages/gameEdit' },
        { path: '/admin/manage/Peripherals', component: '@/admin/pages/PeripheralsManage' },
        { path: '/admin/manage/Peripherals/add', component: '@/admin/pages/PeripheralsAdd' },
        { path: '/admin/manage/Peripherals/edit/:peripheralsid', component: '@/admin/pages/PeripheralsEdit' },
        { path: '/admin/manage/overView', component: '@/admin/pages/overView' },

      ],
    },
    {
      path: '/user/login',
      component: '@/user/pages/login'
    },
    {
      path: '/user/register',
      component: '@/user/pages/login/Register'
    },
    {
      path: '/user/password',
      component: '@/user/pages/login/Password'
    },
    {
      path: '/',
      redirect: '/user/home'
    },
    {
      path: '/user',
      component: '@/user/layouts/index',
      routes: [{
          path: '/user/home',
          component: '@/user/pages/home'
        },
        {
          path: '/user/search/:search',
          component: '@/user/pages/home/SearchResult'
        },
        {
          path: '/user/discount',
          component: '@/user/pages/home/Discount'
        },
        {
          path: '/user/detail/:id',
          component: '@/user/pages/detail'
        },
        {
          path: '/user/cart',
          component: '@/user/pages/cart'
        },
        {
          path: '/user/order',
          component: '@/user/pages/order'
        },
        {
          path: '/user/order-detail/:id',
          component: '@/user/pages/order/detail'
        },
        {
          path: '/user/payment',
          component: '@/user/pages/payment'
        },
        {
          path: '/user/payment/:id/:quantity',
          component: '@/user/pages/payment'
        },
        {
          path: '/user/profile',
          component: '@/user/pages/profile'
        },
        {
          path: '/user/lottery',
          component: '@/user/pages/lottery'
        },
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:55467',//The actual api address of the backend, you need to run the server
      //target: 'http://114.55.74.30:55467',//The backend is in the cloud, no need to run the server
      //target: 'https://bkdapp.herokuapp.com/',//The backend is in the cloud, no need to run the server
      
            changeOrigin: true,
      //pathRewrite will intercept the front-end request address, such as the front-end access address
      //http://localhost:8888/api/esbapi/manager/cm0004 Intercept /api/esbapi and then relocate to the backend http://127.0.0.1:56668/manager
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
