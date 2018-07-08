import Vue from 'vue';
import Router from 'vue-router';

const baseRoutes = [
  // {
  //   path: '/',
  //   name: 'Landing',
  //   component: Landing,
  //   children: [],
  // },
];
const routes = baseRoutes.concat(authRouter);
// export default new Router({routes,})

export default new Router({
  // mode: 'history',
  routes,
  // {
  //   path: '/',
  //   component: Page
  // },
  // {
  //   path: '/home',
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   // children: [{
  //   //   path: '/foo',
  //   //   name: 'foo',
  //   //   component: Dash,
  //   //   meta: {
  //   //     requiresAuth: true
  //   //   }
  //   // }],
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
});
