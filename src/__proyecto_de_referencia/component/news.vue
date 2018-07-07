<template>
  <v-layout row wrap fill-height>

    <router-link v-for="(single, key) in news" :key="key" :to="'noticia/' + single._id" class="news flex md6">
      <v-flex fill-height class="news-image" :style="{backgroundImage: 'url(' + single.cover_url + ')'}"></v-flex>
        <v-layout  column style="z-index:1;" fill-height>
          <v-flex xs8></v-flex>
          <v-flex xs4 class="news-bisel">
            <h4 class="news-tittle">{{ single.title }}</h4>
            <p class="news-text" v-html="$options.filters.summary(single.content)"></p>
          </v-flex>
      </v-layout>
    </router-link>

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
  props: ['news'],
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
  filters: {
    summary (value) {
      if (!value) return ''
      value = value.substring(0, 60)
      value = value.replace(/\<(\/?)p\>/gm, '')
      return value + '...'
    },
    summaryExtended (value) {
      if (!value) return ''
      value = value.substring(0, 197)
      value = value.replace(/\<(\/?)p\>/gm, '')
      return value + '...'
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

//*********************
// FUNCTIONAL CLASSES *
//*********************

.news-image {
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  background-position: center;
  cursor: pointer;
}

.news {
  height: 190px;
  overflow: hidden;
  background-color: rgba(128, 128, 128, 1);
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  position: relative;
  text-decoration: none;
  &--last {
    height: 190px;
    overflow: hidden;
    background-color: rgba(128, 128, 128, 1);
    justify-content: center;
    background-color: white;
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 10px;
  }
  .news-image {
    transition: all 1s ease;
  }
  &:hover .news-image {
    transform: scale(1.1);
  }
}

.news-bisel {
  background-color: black;
  opacity: 0.8;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 200;
  padding: 10px;
  min-height: 80px;
}

.news-text {
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: $text-soft-white;
  z-index: 10;
  font-size: 12px;
  margin: 0;
  &--last {
    text-align: left;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: $text-simple-gray;
    z-index: 10;
    font-size: 11px;
    margin: 0;
  }
}

.news-tittle {
  padding-right: 15px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: $text-over-gray;
  z-index: 10;
  font-size: 12px;
  &--last {
    padding-right: 15px;
    text-align: left;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-weight: 500;
    color: black;
    z-index: 10;
    font-size: 12px;
  }
}
</style>
