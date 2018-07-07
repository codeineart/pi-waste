<template>
  <v-app column>
    <!-- NAVBAR -->
    <NavBar></NavBar>

    <general-header src='/static/img/bg/struct_org.jpg'>
      Estructura <br> Organizacional
    </general-header>
    <!-- CONTENT -->
    <v-layout class="content-block" row wrap>
      <!-- COLUMNAS -->
      <v-layout column>
        <!-- TITULO -->
        <v-flex class="xs12">
          <h1 class="intro-title">Nuestra estructura</h1>
          <p class="intro-text">Nuestra empresa está compuesta por distintas areas que se comunican entre sí para una mayor efectividad en los procesos de trabajo, éstas areas son las siguientes.
          </p>
        </v-flex>
        <!-- PERFILES -->
        <v-flex class="intro-text block" xs12="" v-for="">
          <v-layout justify-center="" v-for="row in maxRow" :key="row">
            <v-flex xs4 v-for="(person, index) in organization[row]" :key="index">
              <div class="element-circle" :style="{backgroundImage: 'url(' + person.meta.avatar_url + ')'}"></div>
              <h1 class="gerencia-title">{{ person.meta.content }}</h1>
              <h3 class="gerencia-title--sub">{{ person.meta.title }}</h3>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>

    <!-- SPACER -->
    <div class="spacer--180"></div>

    <!-- FOOTER -->
    <general-footer></general-footer>

  </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from '@/component/navbar';
import GeneralHeader from '@/component/header';
import GeneralFooter from '@/component/footer';
import { service, endpoints } from '@/services/general_service';
import _ from 'lodash'

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
    organization: '',
    maxRow: 0
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {},
  computed: {},
  mounted () {
    setTimeout(() => {
      let navEl = document.getElementById('nav-info')
      navEl.classList.add('active')
    }, 400)
  },
  created () {
    service()
      .get(endpoints.organization.getAll)
      .then(res => {
        this.organization = []
        this.maxRow = _.maxBy(res.data.info, o =>  o.meta.row).meta.row
        _.forEach(_.groupBy(res.data.info, 'meta.row'), (group, index) => {
          group = _.sortBy(group, (info) => {
            return info.meta.col
          })
          this.organization[parseInt(index)] = group
        })
      })
  },
  methods: {}
};
</script>

<style scoped lang="scss">

  @import '@/assets/style.scss';

  /*
  $gray-color: #1c212e; // 15%
  $gray-color--30: #3a455f; // 30%
  $gray-color--45: #57678e; // 45%
  $gray-color--60: #818eb1; // 60%
  $orange-color: #e65c00; // 50%
  $orange-color--75: #edb191; // 75%
  */

  .element-circle {
    background-size: cover;
    background-position: center;
  }
</style>
