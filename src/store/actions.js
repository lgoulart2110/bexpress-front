import api from '@/api/index.js';
import Utils from '@/utils/Utils.js';

const setBearerToken = (token) => api.defaults.headers.Authorization = `Bearer ${token}`;

const actions = {
  async realizarLogin(context, loginDto) {
    await api.post('usuario/login', loginDto).then(({data}) => {
      context.dispatch('setarUsuario', data);
    }).catch(error => {
      throw error.response.data;
    });
  },
  setarBerarToken(context, token) {
    setBearerToken(token);
    context.commit('setarToken', token);
  },
  setarUsuario(context, usuario) {
    context.dispatch('setarBerarToken', usuario.token);
    context.commit('setarCarrinho', usuario.carrinhoCompras);
    context.commit('setarPessoa', usuario.pessoa);
    usuario.token = '';
    usuario.carrinhoCompras = null;
    usuario.pessoa = null;
    usuario.lazyLoader = null;
    context.commit('setarUsuario', usuario);
  },
  async cadastrarUsuario(context, usuarioDto) {
    await api.post('usuario', usuarioDto).then(() => {
      Utils.mensagemSucesso('Cadastro realizado com sucesso, entre com seu e-mail e senha.');
    }).catch(error => {
      throw error.response.data;
    });
  },
  realizarLogout(context) {
    context.commit('setarToken', '');
    context.commit('setarCarrinho', {});
    context.commit('setarPessoa', {});
    context.commit('setarUsuario', {});
  },
  async cadastrarCategoria(context, categoria) {
    await api.post('categoria', categoria).then(() => {
      Utils.mensagemSucesso('Categoria cadastrada com sucesso!');
    }).catch(error => {
      throw error.response.data;
    });
  },
  async atualizarCategoria(context, categoria) {
    await api.put('categoria', categoria).then(() => {
      Utils.mensagemSucesso('Categoria atualizada com sucesso!');
    }).catch(error => {
      throw error.response.data;
    });
  },
  async deletarCategoria(context, categoria) {
    await api.delete('categoria/' + categoria.id).then(() => {
      Utils.mensagemSucesso('Categoria atualizada com sucesso!');
    }).catch(error => {
      throw error.response.data;
    });
  }
};

export default actions;