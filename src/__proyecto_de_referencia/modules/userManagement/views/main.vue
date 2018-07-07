<template>
  <div>

    <v-alert v-model="alert" type="success" dismissible transition="scale-transition">
      User Management Module
    </v-alert>

    <!-- SNACKBAR -->
    <v-snackbar :timeout="snackbar.timeout" :bottom="true" :right="true" :vertical="true" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

    <!-- MODAL -->
    <!-- EVENT LISTENERS HAVE TO BE USED WITHOUT PARENTHESIS TO PASS
    RETURNED VALUES FROM CHILD'S $EMMIT'S TO THE FUNCTION IN PARENT-->
    <modal v-bind:show="dialogs.userDelete.show" @close="deleteItemConfirm">
      <h1>¿Está seguro?</h1>
      <p>¿Está seguro que desea eliminar el usuario?</p>
    </modal>

    <br><hr><br>

    <h5>Lista de usuarios</h5>

    <!-- NEW USER MODAL -->
    <v-layout>
      <v-dialog v-model="showModal" scrollable max-width="600px">
        <v-card>

          <!-- TÍTULO -->
          <v-card-title>
            <h1 class="headline m-auto mt-4">{{ formTitle }}</h1>
          </v-card-title>

          <!-- CONTENIDO-FORMULARIO -->
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <!-- NOMBRE -->
                <v-flex xs6>
                  <v-text-field v-model="editedItem.name" label="Nombre" hint="Nombre de la persona"></v-text-field>
                </v-flex>

                <!-- RUT -->
                <v-flex xs6>
                  <v-text-field hint="ej. x.xxx.xxx-x" label="Rut" v-model="editedItem.rut"></v-text-field>
                </v-flex>

                <!-- POSICIÓN -->
                <v-flex xs6>
                  <v-text-field hint="Cargo en la empresa" label="Posición" v-model="editedItem.position"></v-text-field>
                </v-flex>

                <!-- AREA DE TRABAJO -->
                <v-flex xs6>
                  <v-text-field label="Área" hint="Área en la que se desempeña el usuario" v-model="editedItem.areaName"></v-text-field>
                </v-flex>

                <!-- ID DE CONTRATO -->
                <v-flex xs6>
                  <v-text-field v-model="editedItem.contract" label="Id de contrato" hint="Id de referencia del contrato"></v-text-field>
                </v-flex>

                <!-- FECHA DE NACIMIENTO-->
                <v-flex xs6>
                  <v-menu :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                    <v-text-field slot="activator" v-model="computedDateFormatted" label="Fecha de Nacimiento" hint="Fecha de nacimiento de la persona" readonly></v-text-field>

                    <v-date-picker v-model="editedItem.born" no-title @input="menu = false"></v-date-picker>

                  </v-menu>
                </v-flex>

                <!-- TELÉFONO -->
                <v-flex md2>
                  <v-subheader>Teléfono</v-subheader>
                </v-flex>
                <v-flex md4>
                  <v-text-field name="" prefix="+" label="ej. 560 0000 0000" :mask="'###-####-####'" v-model="editedItem.phone.mobile"></v-text-field>
                </v-flex>

                <!-- ANEXO -->
                <v-flex md2>
                  <v-subheader>Anexo</v-subheader>
                </v-flex>
                <v-flex md4>
                  <v-text-field prefix="#" label="ej. 1234" :mask="'####'" v-model="editedItem.phone.annex"></v-text-field>
                </v-flex>

                <!-- CORREO ELECTRONICO -->
                <v-flex xs6>
                  <v-text-field hint="Usado para el ingreso a la plataforma" label="Correo electrónico" v-model="editedItem.username"></v-text-field>
                </v-flex>

                <!-- CONTRASEÑA -->
                <v-flex xs6>
                  <v-text-field v-model="editedItem.password" label="Contraseña" type="password" hint="Contraseña de inicio de sesión de la persona" required></v-text-field>
                </v-flex>

                <!-- ROL DE USUARIO -->
                <v-flex xs11>
                  <v-select :items="['trabajador', 'ejecutivo', 'master']" label="Rol de usuario" v-model="editedItem.role" required></v-select>
                </v-flex>

                <!-- TOOLTIP -->
                <v-flex xs1 align-content-end d-flex>
                  <v-icon v-tooltip.bottom-end="'Nivel de privilegios que poseerá el usuario.'" style="color:orange;">fa-question-circle</v-icon>
                </v-flex>

                <!-- PERMISOS -->
                <!-- TO-DO
                  - Fetch permits available from database
                  - throw array into a v-select
                 -->
                <v-flex xs11>
                  <v-select :items="availablePermits" label="Permisos" multiple autocomplete chips v-model="editedItem.permits"></v-select>
                </v-flex>

                <!-- TOOLTIP -->
                <v-flex xs1 align-content-end d-flex>
                  <v-icon v-tooltip.bottom-end="'Establece los permisos tanto de lectura como de escritura del rol otorgado al usuario. En el caso de los administradores, también define los módulos disponibles dentro del dashboard correspondiente.'" style="color:orange;">fa-question-circle</v-icon>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>

          <!-- ACTIONS -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
    </v-layout>

    <!-- DATA TABLE -->
    <v-card>

      <!-- TITULO DE TABLA -->
      <v-card-title>
        <v-text-field v-model="userSearchField" append-icon="search" label="Buscar usuario" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showModal = true">Nuevo Usuario</v-btn>
      </v-card-title>

      <!-- TABLA DE DATOS -->
      <v-data-table item-key="_id" :loading="isTableLoading" :headers="tableHeaders" :items="userList" :search="userSearchField">
        <!-- DATATABLE TEMPLATE -->
        <template slot="items" slot-scope="props">
          <tr>
            <!-- DISPLAY MORE -->
            <td class="m0 p0">
              <v-layout row align-center>
                <v-flex class="text-md-center hover" @click="props.expanded = !props.expanded" align-center>
                  <v-icon v-if="!props.expanded">fa-plus-circle</v-icon>
                  <v-icon v-if="props.expanded">fa-minus-circle</v-icon>
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/NOMBRE -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.name }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/RUT -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.rut }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/CONTRACT -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.contract }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/AREANAME -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.areaName }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/POSITION -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.position }}

                </v-flex>
              </v-layout>
            </td>

            <!-- TD/BORN -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.born }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/MOBILE -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.phone.mobile }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/ANNEX -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.phone.annex }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/USERNAME -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  {{ props.item.username }}
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/RESTABLECER -->
            <td>
              <v-layout row align-center>
                <v-flex class="text-md-center">
                  <v-btn class="btn">Restablecer</v-btn>
                </v-flex>
              </v-layout>
            </td>

            <!-- TD/CRUD -->
            <td>
              <v-btn icon class="mx-0" @click="editItem(props.item)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItemConfirm({item: props.item})">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>

        <!-- ROW EXPANSION -->
        <template slot="expand" slot-scope="props">

          <v-layout align-center>
            <v-flex md6 class="text-md-center">
              <h4>Permisos Asociados:</h4>
              <v-chip v-for="permit of props.item.permits" :key="permit.indexOf()"> {{ permit }} </v-chip>
            </v-flex>
            <v-flex md6 class="text-md-center">
              <h4>Rol de Usuario en Sistema:</h4>
              <v-btn v-tooltip.bottom="'Establece los permisos tanto de lectura como de escritura del rol otorgado al usuario. En el caso de los administradores, también define los módulos disponibles dentro del dashboard correspondiente'" color="error" style="text-transform:uppercase;">{{ props.item.role }}</v-btn>
            </v-flex>
          </v-layout>

        </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          No se encontraron resultados para "{{ userSearchField }}".
        </v-alert>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
