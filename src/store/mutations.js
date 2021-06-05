const mutations = {
  setarUsuario(state, usuario) {
    state.usuario = usuario;
  },
  setarPessoa(state, pessoa) {
    state.pessoa = pessoa;
  },
  setarCarrinho(state, carrinhoCompras) {
    state.carrinhoCompras = carrinhoCompras
  },
  setarToken(state, token) {
    state.token = token;
  },
  setarQuantidadeItems(state, quantidadeItems) {
    state.quantidadeItems = quantidadeItems;
  },
  setarPedidos(state, pedidos) {
    state.pedidos = pedidos;
  }
};

export default mutations;