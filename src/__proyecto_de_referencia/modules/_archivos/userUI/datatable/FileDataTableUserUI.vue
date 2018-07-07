<template>
  <div class="modulo-archivos-usuario__">

    <!-- SEARCH AREA -->
    <v-layout row align-baseline="">
      <v-flex xs6>
        <!-- {{ search }} -->
      </v-flex>
      <v-flex xs6>
        <v-text-field class="search-input" v-model="search" append-icon="fa fa-search" label="Buscar en vista"></v-text-field>
      </v-flex>
      <!-- <v-flex>
        <v-btn class="button orange" @click="">
          <span style="margin:auto 10%;">Buscar</span>
          <v-icon small>fa fa-search</v-icon>
        </v-btn>
      </v-flex> -->
    </v-layout>

    <!-- FILES TABLE AREA -->
    <transition name="component-fade" mode="out-in">
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
  </div>
</template>

<script>
// import mockData from './_data_service';
import ActionsButtons from './actions_td';
import { service, endpoints } from 'src/services/general_service.js';
import moment from 'moment';

export default {
  components: { ActionsButtons },
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
        title: 'Tamaño del archivo (MB)',
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
  }),
  watch: {
    search(search) {
      if (search.length) {
        console.log(search);
        this.data = _.filter(this.dataStorage, o => {
          return o.file_name.toLowerCase().search(this.search.toLowerCase()) !== -1;
        });
      } else {
        this.data = this.dataStorage;
      }
    },
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
    $route: {
      handler($route) {
        this.search = '';
        this.query = { limit: 25, offset: 0, sort: '', order: '' };
      },
    },
    query: {
      handler(query) {
        // console.log('FETCH');
        // console.log(this.purify(query));
        this.fetchData(query);
      },
      deep: true, // this is where the magic happens
    },
  },
  mounted() {},
  methods: {
    fetchData(query) {
      let gerencia = this.$route.params.type;
      this.dataIsReady = false;
      // console.log('Fetching data for: ' + gerencia);
      service()
        .get(endpoints.files.getUserAreaAllowedFiles(gerencia, query))
        .then(res => {
          console.info(this.purify(res.data));
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
  },
};
</script>

<style lang="scss">
@import '@/assets/style.scss';

/*
  REMOVE UNNECESARY STUFF
*/
// code {
//   display: none;
//   width: 100%;
// }
// [name='HeaderSettings'] {
//   display: none;
// }

.modulo-archivos-usuario__ {
  .component-fade-enter-active,
  .component-fade-leave-active {
    opacity: 1;
    transition: opacity 0.3s linear;
  }
  .component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
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
    thead {
      background-color: $orange-color;
      th {
        color: #ffffff !important;
      }
      tr > th {
        // font-size: 16px;
      }
      i.fa {
        &.fa-sort,
        &.fa-sort-up,
        &.fa-sort-down {
          color: #ffffff;
          opacity: 0.5;
          transition: all 0.4s ease;
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
          text-align: center;
        }
        &:nth-child(odd) {
          background-color: #f5f5f5;
        }
      }
    }
    & div:last-child {
      // pagination
      .col-sm-6 {
        width: 50%;
        display: block;
        float: left;
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
