<template>
  <v-app column class="mision-vision__">

    <!-- NAVBAR -->
    <NavBar></NavBar>

    <!-- SPLASH SCREEN -->
    <general-header src="/static/img/bg/politicas.jpg">
      Misión y Visión
    </general-header>

    <!-- CONTENIDO -->
    <!-- <v-container fluid fill-height="">
      <v-layout column="">
        <v-flex xs6>
          <v-layout row fill-height>
            <v-flex xs6>
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h1>
            </v-flex>
            <v-flex xs6>
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout row fill-height>
            <v-flex xs6>
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h1>
            </v-flex>
            <v-flex xs6>
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container> -->

    <v-layout class="content-block" row wrap>

      <!-- <v-flex xs12 class="intro-title" style="margin-bottom: 40px;"> -->
      <!-- <h1>Nuestra Misión y nuestra visión</h1> -->
      <!-- </v-flex> -->

      <!-- ITEM 1 -->
      <v-layout column>

        <!-- ELEMENTS -->
        <v-flex xs12 class="block">

          <!-- MISIÓN -->
          <v-layout row>

            <!-- DESCRIPCIÓN -->
            <v-flex xs6>
              <v-layout column fill-height align-center justify-center align-content-center>
                <v-flex xs12 style="display:contents;">
                  <h1>Nuestra Misión</h1>
                  <p class="text-xs-center">Entregar Soluciones constructivas que aporten valor a nuestros clientes, buscando metodologías innovadoras y de alta calidad, con compromiso y flexibilidad en cada una de sus áreas de negocios.</p>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- IMAGEN -->
            <v-flex xs6>
              <v-layout column fill-height align-center justify-center align-content-center>
                <v-flex xs12 style="display:contents;">
                  <img src="/static/img/slider-mision.jpg" alt="" class="img-responsive">
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <!--<br v-if=" i != 3">-->
        <!--<br v-if=" i != 3">-->
      </v-layout>
      <hr>

      <!-- ITEM 2 -->
      <v-layout column>

        <!-- ELEMENTS -->
        <v-flex xs12 class="block">

          <!-- MISIÓN -->
          <v-layout row>

            <!-- IMAGEN -->
            <v-flex xs6>
              <v-layout column fill-height align-center justify-center align-content-center>
                <v-flex xs12 style="display:contents;">
                  <img src="/static/img/slider-vision.jpg" alt="" class="img-responsive">
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- DESCRIPCIÓN -->
            <v-flex xs6>
              <v-layout column fill-height align-center justify-center align-content-center>
                <v-flex xs12 style="display:contents;">
                  <h1>Nuestra Visión</h1>
                  <p class="text-xs-center">Ser referente obligado de clientes actuales y potenciales, en nuestras áreas de competencias y construir una empresa sostenible para nuestros trabajadores y accionistas.</p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <!--<br v-if=" i != 3">-->
        <!--<br v-if=" i != 3">-->
      </v-layout>
      <hr>

    </v-layout>

    <!-- ESPACIADOR -->
    <!-- <div class="spacer--180"></div> -->

    <!-- FOOTER  -->
    <general-footer></general-footer>

  </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from '@/component/navbar';
import GeneralHeader from '@/component/header';
import GeneralFooter from '@/component/footer';

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {},
  computed: {},
  mounted() {
    setTimeout(() => {
      let navEl = document.getElementById('nav-info');
      navEl.classList.add('active');
    }, 400);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
//*********************
//    VIEW CLASSES    *
//*********************

@import '@/assets/style.scss';

.mision-vision__ {
  // DEBUG
  div {
    // border: 2px red solid;
  }
  font-weight: 400;
  color: $gray-color;

  a {
    text-decoration: none;
  }

  .content-block {
    margin: 4rem 14rem;
  }

  h1 {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .fechas {
    h1 {
      display: inline;
      font-size: 16px;
    }
    span {
      float: right;
      font-size: 1.4rem;
      text-align: center;
    }
    .fechas-item {
      text-align: right;
    }
  }

  .block {
    margin-bottom: 3%;
    margin-top: 3%;
    p {
      font-size: 14px;
      padding-left: 5%;
      padding-right: 5%;
    }
  }

  .cert-title {
    text-align: center;
    font-size: 3rem !important;
  }

  .cert-text {
    text-align: center;
    margin: 0 15%;
  }

  .btn {
    color: white !important;
    border-radius: 10px;
    background-color: #4caf50 !important;
    padding: 0px 25px;
    text-decoration: none !important;
  }

  hr {
    width: 100%;
    border-top: 1px solid $orange-color;
    opacity: 0.4;
    margin: 40px 0;
  }
}
</style>

