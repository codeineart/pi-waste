<template>
  <v-layout row wrap fill-height>
    <v-flex md12 class="box">
      <v-carousel style="height:100%;" hide-delimiters>
        <div class="title--label">
          <h1>Proyectos</h1>
        </div>
        <v-carousel-item :key="project.id" v-for="project in projects" class="carousel-container">
          <v-layout row fill-height="" :style="{backgroundImage: 'url(' + project.cover_img_url + ')'}" class="containter-bg">
            <v-flex xs6>
            </v-flex>
            <v-flex xs6>
              <v-layout column fill-height="">
                <v-flex xs12 pa-4>
                  <h1 class="title-proyectos">{{ project.name }}</h1>
                  <router-link :to="'/proyecto/' + project._id" class="btn--view-project btn" elevation-24 style="margin-top: 30px">Ver Proyecto</router-link>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
  }),
  props: ['projects'],
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

//*********************
// FUNCTIONAL CLASSES *
//*********************

.carousel {
  height: 300px;
  overflow: hidden;
}

.containter-bg {
  background-size: cover;
  background-position: center;
  height: 300px !important;
}

.box {
  overflow: hidden;
  background-color: rgba(128, 128, 128, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  /*background-image: url('/static/img/bg/proyectos.jpg');*/
  background-size: cover;
  background-position: center;
}

.title-proyectos {
  color: white;
  font-size: 3.4rem;
  text-align: left;
  font-weight: 500;
  line-height: 50px;
  text-shadow: 2px 2px 10px black;
}

.btn--view-project {
  background-color: $gray-color !important;
  color: white;
  margin: 0;
  border-radius: 5px;
  float: left;
  font-size: 1.4rem;
  font-weight: 400;
  height: 50px;
  padding: 10px;
}

.title--label {
  position: absolute;
  left: 0px;
  top: 0px;
  will-change: 100%;
  z-index: 12;
  background: rgba(0, 0, 0, 0.5);

  h1 {
    font-weight: 400;
    margin-left: 15px;
    margin-right: 115px;
  }
}
</style>
