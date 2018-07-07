<template>
  <v-layout row wrap fill-height class="eventos__">

    <v-flex md12 row align-center d-flex class="header">
      <h1>Eventos</h1>
      <v-spacer></v-spacer>
      <v-icon color="white">fa fa-calendar-alt</v-icon>
    </v-flex>

    <!-- CONTENT -->
    <v-flex md12 row align-center d-flex>
      <div class="contenido">

        <!--  ITEM -->
        <div class="evento-block" style="border-bottom: solid 1px orange" :key="key" v-for="(event, key) in events">
          <div class="contenido-evento">
            <h2 style="text-align:left;">{{ event.title }}</h2>
            <p style="text-align:left;">
              {{ event.details}}
            </p>
          </div>
          <div>
            <v-avatar :size="'75px'" color="" style="background-color:#e65c00;">
              <span class="fecha-avatar">{{ event.event.start | formatDate }}</span>
            </v-avatar>
          </div>
        </div>

      </div>
    </v-flex>

  </v-layout>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
  }),
  props: ['events'],
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
  filters: {
    formatDate(value) {
      if (!value) return '';
      return moment(value).format('DD MMM');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.contenido-evento {
  padding: 0 10px;
  width: 295px;
  color: $gray-color;
  float: left;
}

.contenido {
  background-color: white;
  height: 256px;
  border-bottom: 1px solid $gray-color;
  display: block;
  overflow-y: auto;
}

.header {
  background-color: $orange-color;
  color: white;
  max-height: 51px;
}

.eventos__ {
  h1 {
    font-weight: 300;
    font-size: 1.6rem;
    padding: 15px 0;
  }
  .element-circle {
    position: inherit;
    border: solid 2px;
    border-radius: 50%;
    align-self: center;
    margin: 0 auto;
  }
  .fecha-avatar {
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .evento-block {
    padding: 15px 10px;
    width: 100%;
    display: block;
    float: left;
    h2 {
      font-weight: 500;
    }
  }
}
</style>
