<template>
  <!-- MODULO ARCHIVOS UI USUARIO -->
  <v-layout column>

    <!-- FILE QUICK ACCESS -->
    <v-flex xs12 mt-3 mb-3>
      <QuickAccess v-if="show" :filesData="quickAccessFiles">
      </QuickAccess>
    </v-flex>

    <!-- FILE LIST -->
    <v-flex class="" xs12="">
      <FileTable @data-ready="onTableDataReady"></FileTable>
    </v-flex>
  </v-layout>
</template>

<script>
import QuickAccess from './quick-access';
import FileTable from './datatable';
import moment from 'moment';

export default {
  data: () => ({
    filesFetched: [],
    quickAccessFiles: [],
    show: false,
  }),
  components: { QuickAccess, FileTable },
  watch: {},
  computed: {},
  methods: {
    onTableDataReady(filesDataStorage) {
      this.filesFetched = _.orderBy(filesDataStorage, o => {
        let foobar = new moment(moment(o.file_last_modified, 'DD-MM-YYYY').toDate());
        return foobar;
      }).reverse();

      this.quickAccessFiles = (() => {
        let itemsPerPage = 4;
        let numberOfPages = Math.ceil(this.filesFetched.length / 4);
        let pages = [];
        let i = 0;

        while (i != numberOfPages) {
          pages.push(this.filesFetched.splice(0, itemsPerPage));
          i++;
        }
        return pages;
      })();

      this.show = true;

      // // Hack: forces display of the first page after data loading
      // setTimeout(() => {
      //   //console.log($('.carousel  .jumbotron')[0].style.display);
      //   $('.carousel  .jumbotron')[0].style.display = '';
      //   //console.log($('.carousel  .jumbotron')[0].style.display);
      // }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  .jumbotron:first-child {
    display: block !important;
  }
}
</style>

