<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="paginas"
              class="my-4"
              :length="totalPaginas"
              @input="mudarPagina"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    pagina: Number,
    totalPaginas: Number,
    mudarPagina: Function
  },
  data: () => ({
    paginas: 1
  }),
  methods: {
    next() {
      this.mudarPagina(this.paginas);
    }
  },
  mounted () {
    this.paginas = this.pagina;
  }
}
</script>