// FETCH_USERS, FETCH_SYS_PERMISSIONS
import { FETCH_USERS, SAVE_USER, UPDATE_USER, DELETE_USER, FETCH_SYS_PERMISSIONS } from '../store/actions.js';
import modal from './components/modal';
import 'vuetify/dist/vuetify.min.css';
import { VTooltip } from 'v-tooltip';
import Vuetify from 'vuetify';
import Vue from 'vue';

Vue.directive('tooltip', VTooltip);
Vue.use(Vuetify, {
  theme: {
    primary: '#d3d3d3',
    accent: '#e65c00',
  },
});

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

/**
 * To-Do:
 * - [OK] List of available users
 * - [OK] Modal usage
 * - [OK] I have to be able to edit the userdata (as admin)
 * - [OK] I can create new users
 * - [  ] I can assign departments to them (fetch permissions)
 * - [  ] User's C[  ]R[  ]U[  ]D[  ]
 * - [  ] I can filter the users by different categories
 * - [OK] I can use a search box to search through the users
 * - [OK] This has to be done through AJAX
 * - [  ] AJAX Pagination
 */
export default {
  data() {
    return {
      tableHeaders: [
        {
          text: 'Ver más',
          align: 'left',
          width: '1px',
          sortable: false,
          value: '_id',
        },
        {
          text: 'Nombre',
          align: 'center',
          value: 'name',
        },
        {
          text: 'RUT',
          align: 'center',
          value: 'rut',
        },
        {
          text: 'ID de contrato',
          align: 'center',
          sortable: true,
          value: 'contract',
        },
        {
          text: 'Área',
          align: 'center',
          value: 'areaName',
        },
        {
          text: 'Posición',
          align: 'center',
          value: 'position',
        },
        {
          text: 'Fecha de Nacimiento',
          align: 'center',
          value: 'rut',
        },
        {
          text: 'Teléfono',
          align: 'center',
          value: 'phone.mobile',
        },
        {
          text: 'Anexo',
          align: 'center',
          value: 'phone.annex',
        },
        {
          text: 'Email',
          align: 'center',
          value: 'username',
        },
        {
          text: 'Contraseña',
          align: 'center',
          value: 'password',
        },
        {
          text: 'Editar',
          align: 'center',
          value: '_id',
        },
      ],
      alert: true,
      selected: [],
      userList: [],
      userSearchField: '',
      showModal: false,
      snackbar: {
        show: true,
        timeout: 1000,
        text: 'Hello World',
      },
      editedIndex: -1,
      editedItem: {
        areaName: '',
        born: null,
        contract: '',
        name: '',
        permits: '',
        phone: {},
        position: '',
        role: '',
        rut: '',
        userName: '',
        password: '',
      },
      defaultItem: {
        areaName: '',
        born: null,
        contract: '',
        name: '',
        permits: [],
        phone: {},
        position: '',
        role: '',
        rut: '',
        userName: '',
        password: '',
      },
      date: null,
      menu: false,
      dateFormatted: null,
      dialogs: {
        userDelete: {
          show: false,
          data: {},
        },
      },
      availablePermits: [],
    };
  },

  /**
   * REMEMBER NOT TO USE ARROW FUNCTION
   * WHEN CALLING STORE GETTERS!!!!!!!!
   */

  computed: {
    isTableLoading: function() {
      return this.$store.getters.isTableLoading;
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario';
    },
    computedDateFormatted() {
      return this.formatDate(this.editedItem.born);
    },
  },

  created() {
    this.fetchUsers();
    this.fetchPermits();
  },

  watch: {
    // menu(val) {
    //   val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'));
    // },
    showModal(val) {
      val || this.close();
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.editedItem.born);
    },
  },

  mounted() {},

  methods: {
    fetchUsers() {
      this.$store.dispatch(FETCH_USERS).then(users => {
        this.userList = users;
      });
    },
    fetchPermits() {
      this.$store.dispatch(FETCH_SYS_PERMISSIONS).then(permits => {
        this.availablePermits = permits;
      });
    },
    removeUser(_id) {
      this.$store.dispatch(DELETE_USER, this.editedItem._id).then(() => {
        // Object.assign(this.userList[this.editedIndex], this.editedItem);
        // OR
        this.fetchUsers();
      });
    },
    // updateUser(user) {
    //   // Update User Request
    // },
    editItem(item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showModal = true;
    },
    newItem(item) {
      console.log('Creating new Item');
      this.editedIndex = -1;
      this.showModal = true;
    },
    close() {
      this.showModal = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        //;
        this.$store.dispatch(UPDATE_USER, this.editedItem).then(() => {
          // Object.assign(this.userList[this.editedIndex], this.editedItem);
          // OR
          this.fetchUsers();
        });
        // Async code here
      } else {
        this.$store.dispatch(SAVE_USER, this.editedItem).then(() => {
          // this.userList.push(this.editedItem);
          // OR
          this.fetchUsers();
        });
        // Async code here
        // new User
      }
      this.close();
    },
    formatDate(date) {
      if (!date) return null;
      console.log(date);
      const [year, month, day] = date.split('-');
      // return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    },
    deleteItemConfirm(dialogData) {
      this.dialogs.userDelete.show = !this.dialogs.userDelete.show;

      if (dialogData.response != null) {
        if (dialogData.response == true) {
          /**
           * USER ITEM DELETED
           */
          let item = this.dialogs.userDelete.data;
          this.$store.dispatch(DELETE_USER, item).then(() => {
            this.fetchUsers();
            // OR
            // let itemIndex = this.userList.indexOf(item);
            // this.userList.splice(itemIndex, 1);
          });
          this.dialogs.userDelete.data = {};
          // Async code Here
          console.log('USER DELETED');
        } else {
          /**
           * USER CANCELED
           */
          this.dialogs.userDelete.data = {};
          console.log('CANCELED');
        }
      } else {
        /**
         * OPEN DIALOG CONFIRMATION
         */
        console.log('LOADING USER');
        console.log(dialogData.item);
        this.dialogs.userDelete.data = dialogData.item;
      }
    },
  },

  components: {
    modal,
  },
};
</script>

<style lang="scss">
/**
 * TO-DO:
 * - Get this shit outta here. BAAAAAAAAD SCOPE!!!!
 */
.btn {
  margin: 0;
  padding: 0;
}
table.datatable {
  margin-bottom: 0rem !important;
}
.hover {
  cursor: pointer;
}
.tooltip {
  display: block;
  z-index: 10000;
  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }
  &[x-placement^='top'] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^='bottom'] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^='right'] {
    margin-left: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[x-placement^='left'] {
    margin-right: 5px;
    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
