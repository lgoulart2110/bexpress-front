<template>
  <div class="elevation-2 px-2">
    <h1 class="display-1">Relatórios</h1>
    <br>
    <h5>Selecione o período e o tipo do relatório para emitir</h5>
    <v-form
      ref="formRelatorio"
      v-model="formValido"
      lazy-validation
    >
      <v-row>
        <v-col cols="12">
          <v-select
            :items="tipos"
            label="Tipo"
            prepend-icon="mdi-tag"
            item-text="nome"
            item-value="id"
            :rules="validacoes.tipo"
            v-model="relatorio.tipo"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Período inicial"
            prepend-icon="calendar_today"
            type="text"
            color="black"
            v-mask="'##/##/####'"
            :rules="validacoes.dataInicio"
            v-model="relatorio.dataInicio"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Período final"
            prepend-icon="calendar_today"
            type="text"
            color="black"
            v-mask="'##/##/####'"
            :rules="validacoes.dataFim"
            v-model="relatorio.dataFim"
          />
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-btn class="mb-2 mr-3" color="primary" :loading="ocupado" dark @click="imprimir">Imprimir</v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import Utils from '@/utils/Utils.js';
import service from '@/components/services.js';

export default {
  data: () => ({
    tipos: [
      { id: 1, nome: 'Relatório de pedidos geral' },
      { id: 2, nome: 'Relatório de pedidos finalizados' },
      { id: 3, nome: 'Relatório de pedidos cancelados' }
    ],
    relatorio: {},
    validacoes: {
      tipo: [
        v => !!v || 'Selecione qual relatório deseja emitir.',
      ],
      dataInicio: [
        v => !!v || 'Período inicial é obrigatório.',
      ],
      dataFim: [
        v => !!v || 'Período final é obrigatório.',
      ]
    },
    ocupado: false,
    formValido: true
  }),
  methods: {
    async imprimir() {
      var validacao = this.$refs.formRelatorio.validate();
      if (!validacao) return;
      this.ocupado = true;

      try {
        await service.imprimir(this.relatorio).then((response) => {
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'relatorio.pdf');
          document.body.appendChild(link);
          link.click();
        })
      } catch (error) {
        Utils.mensagemErro(error);
      }

      this.ocupado = false;
    }
  }
}
</script>