import api from '@/api/index.js';

const service = {
  async getCategoriasPaginada(pagina, quantidade) {
    const url = `categoria/categorias/paginada?pagina=${pagina}&quantidadePagina=${quantidade}`;
    return await api.get(url);
  },
  async getUsuariosPaginado(pagina, quantidade) {
    const url = `usuario/usuarios/paginado?pagina=${pagina}&quantidadePagina=${quantidade}`;
    return await api.get(url);
  },
  async removerUsuario(id) {
    return await api.delete(`usuario/${id}`);
  },
  async getProdutosPaginado(categoriaId, pagina, quantidade) {
    var url = `produto/produtos?pagina=${pagina}&quantidadePagina=${quantidade}`;
    if (categoriaId) url = `${url}&categoriaId=${categoriaId}`;
    return await api.get(url);
  },
  async getCategorias() {
    return await api.get('categoria');
  },
  async removerProduto(id) {
    return await api.delete(`produto/${id}`);
  },
  async adicionarProduto(produto) {
    const url = `produto?nome=${produto.nome}&categoriaId=${produto.categoriaId}&descricao=${produto.descricao}&preco=${produto.preco}`;
    const form = new FormData();
    form.append('imagem', produto.imagem);
    return await api.post(url, form);
  }
};

export default service;