<template>
  <div v-resize="changeResize">
    <NavigationDrawer :drawer="drawer" :funcaoNavegar="changeNavegacao" />
    <AppBar :funcaoNavegar="changeNavegacao" />
    
    <v-container fluid>
      <transition>
        <router-view></router-view>
      </transition>
    </v-container>

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