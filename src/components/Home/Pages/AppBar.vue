<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="funcaoNavegar" class="d-md-none"></v-app-bar-nav-icon>
    <v-toolbar-title>Bebida Express</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    funcaoNavegar: Function
  }
}
</script>