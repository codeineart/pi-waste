<template>
  <div>
    <transition name="fade-loading">
      <div class="loading" v-if="loading">
        <h1>Hello World</h1>
      </div>
    </transition>
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
// import logo from 'static/img/logo-mpm-color.png';

export default {
  data: () => ({
    _DEBUG_: true,
    service: 'loading',
  }),
  components: {},
  mounted() {
    // initial request
    this.setServiceStatus('loading');

    // request simulation
    let callback = () => {
      this.setServiceStatus('idle');
    };
    setTimeout(callback, 1000);
  },
  methods: {
    setServiceStatus(status) {
      switch (status) {
        case 'sucess':
          this.service = 'idle';
          break;
        case 'loading':
          this.service = 'loading';
          break;
        case 'error':
          this.service = 'error';
          break;
      }
    },
  },
};
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main';
</style>
