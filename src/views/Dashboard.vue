<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>

        <v-subheader class="mt-3 grey--text text--darken-1">HERRAMIENTAS</v-subheader>

        <v-list-tile v-for="item in items" :key="item.text" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="() => { this.$router.push('/login?redirect=logout')}">
          <v-list-tile-action>
            <v-icon color="darken-1">power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="text--darken-1">
            Logout
          </v-list-tile-title>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="" app>

      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Simple Dashboard</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-layout row align-center style="max-width: 650px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout> -->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <v-container fill-height>
        <v-layout justify-left>
          <v-flex>
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <h1>Hello world</h1>
                  <router-view></router-view>
                </div>
              </div>
            </div>
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
    drawer: true,
    items: [{ icon: 'trending_up', text: 'Analytics' }, { icon: 'subscriptions', text: 'Videoteca' }, { icon: 'history', text: 'Historial' }, { icon: 'featured_play_list', text: 'Archivo' }],
    items2: [{ picture: 28, text: 'Joseph' }, { picture: 38, text: 'Apple' }, { picture: 48, text: 'Xbox Ahoy' }, { picture: 58, text: 'Nokia' }, { picture: 78, text: 'MKBHD' }],
  }),
  props: {
    source: String,
  },
};
</script>

<style scoped lang="scss">
button {
  padding: 0;
}

// Ensure you are using stylus-loader
// @import 'vuetify/src/stylus/main';

// Ensure you are using css-loader
</style>
