<template>
  <v-row justify="end">
    <v-col cols="auto">
      <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on">Adicionar</v-btn>
        </template>
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Categoria</v-toolbar>
            <br>
            <v-card-text>
              <v-form
                ref="formCategoria"
                v-model="formValido"
                lazy-validation
              >
                <v-text-field
                  label="Categoria"
                  name="nome"
                  prepend-icon="mdi-tag"
                  type="text"
                  color="black"
                  :rules="rulesCategoria"
                  v-model="categoria.nome"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text :loading="ocupado" @click="fecharDialog">Fechar</v-btn>
              <v-btn color="primary" :loading="ocupado" dark @click="salvarCategoria">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Utils from '@/utils/Utils.js';

export default {
  props: {
    categoria: Object,
    limparObjeto: Function
  },
  data: () => ({
    dialog: false,
    formValido: true,
    ocupado: false,
    rulesCategoria: [
      v => !!v || 'Nome da categoria é obrigatório.',
      v => (v && (v.length >= 3 && v.length <= 15)) || 'Categoria deve ter entre 3 e 15 caracteres.'
    ]
  }),
  methods: {
    async salvarCategoria() {
      var validacao = this.$refs.formCategoria.validate();
      if (!validacao) return;
      this.ocupado = true;
      
      try {
        const action = this.categoria.id > 0 ? 'atualizarCategoria' : 'cadastrarCategoria';
        await this.$store.dispatch(action, this.categoria);
        this.fecharDialog();
      } catch (error) {
        Utils.mensagemErro(error);
      }

      this.ocupado = false;
    },
    abrirDialog() {
      this.dialog = true;
    },
    fecharDialog() {
      this.limparObjeto();
      this.dialog = false;
    }
  }
}
</script>