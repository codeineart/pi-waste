<template>
  <v-app>

    <div v-if="xsView || smView">
      <v-navigation-drawer class="nav" v-model="drawer" fixed>
        <!-- DRAWER USER AREA -->
        <v-layout row align-center class="nav-item nav-item--grey nav__user">

          <v-flex xs2 style="text-align:center;align-self:start;">
            <v-icon class="nav__user icon">fas fa-user</v-icon>
          </v-flex>

          <v-flex xs8 v-if="true" style="align-self:end;text-align:center;">
            <span style="display:block;color:orange;"> GUILLERMO DEL TORO </span>
            <span style="display:block;">Lorem Ipsum</span>
          </v-flex>

          <v-flex xs8 v-else style="align-self:center;text-align:center;" xs-4>
            <span style="display:block;color:orange;"> INGRESAR </span>
          </v-flex>

          <v-flex xs2 style="text-align:center;" @click.stop="drawer = !drawer">
            <v-icon style="color:white;display:inline;">fas fa-angle-left</v-icon>
          </v-flex>

        </v-layout>

        <!-- NAVIGATION MENU AREA -->
        <ul>
          <li class="nav-item">
            <a href="#">INICIO</a>
          </li>
          <li class="nav-item">
            <a href="#">INFORMACION</a>
          </li>
          <li class="nav-item">
            <a href="#">SOLICITUDES</a>
          </li>
          <li class="nav-item" @click="openDropdown($event, 'dropdown-proyectos')">
            <a href="#">PROYECTOS</a>
            <v-icon v-show="isActive" style="float:right;color:white;">fas fa-caret-up</v-icon>
            <v-icon v-show="!isActive" style="float:right;color:white;">fas fa-caret-down</v-icon>
          </li>
          <div class="dropdown" dropdown-proyectos>
            <li class="nav-item">
              <a>ITEM1</a>
            </li>
            <li class="nav-item">
              <a>ITEM2</a>
            </li>
            <li class="nav-item">
              <a>ITEM3</a>
            </li>
          </div>
          <li class="nav-item">
            <a href="#">VIDEOS</a>
          </li>

          <li class="nav-item" @click="openDropdown($event, 'dropdown-gerencias')">
            <span>GERENCIAS</span>
            <v-icon v-show="isActive" style="float:right;color:white;">fas fa-caret-up</v-icon>
            <v-icon v-show="!isActive" style="float:right;color:white;">fas fa-caret-down</v-icon>
          </li>

          <div class="dropdown" dropdown-gerencias>
            <li class="nav-item">
              <a>ITEM1</a>
            </li>
            <li class="nav-item">
              <a>ITEM2</a>
            </li>
            <li class="nav-item">
              <a>ITEM3</a>
            </li>
            <li class="nav-item">
              <a>ITEM4</a>
            </li>
          </div>

          <li class="nav-item" @click="openDropdown($event, 'dropdown-soporte')">
            <a href="#">SOPORTE</a>
            <v-icon v-show="isActive" style="float:right;color:white;">fas fa-caret-up</v-icon>
            <v-icon v-show="!isActive" style="float:right;color:white;">fas fa-caret-down</v-icon>
          </li>

          <div class="dropdown" dropdown-soporte>
            <li class="nav-item">
              <a>ITEM1</a>
            </li>
            <li class="nav-item">
              <a>ITEM2</a>
            </li>
            <li class="nav-item">
              <a>ITEM3</a>
            </li>
          </div>
        </ul>
      </v-navigation-drawer>

      <!-- TOOLBAR HEADER -->
      <v-toolbar class="nav-bar--white elevation-0" fixed>
        <v-spacer></v-spacer>
        <div style="height:100%;">
          <a class="navbar-brand" href="#">
            <img style="height:90%;" src="http://www.mpm.cl/wp-content/uploads/2018/01/newmpm.png" alt="">
          </a>
        </div>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar>
    </div>

    <!-- DESKTOP NAVBAR -->
    <NavBar v-if="!xsView && !smView"></NavBar>

    <v-flex xs12 class="bg-header">
      <v-flex xs12 class="bisel">
      </v-flex>
    </v-flex>

    <!-- MAIN CONTENT AREA -->
    <v-container pa-0 class="main-content">

      <!-- ESPACIADOR -->
      <v-layout class="spacer"></v-layout>

      <!-- MAIN LAYOUT -->
      <v-layout row wrap class="padding-content" v-show-animation="">

        <!-- ROW 1 -->
        <v-layout row wrap class="board__layout">

          <!-- NOTICIAS -->
          <v-flex md6 relative style="padding-right: 5px;" v-show-animation="">
            <div class="title--noticias" absolute>Noticias</div>
            <News v-if="home.news" :news="home.news"></News>
          </v-flex>

          <!-- MISION - VISION -->
          <v-flex md6 style="padding-left: 5px;cursor:pointer;" v-show-animation="">
            <MisionVision v-if="home.missionVision" :mision="home.mision[0].meta.content" :vision="home.vision[0].meta.content"></MisionVision>
          </v-flex>

        </v-layout>

        <!-- ROW 2 -->
        <v-layout class="board__layout" style="padding-top: 0;" v-show-animation="">

          <!-- PROYECTOS -->
          <v-flex md12>
            <Proyectos v-if="home.projects" :projects="home.projects"></Proyectos>
          </v-flex>

        </v-layout>

        <!-- ROW 3 -->
        <v-layout row wrap class="board__layout--white">

          <!-- EVENTOS -->
          <v-flex xs12 md4 class="" v-show-animation="">
            <Eventos :events="home.events" style="border-left: solid black 1px;border-right: solid black 1px;"></Eventos>
          </v-flex>

          <!-- NACIMIENTOS -->
          <v-flex style="z-index:50;" xs12 md4 class="" v-show-animation="">
            <Nacimientos v-if="dataFetchedOk" :events="home.birthday"></Nacimientos>
          </v-flex>

          <!-- AGENDA -->
          <v-flex xs12 md4 class="" v-show-animation="">
            <Agenda :directory="home.phoneDirectory" style="border-left: solid black 1px;border-right: solid black 1px;"></Agenda>
          </v-flex>

          <!-- ESTRUCTURA ORGANIZACIONAL -->
          <v-flex xs12 md8 style="padding: 0" v-show-animation="">
            <slideFotosEstructura v-if="home.videos" :structure="home.organizationChart" :gallery="home.videos" style="max-height: 325px"></slideFotosEstructura>
          </v-flex>

          <v-flex md4 v-show-animation="">
            <listadoLinks :comite="home.peerCommittee"></listadoLinks>
          </v-flex>

        </v-layout>

      </v-layout>

      <!-- ESPACIADOR -->
      <v-layout style="height: 80px"></v-layout>

      <GeneralFooter></GeneralFooter>

    </v-container>
  </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from '../component/navbar';
