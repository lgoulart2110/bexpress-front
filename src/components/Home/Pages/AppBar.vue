<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="funcaoNavegar" class="d-md-none"></v-app-bar-nav-icon>
    <v-toolbar-title>Bebida Express</v-toolbar-title>
    <v-spacer />
    <v-btn
      class="ma-2"
      outlined
      fab
      color="green"
      elevation="6"
      to="carrinho"
    >
      <v-badge
        :content="$store.state.quantidadeItems"
        :value="$store.state.quantidadeItems"
        color="red"
        overlap
      >
        <v-icon large>
          mdi-cart
        </v-icon>
      </v-badge>
    </v-btn>
    
  </v-app-bar>
</template>

<script>
export default {
  props: {
    funcaoNavegar: Function
  }
}
</script>