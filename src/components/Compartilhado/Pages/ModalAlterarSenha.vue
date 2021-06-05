<template>
  <v-row justify="end">
    <v-col cols="auto">
      <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="300">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="warning" v-bind="attrs" v-on="on">Alterar senha</v-btn>
        </template>
        <template>
          <v-card>
            <v-toolbar color="primary" dark>Alterar senha</v-toolbar>
            <br>
            <v-card-text>
              <v-form
                ref="formAlterarSenha"
                v-model="formValido"
                lazy-validation
              >
                <v-text-field
                  label="Senha atual"
                  prepend-icon="lock"            
                  :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="mostrar ? 'text' : 'password'"
                  @click:append="mostrar = !mostrar"
                  color="black"            
                  :rules="validate.senha"
                  v-model="alterarSenhaDto.senhaAtual"
                />
                <v-text-field
                  label="Nova senha"
                  prepend-icon="lock"            
                  :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="mostrar ? 'text' : 'password'"
                  @click:append="mostrar = !mostrar"
                  color="black"            
                  :rules="validate.novaSenha"
                  v-model="alterarSenhaDto.novaSenha"
                />
                <v-text-field
                  label="Repita a nova senha"
                  prepend-icon="lock"            
                  :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="mostrar ? 'text' : 'password'"
                  @click:append="mostrar = !mostrar"
                  color="black"            
                  :rules="validate.novaSenha2"
                  v-model="alterarSenhaDto.novaSenhaRepetir"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text :loading="ocupado" @click="fecharDialog">Fechar</v-btn>
              <v-btn color="primary" :loading="ocupado" dark @click="alterarSenha">Alterar</v-btn>
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
  data: () => ({
    dialog: false,
    mostrar: false,
    formValido: true,
    ocupado: false,
    validate: {
      novaSenha: [
        v => !!v || 'Nova senha é obrigatório.',
        v => (v && v.length >= 6 && v.length <= 15) || 'A nova senha deve ter entre 6 e 15 caracteres.'
      ],
      novaSenha2: [
        v => !!v || 'Nova senha é obrigatório.',
        v => (v && v.length >= 6 && v.length <= 15) || 'A nova senha deve ter entre 6 e 15 caracteres.'
      ],
      senha: [
        v => !!v || 'Senha é obrigatório.',
        v => (v && v.length >= 6 && v.length <= 15) || 'A senha deve ter entre 6 e 15 caracteres.'
      ]
    },
    alterarSenhaDto: {}
  }),
  methods: {
    async alterarSenha() {
      var validacao = this.$refs.formAlterarSenha.validate();
      if (!validacao) return;
      this.ocupado = true;
      
      await services.alterarSenha(this.alterarSenhaDto).then(() => {
        Utils.mensagemSucesso("Senha alterada com sucesso!");
        this.fecharDialog();
      }).catch(error => {
        Utils.mensagemErro(error.response.data);
      });

      this.ocupado = false;
    },
    abrirDialog() {
      this.dialog = true;
    },
    fecharDialog() {
      this.alterarSenhaDto = {};
      this.dialog = false;
    }
  }
}
</script>