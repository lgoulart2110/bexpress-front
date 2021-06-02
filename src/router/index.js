import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Categoria from '../components/Compartilhado/Categoria.vue';
import Produto from '../components/Compartilhado/Produto.vue';
import Usuario from '../components/Compartilhado/Usuario.vue';
import Perfil from '../components/Compartilhado/Perfil.vue';
import Carrinho from '../components/Compartilhado/Carrinho.vue';
import api from '@/api/index.js';
import Utils from '@/utils/Utils.js';

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
      },
      {
        path: 'produto',
        component: Produto
      },
      {
        path: 'usuario',
        component: Usuario
      },
      {
        path: 'perfil',
        component: Perfil
      },
      {
        path: 'carrinho',
        component: Carrinho
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
  const usuario = store.state.usuario;

  if (token) store.dispatch('setarBerarToken', token);

  api.post('usuario/jwt', usuario)
  .then(() => {
    if (to.name !== 'Login' && !token) {
      next({name: 'Login'});
    } else if (to.name === 'Login' && token) {
      next({name: 'Loja'});
    } else {
      next();
    }
  })
  .catch(() => {
    store.dispatch('realizarLogout');
    if (to.name !== 'Login') {
      setTimeout(() => {
        Utils.mensagemErro('Sua sessão expirou, você será redirecionado a tela de login.');
        next({name: 'Login'});
      }, 2000);
    } else {
      next();
    }
    
  });
});

export default router;
