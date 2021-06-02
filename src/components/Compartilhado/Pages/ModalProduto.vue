<template>
  <v-row justify="end">
    <v-col cols="auto">
      <v-btn color="primary" @click="abrirDialog">Adicionar</v-btn>
      <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Produto</v-toolbar>
            <br>
            <v-card-text>
              <v-form
                ref="formProduto"
                v-model="formValido"
                lazy-validation
              >
                <v-select
                  :items="categorias"
                  label="Categoria"
                  prepend-icon="mdi-tag"
                  clearable
                  item-text="nome"
                  item-value="id"
                  :rules="valida.categoria"
                  v-model="produto.categoriaId"
                />
                <v-text-field
                  label="Nome"
                  name="nome"
                  prepend-icon="mdi-beer"
                  type="text"
                  color="black"
                  :rules="valida.nome"
                  v-model="produto.nome"
                  counter="50"
                />
                <v-text-field
                  label="Descrição"
                  name="descricao"
                  prepend-icon="mdi-clipboard-edit"
                  type="text"
                  color="black"
                  :rules="valida.descricao"
                  v-model="produto.descricao"
                />
                <v-text-field
                  label="Preço"
                  name="preco"
                  prepend-icon="mdi-cash"
                  type="text"
                  color="black"
                  :rules="valida.preco"
                  v-model="produto.preco"
                  v-money="money"
                  @keydown="$event.key === '-' ? $event.preventDefault() : null"
                />
                <v-text-field
                  label="Quantidade em estoque"
                  name="quantidadeEstoque"
                  prepend-icon="mdi-clipboard-edit"
                  type="number"
                  color="black"
                  :rules="valida.quantidadeEstoque"
                  v-model="produto.quantidadeEstoque"
                />
                <v-file-input
                  v-if="mostraFoto"
                  small-chips
                  label="Imagem do produto"
                  v-model="produto.imagem"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text :loading="ocupado" @click="fecharDialog">Fechar</v-btn>
              <v-btn color="primary" :loading="ocupado" dark @click="salvarProduto">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Utils from '@/utils/Utils.js';
import service from '@/components/services.js';
import { VMoney } from 'v-money';

export default {
  props: {
    produto: Object,
    limparObjeto: Function,
    abrirDialog: Function,
    fecharDialog: Function,
    dialog: Boolean,
    mostraFoto: Boolean
  },
  data: () => ({
    money: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
      masked: false
    },
    categorias: [],
    categoria: {},
    formValido: true,
    ocupado: false,
    valida: {
      categoria: [
        v => !!v || 'Categoria é obrigatório.'
      ],
      nome: [
        v => !!v || 'Nome da bebida é obrigatório.',
        v => (v && v.length >= 3 && v.length <= 50) || 'Nome deve ter entre 3 e 50 caracteres.'
      ],
      descricao: [
        v => !v || (v && v.length >= 10 && v.length <= 300) || 'Descrição deve ter entre 10 e 300 caracteres.'
      ],
      preco: [
        v => !!v || 'Preço é obrigatório.',
        v => v && v != 'R$ 0,00' || 'O preço deve ser maior que R$ 0,00'
      ],
      quantidadeEstoque: [
        v => !!v || 'Quantidade em estoque é obrigatório.',
        v => v > 0 || 'Quantidade em estoque não pode ser menor ou igual a 0'
      ]
    },
  }),
  methods: {
    async salvarProduto() {
      var validacao = this.$refs.formProduto.validate();
      if (!validacao) return;
      this.ocupado = true;

      if (this.produto.id !== 0 && this.produto.id !== undefined) {
        await service.alterarProduto(this.produto).then(() => {
          Utils.mensagemSucesso("Produto alterado com sucesso!");
          this.fecharDialog();
        }).catch(error => {
          Utils.mensagemErro(error.response.data);
        });
      } else {
        await service.adicionarProduto(this.produto).then(() => {
          Utils.mensagemSucesso("Produto adicionado com sucesso!");
          this.fecharDialog();
        }).catch(error => {
          Utils.mensagemErro(error.response.data);
        });
      }

      this.ocupado = false;
    },
    async carregaCategorias() {
      await service.getCategorias().then(({data}) => {
        this.categorias = data;
      });
    }
  },
  mounted () {
    this.carregaCategorias();
  },
  directives: {money: VMoney}
}
</script>