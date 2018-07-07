<template>
  <v-app column class="politicas__">
    <!-- NAVBAR -->
    <NavBar></NavBar>
    <!-- SPLASH SCREEN -->
    <general-header src="/static/img/bg/politicas.jpg">
      Políticas
    </general-header>

    <!-- CONTENT -->
    <v-layout class="content-block" row wrap>

      <v-flex xs12 class="intro-title" style="margin-bottom: 40px;">
        <h1>Nuestras Políticas</h1>
      </v-flex>

      <v-layout column>

        <!-- ELEMENTS -->
        <v-flex xs12 class="block">
          <!-- POLITICA -->
          <v-layout row>
            <!-- DESCRIPCIÓN -->
            <v-flex xs6>
              <v-layout column="" fill-height="">
                <v-flex xs3 class="">
                  <h1>SOCIEDAD DE SERVICIOS INGENIERIA Y MANTENCION INTEGRAL MPM LTDA.</h1>
                  <p>Dispone de un sistema de gestión de Seguridad y Salud en el Trabajo conforme con la especificación OHSAS 18001:2007</p>
                </v-flex>
                <v-flex xs3 class="">
                  <h1>Para las actividades:</h1>
                  <p>Servicio de instalación de montaje industrial, arriendo de vehículos y maquinaria.</p>
                </v-flex>
                <v-flex xs3 class="">
                  <h1>Que se realiza en:</h1>
                  <p>AV DEL VALLE , 945 Of. 4615. - HUECHURABA (SANTIAGO - Chile)</p>
                </v-flex>
                <v-flex xs3 class="fechas">
                  <v-layout column="">
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1>Fecha de primera emisión:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2015 - 11 - 19</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1>Fecha de última emisión:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2017 - 11 - 06</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1> Fecha de expiración:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2018 - 11 - 19</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                </v-flex>
              </v-layout>
            </v-flex>
            <!-- LOGO && BUTTON -->
            <v-flex xs6>
              <v-layout column fill-height="">
                <v-flex xs4 class="">
                  <h1 class="cert-title">AENOR</h1>
                  <h1 class="cert-text">Certificado del Sistema de Gestión Seguridad y Salud en el Trabajo</h1>
                </v-flex>
                <v-flex xs4 class="">
                  <v-layout row>
                    <v-flex xs5></v-flex>
                    <v-flex xs3 style="margin:40px auto;">
                      <a href="/static/reg_mark.pdf" target="_blank">
                        <img src="/static/img/reg_mark.jpg" class="img-responsive" alt="">
                      </a>
                    </v-flex>
                    <v-flex xs5></v-flex>
                  </v-layout>

                </v-flex>
                <v-flex xs4 mx-auto>
                  <a href="/static/reg_mark.pdf" target="_blank">
                    <v-btn color="success" class="modifier">Ver Política</v-btn>
                  </a>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <!--<br v-if=" i != 3">-->
        <!--<br v-if=" i != 3">-->
      </v-layout>
      <hr>
      <v-layout column>

        <!-- ELEMENTS -->
        <v-flex xs12 class="block">
          <!-- POLITICA -->
          <v-layout row>
            <!-- DESCRIPCIÓN -->
            <v-flex xs6>
              <v-layout column="" fill-height="">
                <v-flex xs3 class="">
                  <h1>SOCIEDAD DE SERVICIOS INGENIERIA Y MANTENCION INTEGRAL MPM LTDA.</h1>
                  <p>Dispone de un sistema de gestión ambiental conforme con la Norma ISO 14001:2004</p>
                </v-flex>
                <v-flex xs3 class="">
                  <h1>Para las actividades:</h1>
                  <p>Servicio de instalación de montaje industrial, arriendo de vehículos y maquinaria.</p>
                </v-flex>
                <v-flex xs3 class="">
                  <h1>Que se realiza en:</h1>
                  <p>AV DEL VALLE , 945 Of. 4615. - HUECHURABA (SANTIAGO - Chile)</p>
                </v-flex>
                <v-flex xs3 class="fechas">
                  <v-layout column="">
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1>Fecha de primera emisión:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2015 - 11 - 19</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1>Fecha de última emisión:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2017 - 11 - 06</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1>Fecha de expiración:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2018 - 09 - 14</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                </v-flex>
              </v-layout>
            </v-flex>
            <!-- LOGO && BUTTON -->
            <v-flex xs6>
              <v-layout column fill-height="">
                <v-flex xs4 class="">
                  <h1 class="cert-title">AENOR</h1>
                  <h1 class="cert-text">Certificado del Sistema de Gestión Ambiental</h1>
                </v-flex>
                <v-flex xs4 class="">
                  <v-layout row>
                    <v-flex xs5></v-flex>
                    <v-flex xs3 style="margin:40px auto;">
                      <a href="static/gest_amb.pdf" target="_blank">
                        <img src="/static/img/gest_amb.jpg" class="img-responsive" alt="">
                      </a>
                    </v-flex>
                    <v-flex xs5></v-flex>
                  </v-layout>

                </v-flex>
                <v-flex xs4 mx-auto>
                  <a href="static/gest_amb.pdf" target="_blank">
                    <v-btn color="success" class="modifier">Ver Política</v-btn>
                  </a>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <!--<hr v-if=" i != 3">-->
        <!--<br v-if=" i != 3">-->
        <!--<br v-if=" i != 3">-->
      </v-layout>
      <hr>
      <v-layout column>

        <!-- ELEMENTS -->
        <v-flex xs12 class="block">
          <!-- POLITICA -->
          <v-layout row>
            <!-- DESCRIPCIÓN -->
            <v-flex xs6>
              <v-layout column="" fill-height="">
                <v-flex xs3 class="">
                  <h1>SOCIEDAD DE SERVICIOS INGENIERIA Y MANTENCION INTEGRAL MPM LTDA.</h1>
                  <p>Dispone de un sistema de gestión de la calidad conforme con la Norma ISO 9001:2015</p>
                </v-flex>
                <v-flex xs3 class="">
                  <h1>Para las actividades:</h1>
                  <p>Construcción, montaje industrial, mantenimiento, arriendo de maquinas y equipos. Comercialización e instalación de recubrimiento</p>
                </v-flex>
                <v-flex xs3 class="">
                  <h1>Que se realiza en:</h1>
                  <p>AV DEL VALLE , 945 Of. 4615. - HUECHURABA (SANTIAGO - Chile)</p>
                </v-flex>
                <v-flex xs3 class="fechas">
                  <v-layout column="">
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1>Fecha de primera emisión:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2011 - 11 - 29</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1>Fecha de última emisión:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2017 - 11 - 29</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs4="">
                      <v-layout row="">
                        <v-flex xs7="">
                          <h1> Fecha de expiración:</h1>
                        </v-flex>
                        <v-flex xs5="" align-center d-flex>
                          <span class="fechas-item">2020 - 11 - 29</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                </v-flex>
              </v-layout>
            </v-flex>
            <!-- LOGO && BUTTON -->
            <v-flex xs6>
              <v-layout column fill-height="">
                <v-flex xs4 class="">
                  <h1 class="cert-title">AENOR</h1>
                  <h1 class="cert-text">Certificado del Sistema de Gestión de la Calidad</h1>
                </v-flex>
                <v-flex xs4 class="">
                  <v-layout row>
                    <v-flex xs5></v-flex>
                    <v-flex xs3 style="margin:40px auto;">
                      <a href="/static/seg_lab.pdf" target="_blank">
                        <img src="/static/img/seg_lab.jpg" class="img-responsive" alt="">
                      </a>
                    </v-flex>
                    <v-flex xs5></v-flex>
                  </v-layout>

                </v-flex>
                <v-flex xs4 mx-auto>
                  <a href="/static/seg_lab.pdf" target="_blank">
                    <v-btn color="success" class="modifier">Ver Política</v-btn>
                  </a>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <!--<hr v-if=" i != 3">-->
        <!--<br v-if=" i != 3">-->
        <!--<br v-if=" i != 3">-->
      </v-layout>
    </v-layout>

    <div class="spacer--180"></div>

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
  mounted () {
    setTimeout(() => {
      let navEl = document.getElementById('nav-info')
      navEl.classList.add('active')
    }, 400)
  },
  methods: {},
};
</script>

