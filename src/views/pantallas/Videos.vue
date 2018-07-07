<template>
  <v-app column class="videos__">
    <!-- NAVBAR -->
    <NavBar></NavBar>
    <!-- SPLASH SCREEN -->
    <general-header src="/static/img/bg/videos.jpg">
      Videos
    </general-header>

    <!-- CONTENT -->
    <v-layout class="content-block" row wrap>

      <v-layout row style="width: 100%">

        <v-flex xs9>
          <h1 class="intro-title">Videos MPM</h1>
        </v-flex>

        <v-flex xs3>
          <div class="text-xs-right">
            <v-menu offset-y>
              <v-btn slot="activator" outline class="btn--categories" style="color: rgba(0, 0, 0, 0.5)">
                <v-icon left style="color: #e65c00">label</v-icon> {{ (categorySelected === 'all' ? 'Todos' : categorySelected) || 'Todos' }}
              </v-btn>
              <v-list>
                <v-list-tile @click="categorySelected = 'all'">
                  <v-list-tile-title style="color: rgba(0, 0, 0, 0.5)">Todos</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-for="(category, index) in getCategories" :key="index" @click="categorySelected = category">
                  <v-list-tile-title style="color: rgba(0, 0, 0, 0.5)">{{ category }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-flex>

      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="video" v-for="(video, key) in getVideos" :key="key" v-show-animation="">
          <div v-if="video.type === 'video'">
            <iframe height="300" width="100%" :src="'https://www.youtube-nocookie.com/embed/' + urlToIDYouTube(video.url) + '?rel=0&amp;showinfo=0'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div v-else>
            <img :src="video.url" width="100%">
          </div>
        </v-flex>
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
import { service, endpoints } from '@/services/general_service';

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
    categorySelected: '',
    videos: []
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {},
  computed: {
    getCategories () {
      let categories = ['Casa matriz', 'Proyectos', 'RSE y Capacitaciones']
      this.videos.forEach(video => {
        video.tags.forEach(category => {
          categories.push(category)
        })
      })
      return _.uniq(categories);
    },
    getVideos () {
      if (this.categorySelected === 'all' || this.categorySelected === '') {
        return this.videos
      }
      return _.filter(this.videos, video => {
        return video.tags.find(tag => {
          return this.categorySelected === tag
        })
      })
    }
  },
  methods: {
    urlToIDYouTube (url) {
      let parser = document.createElement('a');
      parser.href = url;
      return parser.search.replace('?v=', '')
    }
  },
  created () {
    service()
      .get(endpoints.video.getAll)
      .then(res => {
        this.videos = res.data.videos
      })
  },
  mounted () {
    setTimeout(() => {
      let navEl = document.getElementById('nav-videos')
      navEl.classList.add('active')
    }, 400)
  }
};
</script>

<style scoped lang="scss">
//*********************
//    VIEW CLASSES    *
//*********************

@import '@/assets/style.scss';

.videos__ {
  font-weight: 400;
  color: $gray-color;

  .btn--categories {
    border: 0;
    color: $gray-color;
  }

  h1 {
    font-weight: 500;
    font-size: 2rem;
  }

  .fechas {
    h1 {
      display: inline;
    }
    span {
      float: right;
      font-size: 1.4rem;
      text-align: center;
    }
    .fechas-item {
    }
  }

  .block {
    margin-bottom: 3%;
    margin-top: 3%;
    p {
      font-size: 1.3rem;
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

  /*.btn {*/
    /*color: white !important;*/
    /*border-radius: 10px;*/
    /*background-color: #4caf50 !important;*/
    /*padding: 0px 25px;*/
  /*}*/

  hr {
    width: 100%;
    border-top: 2px solid $orange-color;
  }

  .intro-title {
    margin-bottom: 40px;
  }

  .video {
    padding: 25px;
  }
}
</style>

