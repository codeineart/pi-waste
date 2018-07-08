import Vue from 'vue';
import Router from 'vue-router';
import Landing from 'src/views/Landing.vue';

const baseRoutes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    children: [],
  },
];
const routes = baseRoutes.concat();
// export default new Router({routes,})

export default new Router({
  // mode: 'history',
  routes,
});
