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
  setarCategoria(state, categorias) {
    state.categorias = categorias;
  },
  adicionarCategoria(state, categoria) {
    state.categorias.push(categoria);
  },
  removerCategoria(state, categoria) {
    const index = state.categorias.indexOf(categoria);
    state.categorias.splice(index, 1);
  }
};

export default mutations;