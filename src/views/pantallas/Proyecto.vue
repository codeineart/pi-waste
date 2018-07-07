<template>
  <v-app column class="proyecto__">
    <!-- NAVBAR -->
    <NavBar></NavBar>
    <!-- SPLASH SCREEN -->
    <header :style="{backgroundImage: 'url(' + (project.cover_img_url || imagePlaceholder) + ')'}">
      <h2>{{ project.contract }}</h2>
    </header>

    <v-layout class="content-block" row wrap>
      <v-flex xs6>
        <p>{{ project.description }}</p>
      </v-flex>
      <v-flex xs12>
        <div class="icons">
          <div class="icon-project">
            <img :src="icon.cliente" alt="">
            <h6>Cliente</h6>
          </div>
          <div class="icon-project">
            <img :src="icon.proyecto" alt="">
            <h6>Proyecto</h6>
          </div>
          <div class="icon-project">
            <img :src="icon.tiempo" alt="">
            <h6>Duración</h6>
          </div>
          <div class="icon-project">
            <img :src="icon.hh" alt="">
            <h6>HH</h6>
          </div>
        </div>
      </v-flex>
      <v-flex xs12>
        <div class="grid">
          <div class="grid-sizer"></div>
          <div class="grid-item" v-for="image in project.gal_img_url">
            <img :src="image" />
          </div>
        </div>
      </v-flex>
    </v-layout>

    <div class="spacer--180"></div>

    <general-footer></general-footer>

  </v-app>
</template>

<script>
/**
 * For some reason '/' alias doesn't work
 * Remember to use '@/*' or just '*'
 * Example:
 * import something from @/somefolder/someFile // OK
 * import something from someFolder/someFile   // OK
 * import something from /someFolder/someFile  // NOT OK, will cause error
 */
import Vue from 'vue';
import NavBar from '@/component/navbar';
import GeneralHeader from '@/component/header';
import GeneralFooter from '@/component/footer';
import header from 'static/img/header-proyecto.jpg';
import iconCliente from 'static/img/cliente.svg';
import iconHh from 'static/img/hh.svg';
import iconProyecto from 'static/img/project.svg';
import iconTiempo from 'static/img/time.svg';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import { service, endpoints } from '@/services/general_service.js';
import imagePlaceholder from 'static/img/placeholder-img.png';

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    header: header,
    imagePlaceholder: imagePlaceholder,
    icon: {
      cliente: iconCliente,
      hh: iconHh,
      proyecto: iconProyecto,
      tiempo: iconTiempo,
    },
    project: {},
  }),
  props: {},
  created() {
    service()
      .get(endpoints.projects.get + this.$route.params.id_proyecto)
      .then(res => {
        this.project = res.data.project;
      });
  },
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {},
  computed: {},
  mounted() {
    setTimeout(() => {
      let navEl = document.getElementById('nav-proyectos')
      navEl.classList.add('active')
    }, 400)
    let el = document.querySelector('.grid');
    let iso = new Isotope(el, {
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer',
      },
    });
    imagesLoaded(el).on('progress', function() {
      iso.layout();
    });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.grid:after {
  content: '';
  display: block;
  clear: both;
}

.grid-sizer,
.grid-item {
  width: 33.333%;
}

.grid-item {
  float: left;
  padding: 5px 5px;
  img {
    display: block;
    max-width: 100%;
  }
}

.proyecto__ {
  font-weight: 400;
  color: $gray-color;
  header {
    height: 210px;
    position: relative;
    background-size: cover;
    background-position: center;
    margin-top: 90px;
    h2 {
      color: #ffffff;
      line-height: 1.2;
      font-size: 50px;
      display: block;
      text-transform: uppercase;
      font-weight: 400;
      max-width: 1060px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 115px !important;
      padding: 0 350px 0 0;
    }
  }
  p {
    margin-left: 16px;
    line-height: 1.8;
    margin-bottom: 24px;
  }
  .icons {
    display: flex;
    justify-content: center;
    margin-bottom: 65px;
    .icon-project {
      margin-top: 40px;
      width: 200px;
      img {
        max-width: 90px;
        margin: auto;
        display: block;
      }
      h6 {
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
</style>