import News from '../component/news';
import MisionVision from '../component/mision-vision';
import Proyectos from '../component/proyectos';
import Eventos from '../component/eventos';
import Nacimientos from '../component/nacimientos';
import Agenda from '../component/agenda';
import GeneralFooter from '../component/footer';
import slideFotosEstructura from '../component/slide-fotos-estructura';
import listadoLinks from '../component/listado-links';
import { service, endpoints } from '@/services/general_service';

Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
    home: {},
    vision: String,
    dataFetchedOk: false,
  }),
  props: {},
  components: {
    NavBar,
    News,
    MisionVision,
    Proyectos,
    Eventos,
    Nacimientos,
    Agenda,
    GeneralFooter,
    slideFotosEstructura,
    listadoLinks,
  },
  watch: {},
  computed: {
    displayBreakpoint() {
      return this.$vuetify.breakpoint.name;
    },
    xsView() {
      return this.$vuetify.breakpoint.name != 'xs' ? false : true;
    },
    smView() {
      return this.$vuetify.breakpoint.name != 'sm' ? false : true;
    },
    mdView() {
      return this.$vuetify.breakpoint.name != 'md' ? false : true;
    },
    lgView() {
      return this.$vuetify.breakpoint.name != 'lg' ? false : true;
    },
    xlView() {
      return this.$vuetify.breakpoint.name != 'xl' ? false : true;
    },
  },
  created() {
    this.$root.$children[0].loading = true;
  },
  mounted() {
    service()
      .get(endpoints.home.get)
      .then(res => {
        this.home = res.data;
        setTimeout(() => {
          let navEl = document.getElementById('nav-inicio');
          navEl.classList.add('active');
          this.$root.$children[0].loading = false;
          this.dataFetchedOk = true;
        }, 500);
      });
  },
  methods: {
    openDropdown(e, whichDropdown) {
      let el = document.querySelector('.dropdown[' + whichDropdown + ']');
      let activeElements = document.querySelectorAll('.dropdown.active');
      el.classList.toggle('active');
      activeElements.forEach(elem => elem.classList.remove('active'));
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.padding-content {
  padding: 0 20px;
}

.nav-bar--white {
  background-color: white;
}

.nav {
  background-color: $gray-color;
  color: white;
}

.nav-item {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: $orange-color;
  padding-left: 30px;
  padding-right: 20px;
  & a {
    text-decoration: none;
    color: white;
  }
  &--grey {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0px;
    background-color: $gray-color;
    color: white;
  }
  &:hover {
    background-color: $gray-color;
    cursor: pointer;
  }
}

.nav__user {
  &.icon {
    color: white;
    display: inline;
    color: white;
    display: inline;
    font-size: xx-large;
    position: relative;
    left: 20px;
  }
}

.dropdown {
  // opacity: 0;
  overflow: hidden;
  transition-delay: 0s;
  transition: 0.25s all ease;
  height: 100%;
  position: relative;
  max-height: 0px;
  & li a {
    margin-left: 20px;
  }
  &.active {
    // opacity: 1;
    max-height: 1000px;
  }
}

.bg-header {
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 750px;
  background-image: url('/static/img/bg/home.jpg');
  background-size: cover;
  background-position: center;
}
.spacer {
  height: 300px;
}
.bisel {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
}

.spacer {
  position: relative;
}

.board__layout,
.board__layout--white {
  background-color: $orange-color;
  width: 100%;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  &--white {
    background-color: white;
    color: $gray-color;
    text-align: center;
    padding: 0;
    margin-top: 20px;
  }
}

.main-content {
  position: relative;
  max-width: 100%;
}

.footer {
  max-width: 100%;
  background-color: $gray-color;
  position: relative;
  margin-top: 100px;
  height: 200px;
}

.copyright {
  position: relative;
  bottom: 0px;
  height: 60px;
  background-color: $orange-color;
  width: 100%;
  text-align: center;
  align-self: end;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.title--noticias {
  // background-color: #e65c00;
  z-index: 99;
  top: 5%;
  left: 5%;
  font-weight: 500;
  font-size: 1.8rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
