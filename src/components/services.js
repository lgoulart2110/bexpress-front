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
    var url = `produto/produtos?pagina=${pagina}&quantidadePagina=${quantidade}&categoriaId=${categoriaId}`;
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
    const url = `produto?nome=${produto.nome}&categoriaId=${produto.categoriaId}&descricao=${produto.descricao}&preco=${produto.preco}&quantidadeEstoque=${produto.quantidadeEstoque}`;
    const form = new FormData();
    form.append('imagem', produto.imagem);
    return await api.post(url, form);
  },
  async alterarProduto(produto) {
    return await api.put(`produto`, produto);
  },
  async getEnderecos() {
    return await api.get('endereco');
  },
  async removerEndereco(enderecoRemover) {
    return await api.delete(`endereco/${enderecoRemover.id}`);
  },
  async buscaCep(cep) {
    cep = cep.replace('-', '').replace('.', '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return await fetch(url).then((response) => {
      return response.json();
    });
  },
  async adicionarEndereco(endereco) {
    return await api.post('endereco', endereco);
  },
  async atualizarEndereco(endereco) {
    return await api.put('endereco', endereco);
  },
  async adicionarProdutoCarrinho(produtoId, quantidade) {
    return await api.post('carrinhoCompras/adicionar', {
      produtoId,
      quantidade
    });
  },
  async realizarPedido(pedido) {
    return await api.post('pedido', pedido);
  },
  async removerItem(item) {
    return await api.delete(`carrinhoCompras/${item.produtoId}`);
  },
  async calcularFrete() {
    return await api.post('carrinhoCompras/frete');
  },
  async obterPedidos(pagina, quantidade) {
    return await api.get(`pedido?pagina=${pagina}&quantidade=${quantidade}`);
  },
  async cancelarPedido(pedidoId) {
    return await api.put(`pedido/cancelar/${pedidoId}`);
  },
  async enviarPedido(pedidoId) {
    return await api.put(`pedido/enviar/${pedidoId}`);
  },
  async finalizarPedido(pedidoId) {
    return await api.put(`pedido/finalizar/${pedidoId}`);
  },
  async aceitarPedido(pedidoId) {
    return await api.put(`pedido/aceitar/${pedidoId}`);
  },
  async alterarSenha(alterarSenhaDto) {
    return await api.put('usuario', alterarSenhaDto);
  },
  async imprimir(relatorio) {
    return await api.get(`relatorio?tipo=${relatorio.tipo}&dataInicio=${relatorio.dataInicio}&dataFim=${relatorio.dataFim}`, { responseType: 'blob' });
  }
};

export default service;