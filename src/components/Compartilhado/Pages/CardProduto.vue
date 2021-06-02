<template>
  <v-card
    class="mx-auto my-12"
    max-width="250"
  >
    <v-card-actions class="justify-end" v-if="administrador">
      <div>
        <v-btn
          class="mx-1"
          fab
          dark
          small
          color="primary"
          @click="editarProduto(produto)"
        >
          <v-icon
            small
          >
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-1"
          fab
          dark
          small
          color="red"
          @click="removerProduto(produto)"
        >
          <v-icon
            small
          >
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </v-card-actions>

    <v-img
      width="100"
      height="100"
      :src="`https://localhost:44314/api/imagem/${produto.imagem}`"
    ></v-img>

    <v-card-title>{{ produto.nome }}</v-card-title>

    <v-card-text>
      <div>
        {{ produto.descricao }} <br><br>
        Quantidade disponível: {{ produto.quantidadeEstoque }}
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <div>{{ preco }}</div>
    </v-card-actions>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions class="justify-end">
      <v-text-field 
        v-model="quantidade" 
        type="number" 
        readonly
        label="Quantidade" 
        append-outer-icon="add" 
        @click:append-outer="increment"
        prepend-icon="remove" 
        @click:prepend="decrement"
        @keydown="$event.key === '-' ? $event.preventDefault() : null"
      />
      <v-btn
        color="green"
        dark
        @click="adicionarProdutoCarrinho"
      >
        Comprar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import services from '@/components/services.js';
import Utils from '@/utils/Utils.js';

export default {
  props: {
    produto: Object,
    removerProduto: Function,
    editarProduto: Function
  },
  methods: {
    increment () {
      if (this.quantidade < this.produto.quantidadeEstoque)
        this.quantidade = parseInt(this.quantidade,10) + 1
    },
    decrement () {
      if (this.quantidade == 0) return;
      this.quantidade = parseInt(this.quantidade,10) - 1
    },
    async adicionarProdutoCarrinho() {
      if (this.quantidade === 0) {
        Utils.mensagemErro("É necessário colocar uma quantidade maior que 0 para adicionar o produto ao carrinho.");
      } else {
        await services.adicionarProdutoCarrinho(this.produto.id, this.quantidade).then(() => {
          Utils.mensagemSucesso("Produto adicionado ao carrinho.");
          this.$store.dispatch('atualizarCarrinho');
        }).catch(error => {
          Utils.mensagemErro(error.response.data);
        });
      }
    }
  },
  data: () => ({     
    quantidade: 0,
    preco: '',
    administrador: false
  }),
  mounted () {
    this.preco = `R$ ${this.produto.preco}`.replace('.', ',');
    this.administrador = this.$store.state.usuario.tipoUsuario === 0;
  }
}
</script>