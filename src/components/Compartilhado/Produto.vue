<template>
  <div class="elevation-2 px-2">
    <h1 class="display-1">Bebidas</h1>
    <div v-if="ehAdministrador">
      <ModalProduto :produto="produto" :limparObjeto="limparObjeto" :abrirDialog="abrirDialog" :fecharDialog="fecharDialog" :dialog="dialog" :mostraFoto="mostraFoto" />
    </div>
    <v-row>      
      <v-col cols="12" md="3" v-for="item in produtos" v-bind:key="item.id">
        <CardProduto :produto="item" :removerProduto="removerProduto" :editarProduto="editarProduto" />
      </v-col>
    </v-row>
    <Paginacao :pagina="pagina" :totalPaginas="totalPaginas" :mudarPagina="mudarPagina" />
  </div>
</template>

<script>
import Paginacao from './Pages/Paginacao.vue';
import CardProduto from './Pages/CardProduto.vue';
import ModalProduto from './Pages/ModalProduto.vue';
import Utils from '@/utils/Utils.js';
import service from '@/components/services.js';

export default {
  components: {
    Paginacao,
    CardProduto,
    ModalProduto
  },
  data: () => ({
    produto: {},
    produtos: [],
    pagina: 1,
    totalPaginas: 1,
    ehAdministrador: true,
    dialog: false,
    mostraFoto: true
  }),
  mounted () {
    this.obterProdutos();
  },
  methods: {
    limparObjeto() {
      this.produto = {};
      this.obterProdutos();
      this.verificaFoto();
    },
    async removerProduto(produtoRemover) {
      Utils.confirmar(
        'O produto não ira listar para o cliente. Deseja continuar?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await service.removerProduto(produtoRemover.id).then(() => {
            this.limparObjeto();
          }).catch(error => {
            Utils.mensagemErro(error.response.data);
          });
        } 
      });
    },
    async obterProdutos() {
      await service.getProdutosPaginado(this.produto.id, this.pagina, 10).then(({data}) => {
        this.pagina = data.pagina;
        this.totalPaginas = data.totalPaginas;
        this.produtos = data.dados;
      }).catch(error => {
        Utils.mensagemErro(error.response.data);
      });
    },
    async mudarPagina(paginas) {
      this.pagina = paginas;
      await this.obterProdutos();
    },
    async editarProduto(produto) {
      this.produto = produto;
      this.dialog = true;
      this.verificaFoto();
    },
    abrirDialog() {
      this.dialog = true;
      this.verificaFoto();
    },
    async fecharDialog() {
      this.limparObjeto();
      this.dialog = false;
      this.verificaFoto();
      await this.obterProdutos();
    },
    verificaFoto() {
      this.mostraFoto = this.produto.id == 0 || this.produto.id == undefined || this.produto.id == null;
    }
  }
}
</script>