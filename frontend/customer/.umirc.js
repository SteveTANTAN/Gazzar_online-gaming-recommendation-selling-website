import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/login', component: 'login' },
    { path: '/register', component: 'login/Register' },
    { path: '/password', component: 'login/Password' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: 'home' },
        { path: '/profile', component: 'Profile' },
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
