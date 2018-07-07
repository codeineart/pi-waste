<template>
  <v-app column class="noticias__">
    <!-- NAVBAR -->
    <NavBar></NavBar>
    <!-- SPLASH SCREEN -->
    <general-header src='/static/img/bg/noticias.jpg'>
      Noticias
    </general-header>

    <!-- CONTENT -->
    <v-layout class="content-block" row wrap>

      <!-- COLUMNAS -->
      <v-layout column>

        <v-flex class="xs12">
          <v-layout>
            <v-flex class="xs9">
              <h1 class="intro-title">Noticias MPM</h1>
            </v-flex>
            <v-flex class="xs3">
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
        </v-flex>

        <!-- ELEMENTS -->
        <v-flex
          :class="{news: true, 'row-odd': (index % 2 === 0), 'row-even': (index % 2 === 1)}"
          v-show-animation=""
          xs12
          v-for="(single_news, index) in getNews"
          :key="single_news._id">
          <v-layout justify-center="" row>
            <v-flex class="news-block" xs6>
              <img class="img-responsive" :src="single_news.cover_url" alt="">
            </v-flex>
            <v-flex class="news-block" xs6>
              <h1 v-html="single_news.title"></h1>
              <div v-html="$options.filters.summary(single_news.content)"
                   :class="{'content-news': true, 'text-withe': (index % 2 === 1)}"></div>
              <router-link :to="'/noticia/' + single_news._id" class="view-more-news">Ver noticia</router-link>
            </v-flex>
          </v-layout>
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
  import {service, endpoints} from '@/services/general_service';
  import _ from 'lodash'

  /**
   * For Logging on inline elements
   */
  Vue.prototype.$log = console.log.bind(console);

  export default {
    data: () => ({
      drawer: null,
      isActive: false,
      categorySelected: '',
      news: []
    }),
    props: {},
    components: {NavBar, GeneralHeader, GeneralFooter},
    watch: {},
    computed: {
      getCategories () {
        let categories = ['Responsabilidad social']
        this.news.forEach(single => {
          single.tags.forEach(category => {
            categories.push(category)
          })
        })
        return _.uniq(categories);
      },
      getNews () {
        if (this.categorySelected === 'all' || this.categorySelected === '') {
          return this.news
        }
        return _.filter(this.news, single => {
          return single.tags.find(tag => {
            return this.categorySelected === tag
          })
        })
      }
    },
    mounted() {
      setTimeout(() => {
        let navEl = document.getElementById('nav-info')
        navEl.classList.add('active')
      }, 400)
    },
    created() {
      if (this.$route.params.category) this.categorySelected = this.$route.params.category
      this.$root.$children[0].loading = true
      service()
        .get(endpoints.news.getAll)
        .then(res => {
          this.news = res.data.news
          this.$root.$children[0].loading = false
        });
    },
    filters: {
      summary(value) {
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
  @import '@/assets/style.scss';

  .noticias__ {

    .btn--categories {
      border: 0;
      color: $gray-color;
    }

    .intro-title {
      margin-bottom: 3%;
    }

    .news {
      margin-bottom: 3%;
      margin-top: 3%;
      h1 {
        font-size: 32px;
        font-weight: 400;
        margin-bottom: 10%;
        position: relative;
        &::before {
          content: '';
          width: 400px;
          height: 4px;
          position: absolute;
          bottom: -4px;
        }
      }

      &-block {
        padding: 2% 2%;
        .view-more-news {
          text-decoration: none;
          font-size: 14px;
          color: white;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 20px 10px;
          display: inline-block;
          float: right;
          position: relative;
          &:before {
            content: '';
            display: block;
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            width: 0%;
            height: 2px;
            background-color: #fff;
            transition: all .2s ease;
          }
          &:hover {
            &:before {
              width: 100%;
            }
          }
        }
      }
      &.row-odd {
        background-color: $orange-color;
        h1 {
          color: $text-over-orange;
        }
        h1::before {
          background: white;
        }
        p {
          color: $text-over-orange;
        }
      }
      &.row-even {
        background-color: $gray-color;
        h1 {
          color: white;
        }
        h1::before {
          background: $orange-color;
        }
        p {
          color: $text-over-gray;
        }
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
