<template>
  <v-app column class="proyectos__">

    <NavBar></NavBar>

    <general-header src="/static/img/bg/proyectos.jpg">Proyectos</general-header>

    <v-layout class="content-block" row wrap>
      <v-flex xs12>
        <v-tabs grow v-model="tab">
          <v-tab v-for="(tabOption, index) in getTabsOptions" :key="index" :href="`#tab-${index}`">
            <h3>{{ tabOption }}</h3>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(_tab, index) in getTabsOptions" :key="index" :id="`tab-${index}`">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs4 v-for="project in getProjects[index]" :key="project.id">
                  <router-link :to="'/proyecto/' + project._id" tag="div" class="project-box" :style="{backgroundImage: 'url(' + (project.cover_img_url || imagePlaceholder) + ')'}">
                    <div class="bg-color"></div>
                    <h2>
                      <span class="fw-300">{{ project.contract }}</span>{{ project.name }}</h2>
                    <p class="description">{{ project.description | shorten }}</p>
                  </router-link>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>

    <div class="spacer--180"></div>

    <general-footer></general-footer>

  </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from 'src/component/navbar';
import GeneralHeader from 'src/component/header';
import GeneralFooter from 'src/component/footer';
import { service, endpoints } from 'src/services/general_service.js';
import imagePlaceholder from 'static/img/placeholder-img.png';
import _ from 'lodash'; // ---> "npm i -D @types/lodash" for autocomplete
/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    imagePlaceholder: imagePlaceholder,
    projects: [],
    tab: 'tab-0',
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {
    tab (value) {
      this.$router.push({path: '/proyectos/' + this.getTabsOptions[parseInt(value.replace('tab-', ''))]})
    },
    '$route.params.tab' (value) {
      this.tab = 'tab-' + _.indexOf(this.getTabsOptions, value)
    }
  },
  computed: {
    getTabsOptions() {
      return this.projects.map(item => item.name);
    },
    getProjects() {
      let count = -1;
      let project = _.mapKeys(_.groupBy(this.projects, 'name'), () => count++);

      return _.toArray(project);
    },
  },
  created() {
    service()
      .get(endpoints.projects.get)
      .then(res => {
        this.projects = res.data.projects
        let tabsIndex = _.indexOf(this.getTabsOptions, this.$route.params.tab)
        if (tabsIndex) this.tab = 'tab-' + tabsIndex
      })
  },
  filters: {
    shorten(value) {
      if (!value) return '';
      value = value.toString();
      if (value.length > 24) {
        return value.substr(0, 19) + '...';
      } else {
        return value;
      }
    },
  },
  mounted () {
    setTimeout(() => {
      let navEl = document.getElementById('nav-proyectos')
      navEl.classList.add('active')
    }, 400)
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import 'src/assets/style.scss';

.proyectos__ {
  font-weight: 400;
  color: $gray-color;
  h3 {
    width: 100%;
    font-size: 22px;
    font-weight: 400;
    text-transform: none;
  }
  .fw-300 {
    font-weight: 300;
  }
  .project-box {
    margin: 10px;
    height: 250px;
    position: relative;
    background-position: center;
    background-size: 100%;
    transition: background-size 0.4s ease;
    p.description {
      color: #ffffff;
      position: absolute;
      bottom: calc(10% + 20px);
      left: calc(10% + 30px);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1.4px;
    }
    .bg-color {
      background-color: $orange-color;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.4s ease;
    }
    h2 {
      color: #ffffff;
      position: absolute;
      top: calc(10% + 30px);
      left: calc(10% + 30px);
    }
    &:hover {
      cursor: pointer;
      background-size: 120%;
      .bg-color {
        opacity: 0.7;
      }
      &:before {
        width: 80%;
      }
      &:after {
        height: 80%;
      }
    }
    &:before {
      transition: all 0.4s ease;
      content: ' ';
      position: absolute;
      width: 0%;
      height: 80%;
      display: block;
      top: 10%;
      left: 10%;
      right: 10%;
      margin: auto;
      border: 1px solid #ffffff;
      border-width: 1px 0;
      z-index: 1;
    }
    &:after {
      transition: all 0.4s ease;
      content: ' ';
      position: absolute;
      width: 80%;
      height: 0%;
      display: block;
      top: 10%;
      bottom: 10%;
      margin: auto;
      left: 10%;
      border: 1px solid #ffffff;
      border-width: 0 1px;
    }
  }
}
</style>

<style lang="scss">
.tabs__item.tabs__item--active {
  h3 {
    font-weight: 600;
  }
}

.theme--light .tabs__bar {
  background-color: transparent;
}
</style>
