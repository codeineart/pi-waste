<template>
  <v-btn flat class="btn btn-default download" @click.native="download">
    <i class="fa fa-download"></i>
  </v-btn>
</template>

<script>
//import { service, endpoints } from 'src/services/general_service.js';
import axios from 'axios';

export default {
  props: ['row', 'nested'],
  created() {
    //console.clear();
    //console.log(this.purify(this.row));
  },
  methods: {
    download() {
      //alert(`Descargando ${JSON.stringify(this.row)}`);
      axios({
        url: this.row.file_url,
        method: 'GET',
        responseType: 'blob', // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.row.file_name + this.row.file_type); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/style.scss';

.download {
  color: $text-simple-gray !important;
}
</style>
