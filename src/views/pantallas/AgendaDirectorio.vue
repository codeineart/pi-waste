<template>
  <v-app column class="agenda_directorio__">
    <!-- NAVBAR -->
    <NavBar></NavBar>

    <!-- SPLASH SCREEN -->
    <general-header src="/static/img/bg/agenda_direct.jpg">
      Agenda directorio
    </general-header>

    <!-- CONTENT -->
    <v-layout class="content-block" row wrap>

      <!-- COLUMNAS -->
      <v-layout column>

        <!-- TITULO - NAVEGACIÓN - PESTAÑAS -->
        <v-tabs v-model="tab">
          <v-tab href="#agenda">
            <h3>Agenda</h3>
          </v-tab>
          <v-tab href="#directorio">
            <h3>Directorio</h3>
          </v-tab>
        </v-tabs>

        <!-- PESTAÑAS -->
        <v-tabs-items v-model="tab">

          <!-- PESTAÑA CALENDARIO -->
          <v-tab-item id="agenda">

            <!-- AGENDA -->
            <v-container grid-list-md fill-height>

              <!-- FULLCALENDAR OBJECT -->
              <v-layout row wrap fill-height>
                <Calendar ref="ref_full_calendar" @event-selected="modalShowEventInformation"></Calendar>
              </v-layout>

              <!-- ADD NEW EVENT -->
              <v-fab-transition>
                <v-btn fab absolute bottom right dark color="orange" @click.native="openAddEventDialog()">
                  <v-icon>control_point</v-icon>
                </v-btn>
              </v-fab-transition>

              <!-- NEW EVENT FORM DIALOG -->
              <v-dialog v-model="showNewEventForm" max-width="500px">
                <v-card>
                  <v-container>
                    <v-layout row wrap>

                      <!-- TITULO -->
                      <v-flex xs12>
                        <h2 class="text-xs-center form-header--big">Añadir Evento</h2>
                        <!-- <span>{{ jwt }}</span> -->
                      </v-flex>

                      <v-layout row align-center>
                        <!-- NOMBRE DEL EVENTO -->
                        <v-flex xs6 align-content-center>
                          <v-text-field label="Título del evento" v-model="form.title"></v-text-field>
                        </v-flex>

                        <!-- FLAG FULL-DAY -->
                        <v-flex xs6 ml-5>
                          <v-checkbox disabled label="Todo el día" class="shrink" v-model="isEventFullDay" color="orange" :value="true" hide-details></v-checkbox>
                        </v-flex>
                      </v-layout>

                      <!-- DESCRIPCIÓN DEL EVENTO -->
                      <v-flex xs12>
                        <label class="input-group" for="event-textarea">Descripción del evento </label>
                        <textarea ref="event_textarea_ref" name="event-textarea" id="" cols="30" rows="5" v-model="form.details"></textarea>
                        <!-- <v-text-field label="Descripción del evento"></v-text-field> -->
                      </v-flex>

                      <!-- FECHA INICIO -->
                      <v-flex xs6>
                        <v-menu ref="start_date" :close-on-content-click="false" v-model="calInputs.start.showInput" :nudge-right="40" :return-value.sync="calInputs.start.date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                          <v-text-field slot="activator" v-model="calInputs.start.date" label="Fecha de Inicio" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker :first-day-of-week="1" locale="es-cl" color="orange" v-model="calInputs.start.date" @input="$refs.start_date.save(calInputs.start.date)"></v-date-picker>

                        </v-menu>
                      </v-flex>

                      <!-- HORA INICIO -->
                      <transition name="fade">
                        <v-flex xs6 v-if="!isEventFullDay">
                          <v-menu ref="start_time" :close-on-content-click="false" v-model="calInputs.start.showInput.time" :nudge-right="40" :return-value.sync="calInputs.start.time" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" v-model="calInputs.start.time" label="Hora de Inicio" prepend-icon="access_time" readonly></v-text-field>
                            <v-time-picker color="orange" v-model="calInputs.start.time" @change="$refs.start_time.save(calInputs.start.time)"></v-time-picker>
                          </v-menu>
                        </v-flex>
                      </transition>

                      <!-- FECHA FINAL -->
                      <v-flex xs6>
                        <v-menu ref="end_date" :close-on-content-click="false" v-model="calInputs.end.showInput.date" :nudge-right="40" :return-value.sync="calInputs.end.date" lazy transition="scale-transition" offset-y full-width min-width="290px">
                          <v-text-field slot="activator" v-model="calInputs.end.date" label="Fecha de Término" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker :first-day-of-week="1" locale="es-cl" color="orange" v-model="calInputs.end.date" @input="$refs.end_date.save(calInputs.end.date)"></v-date-picker>

                        </v-menu>
                      </v-flex>

                      <!-- HORA FINAL -->
                      <transition name="fade">
                        <v-flex xs6 v-if="!isEventFullDay">
                          <v-menu ref="end_time" :close-on-content-click="false" v-model="calInputs.end.showInput.time" :nudge-right="40" :return-value.sync="calInputs.end.time" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                            <v-text-field slot="activator" v-model="calInputs.end.time" label="Hora de Término" prepend-icon="access_time" readonly></v-text-field>
                            <v-time-picker color="orange" v-model="calInputs.end.time" @change="$refs.end_time.save(calInputs.end.time)"></v-time-picker>
                          </v-menu>
                        </v-flex>
                      </transition>

                      <!-- VISIBILIDAD ROL MASTER -->
                      <v-flex xs12 v-if="jwt.role == 'master'">
                        <v-container>
                          <v-layout row wrap class="form-header">
                            <v-flex xs12>
                              <v-icon style="color:grey;cursor:pointer;">language</v-icon>
                              Visibilidad
                            </v-flex>
                          </v-layout>
                          <v-radio-group v-model="isEventPublic" row hide-details>
                            <v-radio label="Evento Privado" color="orange" :value="false" hide-details></v-radio>
                            <v-radio label="Evento Público" color="orange" :value="true" hide-details></v-radio>
                          </v-radio-group>
                        </v-container>

                      </v-flex>

                      <!-- <v-flex xs12>
                        <h6> Placeholder </h6>
                      </v-flex> -->

                      <v-flex xs6 d-flex>
                        <v-btn class="form-btn" @click="showNewEventForm = false">Cancelar</v-btn>
                      </v-flex>
                      <v-flex xs6 d-flex>
                        <v-btn class="form-btn" @click="saveEvent">Guardar</v-btn>
                      </v-flex>

                    </v-layout>
                  </v-container>
                </v-card>
              </v-dialog>

            </v-container>
          </v-tab-item>

          <!-- PESTAÑA DIRECTORIO -->
          <v-tab-item id="directorio">
            <!-- DIRECTORIO -->
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs9>
                </v-flex>
                <v-flex xs3>
                  <v-text-field class="search-input" v-model="search" label="Búsqueda"></v-text-field>
                </v-flex>
                <FileTable style="margin-top: 30px; width: 100%;" ref="table"></FileTable>
              </v-layout>
            </v-container>
          </v-tab-item>

        </v-tabs-items>

      </v-layout>
    </v-layout>

    <div class="spacer--180"></div>

    <general-footer></general-footer>

    <!-- UI GLOBAL ELEMENTS -->

    <!-- MODAL VISUALIZACIÓN DE EVENTOS -->
    <v-layout row justify-center>
      <v-dialog v-model="eventDetailsDialog.show" max-width="500">
        <v-card>

          <!-- TÍTULO Y ACCIÓN DELETE -->
          <v-card-title class="headline">
            <v-layout row align-baseline>
              <v-flex xs10>
                <h1 class="form-header" style="word-wrap: break-word;">{{ eventDetailsDialog.data.title }}</h1>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs2 class="text-xs-right" style="align-self: center;">
                <v-spacer></v-spacer>

                <!-- DELETE CONFIRMATION MODAL -->
                <v-dialog hide-overlay v-model="eventDetailsDialog.confirm.show" max-width="350px">
                  <v-card class="pa-3">
                    <v-card-title class="text-xs-center">
                      <span class="mx-auto"> ¿Está seguro? </span>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                      <div class="mx-auto">
                        <v-btn class="form-btn" @click.stop="eventDetailsDialog.confirm.show = false">Cancelar</v-btn>
                        <v-btn class="form-btn" @click.stop="modalDeleteEvent(eventDetailsDialog.data.id)">Confirmar</v-btn>
                      </div>

                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <!-- DELETE CONFIRMATION TRIGGER -->
                <v-btn icon class="form-btn" @click="eventDetailsDialog.confirm.show = true">
                  <v-icon>delete</v-icon>
                </v-btn>

              </v-flex>
            </v-layout>
          </v-card-title>

          <!-- DETALLES -->
          <v-card-text class="pt-5 pb-5 pl-5 pr-5 align-xs-center">
            <p class="">"{{eventDetailsDialog.data.details}}"</p>
          </v-card-text>

          <!-- FECHAS -->
          <v-card-text class="form-header ma-0 pa-0 pb-2 mb-2">
            <v-layout row class="" justify-center="">
              <v-flex xs5>
                <v-icon color="black">date_range</v-icon>
                Inicio: {{ eventDetailsDialog.data.start | humanDate }}
              </v-flex>
              <v-flex xs5>
                <v-icon color="black">date_range</v-icon>
                Término: {{eventDetailsDialog.data.end | humanDate}}
              </v-flex>
            </v-layout>
          </v-card-text>

          <!-- ACCIONES -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="form-btn" flat @click.native="eventDetailsDialog.show = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from 'src/component/navbar';
