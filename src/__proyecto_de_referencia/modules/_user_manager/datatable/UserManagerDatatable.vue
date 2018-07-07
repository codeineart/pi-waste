<template>
  <div class="user-manager__">
    <!-- SEARCH AREA -->
    <v-layout row align-baseline="" pa-4>
      <v-flex xs6>
        <v-text-field class="search-input" v-model="search" append-icon="fa fa-search" label="Consultar por nombre" @keypress.enter="sendSearchRequest"></v-text-field>
      </v-flex>
      <v-flex xs6>
        <!-- {{ search }} -->
      </v-flex>
    </v-layout>

    <!-- FILES TABLE AREA -->
    <transition name="fade" mode="out-in">
      <v-layout column v-if="!dataIsReady" align-center pt-5 pb-5>
        <v-flex xs12 fill-height pa-5>
          <v-progress-circular :size="150" indeterminate color="orange" pm-5>
            CARGANDO...
          </v-progress-circular>
        </v-flex>
      </v-layout>
      <datatable v-if="dataIsReady" v-bind="$data" :HeaderSettings="false" :pageSizeOptions="pageSizeOptions" pagination>
      </datatable>
    </transition>

    <!-- ADD NEW FILE -->
    <!-- <v-fab-transition>
      <v-btn fab fixed bottom right dark color="orange" @click.native="openAddFileDialog()">
        <v-icon>cloud_upload</v-icon>
      </v-btn>
    </v-fab-transition> -->

    <!-- NEW FILE DIALOG -->
    <!-- <v-layout row justify-center>
      <v-dialog v-model="showNewFileDialog" persistent max-width="500px">
        <new-file-dialog @close="cancelFileSave" @save="saveFile"></new-file-dialog>
      </v-dialog>
    </v-layout> -->
  </div>
</template>

<script>
import ActionsButtons from './comps/actions_td';
import NewFileDialog from './comps/upload';
import { service, endpoints } from 'src/services/general_service.js';
import moment from 'moment';