<style scoped lang="scss">
//*********************
//    VIEW CLASSES    *
//*********************

@import '@/assets/style.scss';

.politicas__ {
  font-weight: 400;
  color: $gray-color;

  a {
    text-decoration: none;
  }

  .content-block {
    margin: 6rem 14rem;
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
    opacity: .4;
    margin: 40px 0;
  }
}

//***********************
//   BUTTTON CLASSES    *
//***********************

// .btn__content {
//   -webkit-box-align: center;
//   -ms-flex-align: center;
//   align-items: center;
//   border-radius: inherit;
//   color: inherit;
//   display: -webkit-box;
//   display: -ms-flexbox;
//   display: flex;
//   height: inherit;
//   -webkit-box-flex: 1;
//   -ms-flex: 1 0 auto;
//   flex: 1 0 auto;
//   -webkit-box-pack: center;
//   -ms-flex-pack: center;
//   justify-content: center;
//   margin: 0 auto;
//   padding: 0 16px;
//   -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
//   transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
//   white-space: nowrap;
//   width: inherit;
// }

// .btn {
//   -webkit-box-align: center;
//   -ms-flex-align: center;
//   align-items: center;
//   border-radius: 10px;
//   display: -webkit-inline-box;
//   display: -ms-inline-flexbox;
//   display: inline-flex;
//   height: 36px;
//   -webkit-box-flex: 0;
//   -ms-flex: 0 1 auto;
//   flex: 0 1 auto;
//   font-size: 14px;
//   font-weight: 500;
//   -webkit-box-pack: center;
//   -ms-flex-pack: center;
//   justify-content: center;
//   margin: 6px 8px;
//   min-width: 88px;
//   outline: 0;
//   text-transform: uppercase;
//   text-decoration: none;
//   -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
//   transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
//   position: relative;
//   vertical-align: middle;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }

// button {
//   cursor: pointer;
// }

// .success {
//   background-color: $gray-color !important;
//   border-color: $gray-color !important;
//   font-size: 14px;
//   font-weight: 500;
//   text-transform: uppercase;
// }
</style>

