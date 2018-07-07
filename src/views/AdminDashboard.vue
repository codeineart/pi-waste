<template>
  <v-app id="inspire">

    <!-- Drawer Tool Panel -->
    <v-navigation-drawer v-model="drawer" fixed app>

      <v-list dense>

        <!-- Tittle -->
        <v-subheader class="mt-3 grey--text text--darken-1" v-if="modules.length !== 1">{{ modules.length }} Módulos disponibles</v-subheader>
        <v-subheader class="mt-3 grey--text text--darken-1" v-else>1 Módulo disponible</v-subheader>

        <!-- AVAILABLE MODULES -->
        <v-list-tile v-for="module in modules" v-bind:key="module.id" @click="selectedModule = module.component">

          <v-list-tile-action>
            <v-icon style="color: rgba(0,0,0,.87)">{{ module.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-title class="text--darken-1">
            {{ module.name }}
          </v-list-tile-title>

        </v-list-tile>

        <!-- LOGOUT BUTTON -->
        <v-list-tile @click="$router.push('/home')">
          <v-list-tile-action>
            <v-icon color="darken-1" style="color: rgba(0,0,0,.87)">reply</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">
            Ir a intranet
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push('/login?redirect=logout')">
          <v-list-tile-action>
            <v-icon color="darken-1" style="color: rgba(0,0,0,.87)">power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">
            Cerrar sesión
          </v-list-tile-title>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <!-- Header -->
    <v-toolbar color="orange" app>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Panel de administrador</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
    </v-toolbar>

    <!-- Modules panel -->
    <v-content>
      <v-container fill-height>
        <v-layout justify-left>
          <v-flex>
            <transition name="fade" mode="out-in">
              <component :is="selectedModule"></component>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default {
  data: () => ({
    selectedModule: null,
    drawer: true,
  }),
  computed: {
    // returns array of modules
    modules() {
      let modules = this.$store.getters.getModules;
      return modules.map(module => module);
    },
  },
  watch: {},
  props: {},
  methods: {
    gohome() {
      console.log('Hi');
      this.$router.go(-1);
    },
    // mount modules in store for retrieving
    mountModules() {
      this.$store.dispatch('loadModules').then(message => {
        console.info(message);
      });
    },
  },
  created() {
    this.mountModules();
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
button {
  padding: 0;
}
</style>
