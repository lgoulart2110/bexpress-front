<template>
  <div>
    <h1 class="display-1">Endereços</h1>
    <ModalEndereco ref="modalEndereco" :endereco="endereco" :limparObjeto="limparObjeto" />
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Endereço
            </th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in enderecos"
            :key="item.id"
          >
            <td>{{ item.nome }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="editarEndereco(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="removerEndereco(item)"
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
import Utils from '@/utils/Utils.js';
import service from '@/components/services.js';
import ModalEndereco from './Pages/ModalEndereco.vue';

export default {
  components: {
    ModalEndereco
  },
  data: () => ({
    enderecos: [],
    endereco: {},
    podeAdicionar: true
  }),
  mounted () {
    this.obterEnderecos();
    this.podeAdicionar = this.enderecos.length < 5;
  },
  methods: {
    editarEndereco(enderecoEditar) {
      const index = this.enderecos.indexOf(enderecoEditar);
      this.endereco = this.enderecos[index];
      this.$refs.modalEndereco.abrirDialog();
    },
    limparObjeto() {
      this.endereco = {};
      this.obterEnderecos();
    },
    async removerEndereco(enderecoRemover) {
      Utils.confirmar(
        'Deseja realmente remover esse endereço?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await service.removerEndereco(enderecoRemover).then(() => {
            Utils.mensagemSucesso("Endereço removido com sucesso!");
            this.limparObjeto();
          });
        } 
      });
    },
    async obterEnderecos() {
      await service.getEnderecos().then(({data}) => {
        this.enderecos = data;
      }).catch(error => {
        Utils.mensagemErro(error.response.data);
      });
    }
  }
}
</script>