<template>
  <h1>{{ mes }}</h1>
</template>

<script>
// import logo from 'static/img/logo-mpm-color.png';

export default {
  name: 'app',
  data: () => ({
    mes: 'Hola Mundo',
  }),
  mounted() {
    let _vm = this;
    setTimeout( () => {
      _vm.mes = 'ashckasdhcjhasdgvcjasdgc';
    }, 2000);
  },
};
</script>

<style lang="scss">
</style>
