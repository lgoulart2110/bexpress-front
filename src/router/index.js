import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Categoria from '../components/Compartilhado/Categoria.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Loja',
    component: Home,
    children: [
      {
        path: 'categoria',
        component: Categoria
      }
    ]
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
    next({name: 'Login'});
  } else if (to.name === 'Login' && token) {
    next({name: 'Loja'});
  } else {
    next();
  }  
});

export default router;
