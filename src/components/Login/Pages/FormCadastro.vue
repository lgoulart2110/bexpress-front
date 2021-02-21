<template>
  <v-row class="fill-height">
    <v-col cols="12" md="4" class="black">
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">Seja bem vindo!</h1>
        <h5
          class="text-center"
        >Para acessar nossa plataforma, entre com suas informações pessoais.</h5>
      </v-card-text>
      <div class="text-center">
        <v-btn outlined dark @click="changeFunction" :loading="ocupado">Entrar</v-btn>
      </div>
    </v-col>

    <v-col cols="12" md="8">
      <v-card-text class="mt-12">
        <h1 class="text-center display-2">Criar Conta</h1>
        <v-form
          ref="formCadatro"
          v-model="formValido"
          lazy-validation
        >
          <v-text-field
            label="Nome"
            name="nome"
            prepend-icon="person"
            type="text"
            color="black"
            required
            :counter="150"
            :rules="validacoes.nome"
            v-model="usuarioDto.nome"
          />
          <v-text-field
            label="CPF"
            name="cpf"
            prepend-icon="badge"
            type="text"
            color="black"
            v-mask="'###.###.###-##'"
            :rules="validacoes.cpf"
            v-model="usuarioDto.cpf"
          />
          <v-text-field
            label="Data de Nascimento"
            name="dataNascimento"
            prepend-icon="calendar_today"
            type="text"
            color="black"
            v-mask="'##/##/####'"
            :rules="validacoes.dataNascimento"
            v-model="usuarioDto.dataNascimento"
          />
          <v-text-field
            label="Telefone"
            name="telefone"
            prepend-icon="phone"
            type="text"
            color="black"
            v-mask="['(##) ####-####', '(##) #####-####']"
            :rules="validacoes.telefone"
            v-model="usuarioDto.telefone"
          />

          <v-text-field
            label="Email"
            name="Email"
            prepend-icon="email"
            type="text"
            color="black"
            :rules="validacoes.email"
            v-model="usuarioDto.login"
          />
          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            :append-icon="mostrar ? 'mdi-eye' : 'mdi-eye-off'"
            :type="mostrar ? 'text' : 'password'"
            @click:append="mostrar = !mostrar"
            color="black"
            :rules="validacoes.senha"
            v-model="usuarioDto.senha"            
          />
        </v-form>
      </v-card-text>
      <div class="text-center mt-n5 mb-3">
        <v-btn color="black" dark :loading="ocupado" @click="cadastrar">Cadastrar</v-btn>
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
    usuarioDto: {},
    validacoes: {
      nome: [
        v => !!v || 'Nome é obrigatório.',
        v => (v && v.length <= 150) || 'Nome deve ter no máximo 150 caracteres.',
      ],
      cpf: [
        v => !!v || 'CPF é obrigatório.',
        v => (v && Utils.validaCpf(v)) || 'CPF inválido.'
      ],
      dataNascimento: [
        v => !!v || 'Data de nascimento é obrigatório.',
        v => (v && Utils.validaDataNascimento(v)) || 'Não é permitido cadastro de menores de 18 anos.'
      ],
      telefone: [
        v => !!v || 'Telefone é obrigatório.',
        v => (v && Utils.validaTelefone(v)) || 'Telefone inválido.'
      ],
      email: [
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
    validaForm() {
      return this.$refs.formCadatro.validate();
    },
    resetaForm() {
      this.$refs.formCadatro.reset();
    },
    async cadastrar() {
      var validacao = this.validaForm();
      if (!validacao) return;

      this.ocupado = true;

      try {
        var usuarioDto = {
          nome: this.usuarioDto.nome,
          cpf: this.usuarioDto.cpf,
          telefone: this.usuarioDto.telefone,
          dataNascimento: Utils.retornaData(this.usuarioDto.dataNascimento),
          login: this.usuarioDto.login,
          senha: this.usuarioDto.senha
        }
        await this.$store.dispatch('cadastrarUsuario', usuarioDto);
        this.resetaForm();
        this.changeFunction();
      } catch (error) {
        Utils.mensagemErro(error);
      }

      this.ocupado = false;
    }
  }
}
</script>