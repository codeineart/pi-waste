<template>
  <v-layout column wrap fill-height="">
    <v-flex xs12 mt-5>
      <!-- FULLCALENDAR -->
      <FullCalendar ref="calendar" :events="events" @event-selected="onCalendarEventClick" :defaultView="'month'" :header="config.header" :config="config"></FullCalendar>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import { FullCalendar } from 'vue-full-calendar';
import { service, endpoints } from 'src/services/general_service.js';

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

import moment from 'moment';

export default {
  data: () => ({
    events: [],
    eventsFetched: [],
    config: {
      locale: 'es',
      header: {
        left: 'today',
        center: 'title',
        right: 'prev,next',
      },
    },
  }),
  props: {},
  components: { FullCalendar },
  watch: {},
  computed: {},
  mounted() {
    this.fetchEvents();
  },
  methods: {
    onCalendarEventClick(event) {
      this.$emit('event-selected', event);
    },
    fetchEvents() {
      this.eventsFetched = [];
      this.events = [];
      this.eventsFetched = service()
        .get(endpoints.events.getAllevents)
        .then(response => {
          // console.info('Respuesta del servidor');
          // console.log(response.data.events);
          this.$cout(response.data.events, 'Respuesta del servidor', false, false, true);
          this.eventsFetched = response.data.events;

          this.eventsFetched.forEach(event => {
            this.events.push({
              id: event._id,
              title: event.title,
              start: event.event.start,
              end: event.event.end,
              allDay: event.event.allDay,
              details: event.details,
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import 'fullcalendar/dist/fullcalendar.css';

.modal {
  background-color: white;
  padding: 50px;
}
</style>
