<template>
  <v-app column class="gerencias__">

    <!-- NAVBAR -->
    <NavBar></NavBar>

    <!-- SPACER -->
    <div class="spacer--180 top" :style="{backgroundImage: 'url(' + header[$route.params.type] + ')'}">
      <h1>{{ $route.params.type | uppercase }}</h1>
    </div>

    <!-- CONTENT -->
    <!-- <v-layout class="content-block" row wrap> -->
    <v-layout class="content-block more-margin" row wrap>
      <!-- COLUMNAS -->
      <v-layout column>

        <!-- TITULO -->
        <v-flex class="">
          <hr class="horizontal-bar" />
          <h1 class="intro-title remove-after-bar">Acceso rápido</h1>
        </v-flex>

        <!-- ARCHVOS MODULE USER UI -->
        <modulo-archivos>
        </modulo-archivos>

      </v-layout>
    </v-layout>

    <!-- SPACER -->
    <div class="spacer--180"></div>
    <general-footer></general-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from '@/component/navbar';
import { UserUI as ModuloArchivos } from 'src/modules/_archivos';
import GeneralHeader from '@/component/header';
import GeneralFooter from '@/component/footer';
import headerHsec from 'static/img/gerencias-headers/hsec.jpg'
import headerCalidad from 'static/img/gerencias-headers/hsec.jpg'
import headerRRHH from 'static/img/gerencias-headers/hsec.jpg'
import headerContabilidad from 'static/img/gerencias-headers/hsec.jpg'
import headerCompras from 'static/img/gerencias-headers/hsec.jpg'
import headerMaquinarias from 'static/img/gerencias-headers/hsec.jpg'
import headerRemuneraciones from 'static/img/gerencias-headers/hsec.jpg'
import headerGerenteGeneral from 'static/img/gerencias-headers/hsec.jpg'

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
    header: {
      hsec: headerHsec,
      calidad: headerCalidad,
      'recursos-humanos': headerRRHH,
      contabilidad: headerContabilidad,
      compras: headerCompras,
      maquinarias: headerMaquinarias,
      remuneraciones: headerRemuneraciones,
      'gerente-general': headerGerenteGeneral,
    }
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter, ModuloArchivos },
  watch: {},
  computed: {},
  mounted() {
    this.viewTitle = '__DEBUGGING';
    setTimeout(() => {
      let navEl = document.getElementById('nav-gerencias');
      navEl.classList.add('active');
    }, 400);
  },
  filters: {
    uppercase: function(value) {
      if (!value) return '';
      value = value.toString().replace('-', ' ');
      return value.toUpperCase();
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

//*********************
// FUNCTIONAL CLASSES *
//*********************

.gerencias__ {
  .spacer--180.top {
    background-size: cover;
    background-position: center;
    margin-top: 90px;
    background-color: #ddd;
    border-bottom: solid 5px $orange-color;
    padding: 5% 15%;
    position: relative;
    h1 {
      color: #ffffff;
      position: absolute;
      bottom: 0px;
      font-size: 5.5rem;
      font-weight: 500;
    }
  }
  .spacer--180.bottom {
    background-color: green;
  }

  .horizontal-bar {
    width: 100%;
    height: 4px;
    background: $orange-color;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .content-block.more-margin {
    margin: 4% 4%;
  }

  .remove-after-bar::before {
    all: unset;
  }

  .intro-title {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 1.8rem;
  }

  .file-icon {
    text-align: center;
    i {
      font-size: 16px;
      font-size: 5vw;
      color: grey !important;
    }
  }

  .carousel {
    box-shadow: none;
  }

  .file-element {
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 10px;
    overflow: hidden;
    .file-action-bar {
      font-size: 1.4rem;
      font-weight: 400;
      background-color: $orange-color;
      color: white;
      padding: 10px;
    }
    .file-icon-box {
      padding: 15px;
      background-color: lightgrey;
    }
  }
}

.identifier {
  color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
