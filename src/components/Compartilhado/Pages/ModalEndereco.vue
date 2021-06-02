<template>
  <v-row justify="end">
    <v-col cols="auto">
      <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" :disabled="podeAdicionar">Adicionar</v-btn>
        </template>
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Endereço</v-toolbar>
            <br>
            <v-card-text>
              <v-form
                ref="formEndereco"
                v-model="formValido"
                lazy-validation
              >
                <v-text-field
                  label="Cep"
                  name="cep"
                  prepend-icon="mdi-google-maps"
                  type="text"
                  color="black"
                  v-mask="['##.###-###']"
                  :rules="validate.cep"
                  v-model="endereco.cep"
                  @keyup="preencherCep"
                />
                <v-text-field
                  label="Descrição"
                  name="nome"
                  type="text"
                  color="black"
                  placeholder="Ex.: Casa, Trabalho, etc."
                  :rules="validate.nome"
                  v-model="endereco.nome"
                />                
                <v-text-field
                  label="Logradouro"
                  name="logradouro"
                  type="text"
                  color="black"
                  :rules="validate.logradouro"
                  v-model="endereco.logradouro"
                />
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      label="UF"
                      name="estado"
                      type="text"
                      color="black"
                      :rules="validate.estado"
                      v-model="endereco.estado"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      label="Cidade"
                      name="cidade"
                      type="text"
                      color="black"
                      :rules="validate.cidade"
                      v-model="endereco.cidade"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      label="Bairro"
                      name="bairro"
                      type="text"
                      color="black"
                      :rules="validate.bairro"
                      v-model="endereco.bairro"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      label="Complemento"
                      name="complemento"
                      type="text"
                      color="black"
                      placeholder="Ex.: Próximo ao supermercado tal..."
                      :rules="validate.complemento"
                      v-model="endereco.complemento"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      label="Número"
                      name="numero"
                      type="text"
                      color="black"
                      :rules="validate.numero"
                      v-model="endereco.numero"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text :loading="ocupado" @click="fecharDialog">Fechar</v-btn>
              <v-btn color="primary" :loading="ocupado" dark @click="salvarEndereco">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import Utils from '@/utils/Utils.js';
import services from '@/components/services.js';

export default {
  props: {
    endereco: Object,
    limparObjeto: Function
  },
  data: () => ({
    dialog: false,
    formValido: true,
    ocupado: false,
    validate: {
      nome: [
        v => !!v || 'Descrição é obrigatório.',
        v => (v && (v.length >= 3 && v.length <= 15)) || 'Categoria deve ter entre 3 e 15 caracteres.'
      ],
      cep: [
        v => !!v || 'Cep é obrigatório'
      ],
      logradouro: [
        v => !!v || 'Logradouro é obrigatório.',
        v => (v && (v.length >= 5 && v.length <= 100)) || 'Logradouro deve ter entre 5 e 100 caracteres.'
      ],
      estado: [
        v => !!v || 'UF é obrigatório.',
        v => (v && (v.length == 2)) || 'UF deve ter 2 caracteres.'
      ],
      cidade: [
        v => !!v || 'Cidade é obrigatório.',
        v => (v && (v.length >= 5 && v.length <= 100)) || 'Cidade deve ter entre 5 e 100 caracteres.'
      ],
      bairro: [
        v => !!v || 'Bairro é obrigatório.',
        v => (v && (v.length >= 5 && v.length <= 100)) || 'Bairro deve ter entre 5 e 100 caracteres.'
      ],
      complemento: [
        v => (v && (v.length >= 5 && v.length <= 100)) || 'Complemento deve ter entre 5 e 100 caracteres.'
      ],
      numero: [
        v => (v && (v.length >= 1 && v.length <= 10)) || 'Número deve ter entre 1 e 10 caracteres.'
      ],
    },
    podeAdicionar: false,
  }),
  methods: {
    async salvarEndereco() {
      var validacao = this.$refs.formEndereco.validate();
      if (!validacao) return;
      this.ocupado = true;
      
      if (this.endereco.id > 0) {
        await services.atualizarEndereco(this.endereco).then(() => {
          Utils.mensagemSucesso("Endereço salvo com sucesso!");
          this.fecharDialog();
        }).catch(error => {
          Utils.mensagemErro(error.response.data);
        });
      } else {
        await services.adicionarEndereco(this.endereco).then(() => {
          Utils.mensagemSucesso("Endereço salvo com sucesso!");
          this.fecharDialog();
        }).catch(error => {
          Utils.mensagemErro(error.response.data);
        });
      }

      this.ocupado = false;
    },
    abrirDialog() {
      this.dialog = true;
    },
    fecharDialog() {
      this.limparObjeto();
      this.dialog = false;
    },
    async preencherCep() {
      if (this.endereco.cep.length === 10) {
        await services.buscaCep(this.endereco.cep).then((data) => {
          this.endereco.logradouro = data.logradouro;
          this.endereco.complemento = data.complemento;
          this.endereco.bairro = data.bairro;
          this.endereco.cidade = data.localidade;
          this.endereco.estado = data.uf;
        }).catch(() => {
          Utils.mensagemErro('Favor verificar o número do cep, endereço não encontrado.');
        });
      }
    }
  },
  mounted() {
    this.podeAdicionar = this.$store.state.pessoa.enderecos.length > 4;
  }
}
</script>