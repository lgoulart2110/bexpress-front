import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/loja',
    name: 'Loja',
    component: Home
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = store.state.token;

  if (token) store.dispatch('setarBerarToken', token);
  
  if (to.name !== 'Login' && !token) {
    next('/');
  } else if (to.name === 'Login' && token) {
    next('/loja');
  } else {
    next();
  }
  
});

export default router;
