<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    class="elevation-6"
  >
    <div class="text-center mt-3">
      <v-img src="@/assets/logo.png" style="display: inline-block;" width="150" />
    </div>
    <v-list dense nav>
      <div v-if="ehAdministrador">
        <v-list-group
          v-for="item in itemsAdministrador"
          :key="item.title"
          v-model="selectedItem"
          :prepend-icon="item.action"
          no-action
          class="elevation-1 mb-3"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            @click="navegar(child.action)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
      <v-list-item-group
          v-model="selectedItem"
          color="green"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            class="elevation-1"
            @click="navegar(item.action)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
    </v-list>
    <template v-slot:append>
        <div class="pa-2">
          <v-btn block dark color="red" @click="sair">
            Sair
          </v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    ehAdministrador: false,
    selectedItem: 0,
    items: [
      { text: 'Produtos', icon: 'mdi-glass-cocktail', action: 'produtos' },
    ],
    itemsAdministrador: [
      {
        title: 'Administração',
        action: 'mdi-ticket',
        items: [
          { title: 'Categorias', action: 'categoria' },
          { title: 'Produtos', action: 'produtos' },
          { title: 'Usuários', action: 'usuarios' },
        ],
      }
    ]
  }),
  props: {
    drawer: Boolean,
    funcaoNavegar: Function
  },
  methods: {
    navegar(rota) {
      const windowWidth = window.innerWidth;
      if (windowWidth < 960) this.funcaoNavegar();
      this.$router.push(rota);
    },
    sair() {
      this.$store.dispatch('realizarLogout');
      this.$router.push({ name: 'Login' });
    }
  },
  mounted () {
    this.ehAdministrador = this.$store.state.usuario.tipoUsuario == 0;
  }
}
</script>