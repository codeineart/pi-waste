<template>
  <transition name="fade">
    <v-btn color="orange">Vuetify Powers</v-btn>
  </transition>
</template>

<script>
import logo from 'static/img/logo-mpm-color.png';

export default {
  name: 'app',
  data: () => ({
    loading: false,
    logo: logo,
  }),
  created() {
    if (!localStorage.getItem('user-token')) {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">

</style>
