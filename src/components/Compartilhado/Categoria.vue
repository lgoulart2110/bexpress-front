<template>
  <div class="elevation-2 px-2">
    <h1 class="display-2">Categorias</h1>
    <ModalCategoria ref="modalCategoria" :categoria="categoria" :limparObjeto="limparObjeto" />
    <v-simple-table>
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
  </div>
</template>

<script>
import ModalCategoria from './Pages/ModalCategoria.vue';
import Utils from '@/utils/Utils.js';

export default {
  components: {
    ModalCategoria
  },
  data: () => ({
    ehAdiministrador: false,
    categoria: {},
    categorias: []
  }),
  mounted () {
    this.ehAdministrador = this.$store.state.usuario.tipoUsuario == 0;
    this.categorias = this.$store.state.categorias;
  },
  methods: {
    editarCategoria(categoriaEditar) {
      const index = this.categorias.indexOf(categoriaEditar);
      this.categoria = this.categorias[index];
      this.$refs.modalCategoria.abrirDialog();
    },
    limparObjeto() {
      this.categoria = {};
    },
    async removerCategoria(categoriaRemover) {
      console.log(categoriaRemover);
      Utils.confirmar(
        'Ao inativar essa categoria, todos os produtos relaciondos a ela também serão inativados. Deseja continuar?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch('deletarCategoria', categoriaRemover);
        } 
      });
    }
  }
}
</script>