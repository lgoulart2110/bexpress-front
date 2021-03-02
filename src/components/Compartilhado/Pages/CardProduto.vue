<template>
  <v-card
    class="mx-auto my-12"
    max-width="250"
  >
    <v-card-actions class="justify-end">
      <div>{{ preco }}</div>
    </v-card-actions>

    <v-img
      height="160"
      :src="`https://localhost:44314/api/imagem/${produto.imagem}`"
    ></v-img>

    <v-card-title>{{ produto.nome }}</v-card-title>

    <v-card-text>
      <div>{{ produto.descricao }}</div>
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
      >
        Comprar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    produto: Object
  },
  methods: {
    increment () {
      this.quantidade = parseInt(this.quantidade,10) + 1
    },
    decrement () {
      if (this.quantidade == 0) return;
      this.quantidade = parseInt(this.quantidade,10) - 1
    }
  },
  data: () => ({     
    quantidade: 0,
    preco: ''
  }),
  mounted () {
    this.preco = `R$ ${this.produto.preco}`.replace('.', ',');
  }
}
</script>