<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card-text class="mt-6">
        <div class="text-center mt-4">
          <v-img src="@/assets/logo.png" width="200" style="display: inline-block;"></v-img>
        </div>
        <h4 class="text-center mt-4">Insira seu e-mail e senha</h4>
        <v-form
          ref="formLogin"
          v-model="formValido"
          lazy-validation
        >
          <v-text-field
            label="E-mail"
            name="login"
            prepend-icon="email"
            type="text"
            color="black"
            :rules="validacoes.login"
            v-model="loginDto.login"
          />
          <v-text-field
            label="Senha"
            name="senha"
            prepend-icon="lock"            
            :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'"
            :type="mostrar ? 'text' : 'password'"
            @click:append="mostrar = !mostrar"
            color="black"            
            :rules="validacoes.senha"
            v-model="loginDto.senha"
          />
        </v-form>
      </v-card-text>
      <div class="text-center mt-3 mb-3">
        <v-btn color="black" dark :loading="ocupado" @click="realizarLogin">Entrar</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="4" class="black">
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">Olá amigo!</h1>
        <h5
          class="text-center"
        >Entre com suas credenciais de acesso ou cadastre-se, é rápido e fácil!</h5>
      </v-card-text>
      <div class="text-center mb-3">
        <v-btn outlined dark @click="changeFunction" :loading="ocupado">Cadastar</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import Utils from '@/utils/Utils.js';

export default {
  props: {
    changeFunction: Function
  },
  data: () => ({
    mostrar: false,
    formValido: true,
    ocupado: false,
    loginDto: {},
    validacoes: {
      login: [
        v => !!v || 'E-mail é obrigatório.',
        v => (v && /.+@.+\..+/.test(v)) || 'Informe um e-mail válido.'
      ],
      senha: [
        v => !!v || 'Senha é obrigatório.',
        v => (v && v.length >= 6 && v.length <= 15) || 'A senha deve ter entre 6 e 15 caracteres.'
      ]
    }
  }),
  methods: {
    async realizarLogin() {
      var validacao = this.$refs.formLogin.validate();
      if (!validacao) return;
      this.ocupado = true;
      
      try {
        await this.$store.dispatch('realizarLogin', this.loginDto);
        this.$router.push('propaganda');
      } catch (error) {
        Utils.mensagemErro(error);
      }

      this.ocupado = false;
    }
  }
}
</script>