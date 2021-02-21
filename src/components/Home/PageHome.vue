<template>
  <div v-resize="changeResize">
    <NavigationDrawer :drawer="drawer" :funcaoNavegar="changeNavegacao" />
    <AppBar :funcaoNavegar="changeNavegacao" />
    

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
    </v-footer>
  </div>
</template>
<script>
import NavigationDrawer from './Pages/NavigationDrawer.vue';
import AppBar from './Pages/AppBar.vue';

export default {
  components: {
    NavigationDrawer,
    AppBar
  },
  data: () => ({
    drawer: true,
  }),
  mounted() {
    this.changeResize();
  },
  methods: {
    changeNavegacao() {
      this.drawer = !this.drawer;
    },
    changeResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth > 960) this.drawer = true;
    }
  }
}
</script>