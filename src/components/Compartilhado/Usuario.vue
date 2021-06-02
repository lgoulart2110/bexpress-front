<template>
  <div class="elevation-2 px-2">
    <h1 class="display-1">Usuários</h1>
    <br>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">Login</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in usuarios"
            :key="item.id"
          >
            <td>{{ item.pessoa.nome }}</td>
            <td>{{ item.login }}</td>
            <td>
              <v-icon
                small
                @click="removerUsuario(item)"
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
import Paginacao from './Pages/Paginacao.vue';
import Utils from '@/utils/Utils.js';
import service from '@/components/services.js';

export default {
  components: {
    Paginacao
  },
  data: () => ({
    usuario: {},
    usuarios: [],
    pagina: 1,
    totalPaginas: 1,
  }),
  mounted () {
    this.obterUsuarios();
  },
  methods: {
    limparObjeto() {
      this.usuario = {};
      this.obterUsuarios(this.pagina);
    },
    async removerUsuario(usuarioRemover) {
      Utils.confirmar(
        'O usuário não poderá acessar o sistema. Deseja continuar?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await service.removerUsuario(usuarioRemover.id).then(() => {
            this.limparObjeto();
          }).catch(error => {
            Utils.mensagemErro(error.response.data);
          });
        } 
      });
    },
    async obterUsuarios() {
      await service.getUsuariosPaginado(this.pagina, 10).then(({data}) => {
        this.pagina = data.pagina;
        this.totalPaginas = data.totalPaginas;
        this.usuarios = data.dados;
      }).catch(error => {
        Utils.mensagemErro(error.response.data);
      });
    },
    async mudarPagina(paginas) {
      this.pagina = paginas;
      await this.obterUsuarios();
    }
  }
}
</script>