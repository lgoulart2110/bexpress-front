<template>
  <div class="elevation-2 px-2">
    <h1 class="display-1">Perfil</h1>
    <br>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          label="Nome"
          prepend-icon="person"
          type="text"
          color="black"
          v-model="pessoa.nome"
          readonly
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Telefone"
          prepend-icon="phone"
          type="text"
          color="black"
          v-model="pessoa.telefone"
          readonly
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :label="labelCpf"
          prepend-icon="badge"
          type="text"
          color="black"
          v-model="pessoa.cpfCnpj"
          readonly
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Data de Nascimento"
          prepend-icon="calendar_today"
          type="text"
          color="black"
          v-model="dataNascimento"
          readonly
        />
      </v-col>
    </v-row>
    <br>
    <Endereco />
    <br>
  </div>
</template>

<script>
import moment from 'moment';
import Endereco from './Endereco.vue';

export default {
  components: {
    Endereco
  },
  data: () => ({
    pessoa: {},
    labelCpf: '',
    dataNascimento: ''
  }),
  mounted () {
    this.pessoa = this.$store.state.pessoa;
    this.labelCpf = this.pessoa.cpfCnpj.length === 14 ? 'CPF' : 'CNPJ';
    this.dataNascimento = moment(this.pessoa.dataNascimento).format('DD/MM/yyyy');
  },
  methods: {
  }
}
</script>