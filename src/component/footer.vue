<template>
  <div>

    <!-- FOOTER -->
    <v-layout>
      <v-flex xs12 relative class="footer-bg">
        <v-layout row relative class="footer">
          <v-flex xs12 fill-height class="footer-content">
            <v-layout row fill-height>
              <v-flex xs4 id="footer-logo">
                <v-layout column fill-height="">
                  <v-flex xs3 pl-3 pr-3>
                    <img class="img-responsive" src="/static/img/logo-mpm-blanco.png" alt="">
                  </v-flex>
                  <v-flex xs9>
                    <p class="text">MPM LTDA es una empresa que ofrece servicios de fabricación y montaje industrial, arriendo de equipos y maquinarias, e instalación de recubrimientos antiácidos y anti abrasivos de alto rendimiento.</p>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs4 id="footer-address">
                <h1>Casa Central</h1>
                <p>
                  Avenida Valle Norte 945, Of 4615 Ciudad Empresarial Huechuraba Santiago, Chile<br><br>
                  Correo: contacto@mpmcl.cl <br>
                  Fono: +56 22 954 97 00 <br>
                </p>
              </v-flex>
              <v-flex xs4 id="footer-certifications">
                <v-layout class="certificaciones" column fill-height="">
                  <v-flex>
                    <h1>Certificaciones</h1>
                      <a href="/static/reg_mark.pdf" target="_blank">
                        <img src="/static/img/reg_mark.jpg">
                      </a>
                      <a href="/static/gest_amb.pdf" target="_blank">
                        <img src="/static/img/gest_amb.jpg">
                      </a>
                      <a href="/static/seg_lab.pdf" target="_blank">
                        <img src="/static/img/seg_lab.jpg">
                      </a>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

          </v-flex>
        </v-layout>
        <div class="footer-copyright">
          <v-layout row fill-height>
            <v-flex xs3></v-flex>
            <v-flex xs6 fill-height d-flex>
              <p class="statement text-xs-center" style="align-self:center;">
                © Copyright - MPM 2018 - Todos los Derechos Reservados
              </p>
            </v-flex>
            <v-flex xs3></v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data: () => ({}),
  props: ['src'],
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">

@import '@/assets/style.scss';

#footer-logo {
  img {
    max-width: 200px;
    margin: 30px 0;
    display: block;
  }
  p {
    text-align: justify;
    font-size: 14px;
    margin: 15px 20px 0 20px;
  }
}

#footer-address {
  h1 {
    margin: 50px 20px;
  }
  p {
    text-align: justify;
    font-size: 14px;
    margin: 0 20px;
  }
}

#footer-certifications {
  h1 {
    margin: 50px 20px;
  }
  p {
    margin: 0 20px;
  }
}

.footer {
  background-color: $gray-color !important;
  height: 350px;
  &-content {
    color: white;
    max-width: 1200px;
    width: 100%;
    margin: auto;
  }
  &-copyright {
    position: relative;
    width: 100%;
    height: 60px;
    background-color: $orange-color;
    .statement {
      color: white;
      font-size: 14px;
      margin: 0;
    }
  }
  &-bg {
    background-color: $gray-color;
  }
  .text {
    font-size: 14px;
    text-align: left;
  }
  .img-responsive {
    width: 100%;
    height: auto;
  }

  ul {
    list-style: none;
    li {
      font-size: 14px;
    }
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .certificaciones {
    img {
      width: 100%;
      height: auto;
      max-width: 65px;
      transition: all .2s ease;
      margin: 0 20px;
      transform: scale(1);
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
