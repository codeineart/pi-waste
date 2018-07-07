<template>
  <v-layout row wrap fill-height display="">
    <v-flex md12 class="news mision-vision" style="position:relative;">
      <v-carousel class="mv-carousel" hide-delimiters>
        <v-carousel-item>
          <div @click="$router.push('mision_vision')" class="bg-image" style="background-image: url('/static/img/slider-mision.jpg')">
            <div class="content">
              <div>
                <h3>Misión</h3>
                <p>{{ mision }}</p>
              </div>
            </div>
          </div>
        </v-carousel-item>
        <v-carousel-item>
          <div @click="$router.push('mision_vision')" style="background-image: url('/static/img/slider-vision.jpg')" class="bg-image">
            <div class="content">
              <div>
                <h3>Visión</h3>
                <p>{{ vision }}</p>
              </div>
            </div>
          </div>
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
  props: ['content', 'mision', 'vision'],
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.bg-image {
  transition: all 0.7s ease;
  &:hover {
    cursor: pointer;
    background-size: 110%;
  }
}

.mv-carousel {
  overflow: hidden !important;
  height: 380px;
}

.bg-image {
  height: 100%;
}

.mision-vision {
  div {
    background-size: 100%;
    background-position: center;
    /*transition: all 1s ease;*/
  }
}

.contenido {
  overflow: hidden;
  background-color: rgba(128, 128, 128, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title--misionvision {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: left;
  font-weight: 400;
  padding: 5px 30px;
  font-size: 1.4rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.layout {
  position: relative;
  height: 100%;
  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.8);
    margin-bottom: 0;
    height: 190px;
    padding: 40px 30px;
    p,
    h3 {
      color: #ffffff;
    }
  }
}
</style>

<style lang="scss">
  .mv-carousel .carousel__left, .mv-carousel .carousel__right {
    top: 90%
  }
</style>