import GeneralHeader from 'src/component/header';
import GeneralFooter from 'src/component/footer';
import FileTable from 'src/component/directorio_file_table';
import Calendar from 'src/component/calendario';
import VueJwtDecode from 'vue-jwt-decode';
import moment from 'moment';
import { service, endpoints } from 'src/services/general_service';

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
    tab: 'agenda',
    search: '',
    listFiltered: [],
    list: [],
    showNewEventForm: false,
    eventDetailsDialog: {
      data: {},
      show: false,
      confirm: {
        show: false,
      },
    },
    jwt: VueJwtDecode.decode(localStorage.getItem('user-token')),
    calInputs: {
      start: {
        showInput: {
          date: '',
          time: '',
        },
        date: moment(Date.now()).format('YYYY-MM-DD'),
        time: moment(Date.now()).format('h:mm'),
      },
      end: {
        showInput: {
          date: '',
          time: '',
        },
        date: moment(Date.now())
          .add(1, 'days')
          .format('YYYY-MM-DD'),
        time: moment(Date.now()).format('h:mm'),
      },
    },
    formEventAvailability: [],
    isEventPublic: false,
    isEventFullDay: true,
    form: {
      title: '',
      details: '',
    },
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter, FileTable, Calendar },
  watch: {
    search() {
      this.filter();
    },
    tab() {
      // $('.picker').css('overflow', 'hidden');
      $('.tabs__items').css('overflow', 'hidden');

      setTimeout(() => {
        // $('.picker').css('overflow', 'visible');
        $('.tabs__items').css('overflow', 'visible');
      }, 700);
    },
  },
  mounted() {
    $('.tabs__items').css('overflow', 'visible');
    if (this.$route.params.type === 'directorio') this.tab = 'directorio';
    if (this.$route.params.filter) {
      this.search = this.$route.params.filter;
    } else {
      this.filter();
    }
  },
  methods: {
    filter() {
      if (this.search.length) {
        this.$refs.table.loadData(data => {
          this.$refs.table.data = _.filter(data, o => {
            return o.name.toLowerCase().search(this.search.toLowerCase()) !== -1;
          });
        });
      } else {
        this.$refs.table.loadData(data => {
          this.$refs.table.data = data;
        });
      }
    },
    openAddEventDialog() {
      this.showNewEventForm = true;
    },
    saveEvent() {
      console.clear();
      let data = {
        creator: {
          ref: this.jwt._id,
          name: this.jwt.name,
        },
        title: this.form.title,
        details: this.form.details,
        created: moment(Date.now())
          .subtract(4, 'hours')
          .toDate(),
        type: this.isEventPublic ? 'global' : 'personal',
        event: {
          allDay: this.isEventFullDay ? true : false,
          start: (() => {
            moment.locale('es-cl');
            let date = this.calInputs.start.date;
            let time = this.calInputs.start.time;
            let momentDate = moment(`${date} ${time}`);
            momentDate.subtract(4, 'hours'); // Timezone correction
            // console.log(momentDate.toDate());
            return momentDate.toDate();
          })(),
          end: (() => {
            moment.locale('es-cl');
            let date = this.calInputs.end.date;
            let time = this.calInputs.end.time;
            let momentDate = moment(`${date} ${time}`);
            momentDate.subtract(4, 'hours'); // Timezone correction
            // console.log(momentDate.toDate());
            return momentDate.toDate();
          })(),
        },
      };
      console.info('Datos a Enviar:');
      console.log(this.purify(data));
      service()
        .post(endpoints.events.postEvent, data)
        .then(res => {
          alert('Éxito');
          this.$refs.ref_full_calendar.fetchEvents();
          this.showNewEventForm = false;
        })
        .catch(err => {
          alert('Error: ' + err);
        });
    },
    modalShowEventInformation(event) {
      this.$cout(event, 'Evento capturado en AgendaDirectorio.vue', true);
      this.eventDetailsDialog = {
        data: event,
        show: true,
        confirm: {
          show: false,
        },
      };
    },
    modalDeleteEvent(id) {
      service()
        .delete(endpoints.events.delete + id)
        .then(res => {
          this.$cout(res, 'Delete event response: ');
          this.eventDetailsDialog.show = false;
          this.eventDetailsDialog.confirm.show = false;
          this.$refs.ref_full_calendar.fetchEvents();
        })
        .catch(err => {
          this.$cout(err, 'Delete event response: ');
          alert('Error al intentar eliminar evento del sistema. Compruebe su conexión a internet');
          this.eventDetailsDialog.show = false;
          this.eventDetailsDialog.confirm.show = false;
          this.$refs.ref_full_calendar.fetchEvents();
        });
    },
  },
  filters: {
    humanDate(value) {
      if (!value) return '';
      moment().locale('es-cl');
      return moment(value).format('DD MMM YYYY');
    },
  },
};
</script>

