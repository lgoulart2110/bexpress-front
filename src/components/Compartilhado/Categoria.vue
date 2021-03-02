<template>
  <div class="elevation-2 px-2">
    <h1 class="display-2">Categorias</h1>
    <ModalCategoria ref="modalCategoria" :categoria="categoria" :limparObjeto="limparObjeto" />
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Nome
            </th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in categorias"
            :key="item.id"
          >
            <td>{{ item.nome }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="editarCategoria(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="removerCategoria(item)"
              >
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <Paginacao :pagina="pagina" :totalPaginas="totalPaginas" :mudarPagina="mudarPagina" />
  </div>
</template>

<script>
import ModalCategoria from './Pages/ModalCategoria.vue';
import Paginacao from './Pages/Paginacao.vue';
import Utils from '@/utils/Utils.js';
import service from '@/components/services.js';

export default {
  components: {
    ModalCategoria,
    Paginacao
  },
  data: () => ({
    ehAdiministrador: false,
    categoria: {},
    categorias: [],
    pagina: 1,
    totalPaginas: 1,
  }),
  mounted () {
    this.ehAdministrador = this.$store.state.usuario.tipoUsuario == 0;
    this.obterCategorias();
  },
  methods: {
    editarCategoria(categoriaEditar) {
      const index = this.categorias.indexOf(categoriaEditar);
      this.categoria = this.categorias[index];
      this.$refs.modalCategoria.abrirDialog();
    },
    limparObjeto() {
      this.categoria = {};
      this.obterCategorias(this.pagina);
    },
    async removerCategoria(categoriaRemover) {
      Utils.confirmar(
        'Ao inativar essa categoria, todos os produtos relaciondos a ela também serão inativados. Deseja continuar?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch('deletarCategoria', categoriaRemover);
          this.limparObjeto();
        } 
      });
    },
    async obterCategorias() {
      await service.getCategoriasPaginada(this.pagina, 10).then(({data}) => {
        this.pagina = data.pagina;
        this.totalPaginas = data.totalPaginas;
        this.categorias = data.dados;
      }).catch(error => {
        Utils.mensagemErro(error.response.data);
      });
    },
    async mudarPagina(paginas) {
      this.pagina = paginas;
      await this.obterCategorias();
    }
  }
}
</script>