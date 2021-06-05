<template>
  <div class="elevation-2 px-2">
    <h1 class="display-1">Carrinho de Compras</h1>
    <br>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Item
            </th>
            <th class="text-left">
              Quantidade
            </th>
            <th class="text-left">
              Preço
            </th>
            <th class="text-left">
              Total
            </th>
            <th class="text-center">
              #
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in carrinho.itemVendas"
            :key="item.produtoId"
          >
            <td>{{ item.produto.nome }}</td>
            <td>{{ item.quantidade }}</td>
            <td>{{ item.produto.preco }}</td>
            <td>{{ obterValorTotal(item) }}</td>
            <td>
              <v-icon
                small
                @click="removerItem(item)"
              >
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br>
    <h5>Escolha o endereço de entrega</h5>
    <v-select
      :items="enderecos"
      label="Endereço"
      clearable
      item-text="nome"
      item-value="id"
      no-data-text="Adicione um endereço para finalizar seu pedido"
      v-model="enderecoId"
      @change="calcularFrete"
      :disabled="carrinho.itemVendas.length === 0"
    />
    <v-row v-show="enderecoId > 0">  
      <v-col cols="12" md="6">
        Frete: {{ valorFrete }}
      </v-col>
      <v-col cols="12" md="6">
        Total do pedido: {{ totalPedido }}
      </v-col>
    </v-row>
    <br>
    <h5>Escolha o tipo de pagamento</h5>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          :items="tiposPagamento"
          label="Pagamento"
          clearable
          item-text="nome"
          item-value="id"
          no-data-text="Selecione o tipo de pagamento que ira realizar"
          v-model="tipoPagamentoId"
          :disabled="carrinho.itemVendas.length === 0"
        />
      </v-col>
      <v-col cols="12" md="6" v-show="tipoPagamentoId === 1">
        <v-text-field
          label="Troco"
          name="nome"
          placeholder="Precisa de troco?"
          type="text"
          color="black"
          v-model="troco"
        />
      </v-col>
    </v-row>
    <div class="text-right">
      <v-btn color="primary" :disabled="enderecoId === 0 || tipoPagamentoId === null || carrinho.itemVendas.length === 0" @click="realizarPedido">Finalizar Pedido</v-btn>
    </div>
    <br>
  </div>
</template>

<script>
import services from '@/components/services.js';
import Utils from '@/utils/Utils.js';

export default {
  data: () => ({
    carrinho: {},
    enderecos: [],
    enderecoId: 0,
    frete: 0,
    tipoPagamentoId: null,
    tiposPagamento: [
      { id: 0, nome: 'Cartão de crédito/débito' },
      { id: 1, nome: 'Dinheiro'}
    ],
    troco: null,
    valorFrete: '',
    totalPedido: ''
  }),
  mounted () {
    this.obterCarrinho();
    this.obterEnderecos();
  },
  methods: {
    async obterCarrinho() {
      await this.$store.dispatch('atualizarCarrinho');
      this.carrinho = this.$store.state.carrinhoCompras;
    },
    obterValorTotal(item) {
      const valorTotal = "R$ " + eval(`${item.produto.preco}*${item.quantidade}`);
      return valorTotal.replace(".", ",");
    },
    async obterEnderecos() {
      await services.getEnderecos().then(({data}) => {
        this.enderecos = data;
      });
    },
    async calcularFrete() {
      if (this.enderecoId > 0) {
        await services.calcularFrete().then(async () => {
          await this.obterCarrinho();
          this.valorFrete = `R$ ${this.carrinho.precoFrete}`.replace('.', ',');
          this.totalPedido = `R$ ${this.carrinho.precoFinal}`.replace('.', ',');
        })
      }
    },
    async realizarPedido() {
      if (this.enderecoId === 0) {
        Utils.mensagemErro("Escolha um endereço para finalizar o pedido, caso não tenha cadastrado acesse o menu 'Minha Conta' e cadastre seu endereço.");
      } else if (this.tipoPagamentoId === null || this.tipoPagamentoId === undefined) {
        Utils.mensagemErro("Escolha o tipo de pagamento");
      } else {
        var pedido = {
          troco: this.troco,
          tipoPagamento: this.tipoPagamentoId,
          enderecoId: this.enderecoId
        };

        await services.realizarPedido(pedido).then(async () => {          
          Utils.mensagemSucesso("Pedido realizado com sucesso!");
          await this.obterCarrinho();
          this.enderecoId = 0;
          this.tipoPagamentoId = null;
        }).catch(error => {
          Utils.mensagemErro(error.response.data);
        })
      }
    },
    async removerItem(item) {
      Utils.confirmar(
        'Deseja realmente remover o item do carrinho?',
      ).then(async (result) => {
        if (result.isConfirmed) {
          await services.removerItem(item).then(async () => {
            Utils.mensagemSucesso("Item removido com sucesso do carrinho.");
            await this.obterCarrinho();
          }).catch(error => {
            Utils.mensagemErro(error.response.data);
          });
        }
      });
      
    }
  }
}
</script>