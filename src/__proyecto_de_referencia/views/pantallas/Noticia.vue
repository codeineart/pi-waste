<template>
  <v-app column class="noticia__">
    <!-- NAVBAR -->
    <NavBar></NavBar>
    <!-- SPLASH SCREEN -->
    <general-header src='/static/img/bg/noticias.jpg'>
      Noticia
    </general-header>

    <!-- CONTENT -->
    <v-layout class="content-block" row wrap>

      <!-- COLUMNAS -->
      <v-layout column>
        <v-flex xs12>
          <article class="news">
            <h2 v-html="news.title"></h2>
            <img :src="news.cover_url" :alt="news.title" width="100%">
            <div class="content-news" v-html="news.content"></div>
            <div class="content-news">
              <router-link to="/noticias" class="back">Ver todas las noticias</router-link>
            </div>
          </article>
        </v-flex>
      </v-layout>
    </v-layout>

    <!-- SPACER -->
    <div class="spacer--180">
    </div>

    <!-- FOOTER -->
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
    news: []
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {},
  computed: {},
  created() {
    service()
      .get(endpoints.news.get + this.$route.params.id_news)
      .then(res => {
        this.news = res.data.news
      });
  },
  filters: {
    summary (value) {
      if (!value) return ''
      value = value.substring(0, 170)
      value = value.replace(/\<(\/?)p\>/gm, '')
      return value + '...'
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss">
/*
  Color Variables
*/
$gray-color: #333845;
$orange-color: #e65c00;
$text-over-gray: #ffffff;
$text-over-orange: #333333;

//*********************
// FUNCTIONAL CLASSES *
//*********************

.noticia__ {
  article.news {
    h2 {
      font-size: 42px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      max-width: 700px;
      text-align: center;
      margin: 0 auto 60px auto;
    }
    .content-news {
      max-width: 700px;
      margin: 40px auto 0 auto;
      line-height: 2;
      font-size: 16px;
      .back {
        text-decoration: none;
        font-size: 14px;
        color: #1c212e;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin: 20px 0;
        display: inline-block;
        float: left;
        position: relative;
        &:before{
          content: '';
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          width: 0%;
          height: 2px;
          background-color: #1c212e;
          transition: all .2s ease;
        }
        &:hover {
          &:before {
            width: 100%;
          }
        }
      }
    }
    img {
      max-width: 700px;
      margin: 80px auto;
      display: block;
    }
  }
}
</style>

<style lang="scss">
  .content-news {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
    &.text-withe {
      color: white;
    }
  }
</style>
