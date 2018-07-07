<template>
  <v-layout row>
    <v-flex xs4 v-if="editImplemented">
      <v-btn small flat fab class="btn btn-default" @click.native="">
        <v-icon medium>
          edit
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn small flat fab class=" btn btn-default " @click.native="remove">
        <v-icon medium>
          delete
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex>
      <v-btn small flat fab class="btn btn-default " @click.native="download">
        <v-icon medium>
          cloud_download
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>

</template>

<script>
//import { service, endpoints } from 'src/services/general_service.js';
import axios from 'axios';
import { service, endpoints } from 'src/services/general_service.js';

export default {
  data: () => ({
    editImplemented: false,
  }),
  props: ['row', 'nested'],
  created() {},
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
        link.setAttribute('download', this.row.file_name); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    remove() {
      let id = this.row.file_id;
      console.log('Deleting');
      console.log(endpoints.files.delete + id);

      service()
        .delete(endpoints.files.delete + id)
        .then(res => {
          // EMIT EVENT
          console.log(res);
        })
        .catch(err => {
          // EMIT EVENT
          console.log(err);
        });
      // alert(`Archivo a remover: ${id}`);
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
