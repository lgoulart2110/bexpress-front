<template>
  <div class="elevation-2 px-2">
    <h1 class="display-1">Pedidos</h1>
    <br>
    <v-expansion-panels>
      <v-expansion-panel v-for="(pedido, index) in pedidos" :key="index">
        <v-expansion-panel-header v-if="pedido.situacaoPedido === 0">
          Pedido #{{pedido.id}} - Aguardando aceitação
          <template v-slot:actions>
            <v-icon color="orange">
              mdi-cached
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-header v-else-if="pedido.situacaoPedido === 1">
          Pedido #{{pedido.id}} - Em separação
          <template v-slot:actions>
            <v-icon color="primary">
              mdi-dropbox
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-header v-else-if="pedido.situacaoPedido === 2">
          Pedido #{{pedido.id}} - Saiu para entrega
          <template v-slot:actions>
            <v-icon color="blue-grey">
              mdi-moped
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-header v-else-if="pedido.situacaoPedido === 3">
          Pedido #{{pedido.id}} - Cancelado
          <template v-slot:actions>
            <v-icon color="error">
              mdi-alert-circle
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-header v-else-if="pedido.situacaoPedido === 4">
          Pedido #{{pedido.id}} - Entregue
          <template v-slot:actions>
            <v-icon color="teal">
              mdi-check
            </v-icon>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <div v-if="administrador">Cliente: {{pedido.usuario.pessoa.nome}}</div>
          <div v-html="pedido.descricaoCompleta"></div>
          <v-sheet
            class="py-4 px-1"
          >
            <v-chip-group
              mandatory
            >
              <v-chip
                v-if="pedido.situacaoPedido === 0 || pedido.situacaoPedido === 1"
                color="error"
                text-color="white"
                @click="cancelarPedido(pedido.id)"
              >
                Cancelar Pedido
              </v-chip>
              <v-chip
                v-if="pedido.situacaoPedido === 0 && administrador"
                color="primary"
                text-color="white"
                @click="aceitarPedido(pedido.id)"
              >
                Aceitar Pedido
              </v-chip>
              <v-chip
                v-if="pedido.situacaoPedido === 1 && administrador"
                color="blue-grey"
                text-color="white"
                @click="enviarPedido(pedido.id)"
              >
                Enviar Pedido
              </v-chip>
              <v-chip
                v-if="pedido.situacaoPedido === 2 && administrador"
                color="teal"
                text-color="white"
                @click="finalizarPedido(pedido.id)"
              >
                Finalizar Pedido
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-expansion-panels>
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
    pedidos: [],
    pagina: 1,
    totalPaginas: 1,
    administrador: false
  }),
  mounted () {
    this.obterPedidos();
    this.administrador = this.$store.state.usuario.tipoUsuario == 0;
    this.obterPedidosSetState();
  },
  methods: {
    async obterPedidos() {
      await service.obterPedidos(this.pagina, 10).then(({data}) => {
        this.pagina = data.pagina;
        this.totalPaginas = data.totalPaginas;
        this.pedidos = data.dados;
      }).catch(error => {
        Utils.mensagemErro(error.response.data);
      });
    },
    async mudarPagina(paginas) {
      this.pagina = paginas;
      await this.obterPedidos();
    },
    obterValorPedido(valor) {
      console.log(valor)
      return `R$ ${valor}`.substring('.', ',');
    },
    async cancelarPedido(pedidoId) {
      Utils.confirmar(
        'Deseja realmente cancelar esse pedido?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await service.cancelarPedido(pedidoId).then(() => {
            Utils.mensagemSucesso("Pedido cancelado com sucesso.");
          }).catch(error => {
            Utils.mensagemErro(error.response.data);
          });
          await this.obterPedidos();
        } 
      });
    },
    async aceitarPedido(pedidoId) {
      Utils.confirmar(
        'Deseja realmente aceitar esse pedido?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await service.aceitarPedido(pedidoId).then(() => {
            Utils.mensagemSucesso("Pedido aceito com sucesso.");
          }).catch(error => {
            Utils.mensagemErro(error.response.data);
          });
          await this.obterPedidos();
        } 
      });
    },
    async enviarPedido(pedidoId) {
      Utils.confirmar(
        'Deseja realmente enviar esse pedido?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await service.enviarPedido(pedidoId).then(() => {
            Utils.mensagemSucesso("Pedido enviado com sucesso.");
          }).catch(error => {
            Utils.mensagemErro(error.response.data);
          });
          await this.obterPedidos();
        } 
      });
    },
    async finalizarPedido(pedidoId) {
      Utils.confirmar(
        'Deseja realmente finalizar esse pedido?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await service.finalizarPedido(pedidoId).then(() => {
            Utils.mensagemSucesso("Pedido finalizado com sucesso.");
          }).catch(error => {
            Utils.mensagemErro(error.response.data);
          });
          await this.obterPedidos();
        } 
      });
    },
    obterPedidosSetState() {
      setInterval(async () => {
        await this.obterPedidos();
      }, 5000);
    }
  }
}
</script>