export default {
  components: { ActionsButtons, NewFileDialog },
  data: () => ({
    columns: [
      {
        title: 'Nombre de Archivo',
        field: 'file_name',
        sortable: true,
      },
      {
        title: 'Visibilidad',
        field: 'file_visibility',
        sortable: true,
      },
      {
        title: 'Propietario',
        field: 'file_owner',
        sortable: true,
      },
      {
        title: 'Fecha de Creación',
        field: 'file_last_modified',
        sortable: true,
      },
      {
        title: 'Tamaño (MB)',
        field: 'file_size',
        sortable: true,
      },
      {
        title: '_data_layer_url',
        field: 'file_url',
        visible: false,
      },
      {
        title: '_data_layer_type',
        field: 'file_type',
        visible: false,
      },
      {
        title: '_data_layer_id',
        field: 'file_id',
        visible: false,
      },
      {
        title: 'Acciones',
        visible: true,
        tdComp: ActionsButtons,
      },
    ],
    data: [],
    total: 0,
    query: {},
    pageSizeOptions: [25, 50, 100, 200],
    fetchedData: {},
    dataIsReady: true,
    search: '',
    dataStorage: [],
    searchServiceStatus: 'idle', // [idle, loading, error, success]
    showNewFileDialog: false,
  }),
  watch: {
    /**
     * TODO: BUSCADOR EN VISTA + BUSQUEDA POR AJAX
     */
    // search(search) {
    //   if (search.length) {
    //     console.log('Busqueda en vista: ' + search);
    //     this.data = _.filter(this.dataStorage, o => {
    //       // return o.file_name.toLowerCase().search(this.search.toLowerCase()) !== -1; // returns true for matched and false for filtered
    //       let matched = false;
    //       Object.keys(o).forEach(key => {
    //         if (key.match(/^(file_name|file_visibility|file_owner)$/)) {
    //           console.log(o[key]);

    //           matched =
    //             String(o[key])
    //               .toLowerCase()
    //               .search(this.search.toLowerCase()) !== -1;
    //           if (matched) {
    //             console.log('Matched Element');

    //             //console.log(this.purify(o));
    //           }
    //         }
    //       });
    //       return matched;
    //     });
    //   } else {
    //     this.data = this.dataStorage;
    //   }
    // },
    search(search) {
      if (!search.length) {
        this.fetchData(this.query);
      }
    },
    // watches response from the server and translates
    fetchedData: {
      handler(fetchedData) {
        this.data = this.fetchedData.map(file => {
          return {
            file_name: file.name,
            file_visibility: file.available.toString(),
            file_owner: file.creator.name,
            file_last_modified: moment(file.creator.date).format('D-M-YYYY'),
            file_size: file.size_Mb,
            file_url: file.url,
            file_type: file.type,
            file_id: file._id,
          };
        });
        this.dataStorage = this.data;
        this.$emit('data-ready', this.dataStorage);
      },
    },
    // On query change, send data retrieval to the server
    query: {
      handler(query) {
        this.search = ''; // blank search field
        this.fetchData(query); // fetch data
      },
      deep: true, // this is where the magic happens: deep watch
    },
  },
  mounted() {},
  methods: {
    // Controls status of search service
    commitServiceStatus(status) {
      const minDelayBeetweenSearchs = 1000;
      this.searchServiceStatus = status;
      console.info('Search Service Status: ' + `[${status}]`);
      if (status != 'loading' && status != 'idle') {
        setTimeout(
          (() => {
            this.commitServiceStatus('idle');
          }).bind(this),
          minDelayBeetweenSearchs,
        );
      }
    },
    // send search service request
    sendSearchRequest() {
      if (this.searchServiceStatus != 'idle') {
        console.info('Search service chained...please wait');
        return;
      }
      let pattern = this.search;
      console.log('Sending search request');
      this.commitServiceStatus('loading'); // Can be merged with next statement
      this.dataIsReady = false; // Can be merged with previous statement
      service()
        .get(endpoints.files.search + pattern)
        .then(res => {
          this.commitServiceStatus('success');
          this.fetchedData = res.data.data;
          this.total = res.data.count;
          this.dataIsReady = true;
        })
        .catch(err => {
          this.commitServiceStatus('error');
        });
    },

    // Fetches data fof files data table
    fetchData(query) {
      this.dataIsReady = false;
      service()
        .get(endpoints.files.getAllFiles + JSON.stringify(query))
        .then(res => {
          console.info('Fetched data for file management: ');
          console.log(this.purify(res.data));
          this.fetchedData = res.data.data;
          this.total = res.data.count;
          this.dataIsReady = true;
        })
        .catch(err => {
          console.log('Network Error: ' + err);
          console.log('Retrying in 5...');
          let _vm = this;
          setTimeout(() => {
            _vm.fetchData(query);
          }, 5000);
        });
    },
    openAddFileDialog() {
      this.showNewFileDialog = true;
    },

    // Catches save events from the upload dialog
    saveFile(form) {
      /**
       * TO-DO
       * - Validate Fields
       */
      console.log(form);
      //this.showNewFileDialog = false;
      // Launch space ships
      service()
        .post(endpoints.files.gfsUpload, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          /**
           * SERVER REPONSE FROM FILE UPLOAD
           */
          alert('Respuesta del servidor: ' + res);
        });
    },
    cancelFileSave() {
      this.showNewFileDialog = false;
      console.info('File upload canceled');
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/style.scss';

.user-manager__ {
  .search-input {
    color: #ccc;
    input {
      color: #444 !important;
    }
  }

  .dataTransition {
    opacity: 0;
    transition: opacity 3s linear;
  }

  [name='Datatable'] {
    i {
      color: #757575 !important;
    }
    thead {
      background-color: none !important;
      th {
        color: #757575 !important;
      }
      tr {
        text-align: left;
      }
      .theme--light .table tbody tr:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
      tr > th {
        // font-size: 16px;
      }
      i.fa {
        &.fa-sort,
        &.fa-sort-up,
        &.fa-sort-down {
          color: #ffffff;
          //opacity: 0.5;
          //transition: all 0.4s ease;
          &:hover {
            opacity: 1;
          }
        }
        &.fa-sort-up,
        &.fa-sort-down {
          opacity: 1;
        }
      }
    }
    tbody {
      tr {
        transition: all 0.3s ease !important;
        td {
          color: $text-simple-gray;
          text-align: left;
          height: 60px !important;
        }
        &:nth-child(odd) {
          //background-color: #f5f5f5;
        }
      }
    }
    & div:last-child {
      // pagination
      .col-sm-6 {
        width: 50%;
        display: block;
        float: left;
        margin-top: 15px;
        .pagination.pull-right {
          margin-right: 75px !important;
        }
      }
      .pull-right {
        float: right;
      }
      select {
        border: 1px solid $text-simple-gray;
        padding: 0 5px;
        text-align: center;
      }
      .pagination {
        margin-top: 10px;
        li {
          a {
            display: block;
            background-color: #f5f5f5;
            text-align: center;
            padding: 7px;
            box-sizing: border-box;
            width: 32px;
            height: 32px;
            margin-left: 10px;
            border-radius: 50%;
            text-decoration: none;
            font-weight: 600;
            color: $text-simple-gray;
          }
          &.active a {
            background-color: $orange-color;
            color: #ffffff;
          }
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
