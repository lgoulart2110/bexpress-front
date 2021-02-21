<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card elevation="12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <FormLogin :changeFunction="changeCadastro" />
                </v-window-item>
                <v-window-item :value="2">
                  <FormCadastro :changeFunction="changeLogin" />
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import FormLogin from './Pages/FormLogin.vue';
import FormCadastro from './Pages/FormCadastro.vue';

export default {
  components: {
    FormLogin,
    FormCadastro
  },
  data: () => ({
    step: 1
  }),
  methods: {
    changeCadastro() {
      this.step++;
    },
    changeLogin() {
      this.step--;
    }
  }
}
</script>