<style lang="scss">
@import 'src/assets/style.scss';

.agenda_directorio__ {
  font-weight: 400;
  color: $gray-color;

  label[for='event-textarea'] {
    color: rgba(0, 0, 0, 0.54);
  }
  .form-btn {
    background-color: #e65c00 !important;
    color: #fff;
    &:hover {
      background-color: rgb(28, 34, 47) !important;
    }
  }
  textarea[name='event-textarea'] {
    margin-top: 15px;
    margin-bottom: 30px;
    font-size: 16px;
    display: block;
    width: 100%;
    border: 0;
    padding: 10px 5px;
    background: white no-repeat;
    // background-image: linear-gradient(to bottom, #1abc9c, #1abc9c), linear-gradient(to bottom, silver, silver);
    background-image: linear-gradient(to bottom, orange, orange), linear-gradient(to bottom, silver, silver);
    /* sizes for the 2 images (default state) */
    background-size: 0 2px, 100% 1px;
    /* positions for the 2 images. Change both "50%" to "0%" or "100%" and tri again */
    background-position: 50% 100%, 50% 100%;

    /* animation solely on background-size */
    transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    &:focus {
      background-size: 100% 2px, 100% 1px;
      outline: none;
    }
  }

  .form-header {
    font-size: 16px;
    font-weight: 400;
    color: $gray-color;
    position: relative;
    &::before {
      content: '';
      width: 100%;
      height: 2px;
      background: $orange-color;
      position: absolute;
      bottom: -4px;
    }
  }
  .form-header--big {
    font-weight: 400;
    color: $gray-color;
    position: relative;
    border-bottom: solid 2px $orange-color;
    margin-bottom: 1rem;
  }
  .availability-checkboxes {
    .cursorNotAllowed {
      cursor: not-allowed;
    }
    .input-group--disabled {
      label {
        color: rgba(0, 0, 0, 0.15);
      }
      .input-group__input {
        i {
          color: darkorange !important;
        }
      }
    }
  }

  .search-input {
    width: 100%;
    margin: 0;
    color: #666666 !important;
    .theme--light .input-group input {
      color: #666666 !important;
    }
    .input-group--disabled {
      color: rgba(0, 0, 0, 0.3);
    }
  }

  /* Estilos de fullcalendar */
  .fc-event,
  .fc-event-dot {
    background-color: orange;
    &:hover {
      background-color: #e65c00 !important;
    }
  }

  .fc-event {
    border-color: orange;
    font-weight: 500;
    &:hover {
      border-color: #e65c00;
      transition: 0.1s transform linear;
      transform: scale(1.01);
    }
  }
}

.tabs__item.tabs__item--active {
  h3 {
    font-weight: 600;
    width: 300px;
  }
}
.tabs__item.tabs__item {
  h3 {
    width: 300px;
    text-align: left;
  }
}

.theme--light .tabs__bar {
  background-color: transparent;
}
.theme--light .input-group input {
  color: #666666 !important;
}

.search-input .icon.material-icons.input-group__append-icon {
  color: rgba(0, 0, 0, 0.54) !important;
}

.input-group input {
  color: black !important;
}
</style>

