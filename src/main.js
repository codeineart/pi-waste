// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router'
import VueSession from 'vue-session';
import VueCookie from 'vue-cookie';

// Visual imports
import icons from 'glyphicons';

// Vue importing
Vue.use(VueCookie);
Vue.use(Vuex);
Vue.use(Router)
Vue.mixin({
  methods: {
    // Gets rid of reactive stuff when printing data objects
    purify: reactiveObject => {
      return JSON.parse(JSON.stringify(reactiveObject));
    },
  },
});

// Fo logging ease of use
Vue.prototype.$cout = (content = '{{ Input Variable }}', title = 'Simple logging helper:', clear = false, banner = false, purify = false) => {
  if (clear == true) {
    console.clear();
  }
  if (banner == true) {
    console.error(`###################### ${title} ##########################`);
  }

  let output = purify ? JSON.parse(JSON.stringify(content)) : content;

  if (typeof output === 'Array') {
    console.log('Is Array');
  }

  console.info('cout >> ' + title);
  console.log(output);
};

// import Datatable from 'vue2-datatable-component';
// Vue.use(Datatable);

// Router components
import App from 'src/App';
import router from 'src/router'

Vue.config.productionTip = false;
Vue.config.silent = false;

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  },
});
