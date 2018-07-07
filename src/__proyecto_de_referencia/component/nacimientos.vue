<template>
  <v-layout row wrap class="header nacimientos__" fill-height="">
    <!-- TITULO  -->
    <v-flex>
      <v-flex md12 row align-center d-flex class="header">
        <h1>Cumpleaños</h1>
        <v-spacer></v-spacer>
        <v-icon color="white">fa fa-birthday-cake</v-icon>
      </v-flex>
    </v-flex>

    <!-- CALENHACKDAR -->
    <v-flex>
      <v-date-picker ref="calendario" :attribute="attrs" :picker-date.sync="mountEventsWrapper"></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
import DashboardVue from '@/views/Dashboard.vue';
import moment from 'moment';
import _ from 'lodash';
import Vue from 'vue';

export default {
  data: () => ({
    mountEventsWrapper: null,
    calendarObject: {},
    drawer: null,
    isActive: false,
    callbackRegistry: [{}],
    attrs: [
      {
        key: 'today',
        highlight: {
          backgroundColor: '#ff8080',
          // Other properties are available too, like `height` & `borderRadius`
        },
      },
    ],
  }),
  props: ['events'],
  components: {},
  watch: {},
  computed: {
    getEvents() {
      return this.events.map(event => {
        let date = new Date();
        return date.getFullYear() + event.substring(4, 10);
      });
    },
  },
  components: {},
  watch: {
    mountEventsWrapper(val) {
      $('.picker').css('overflow', 'hidden');
      $('.picker__body').css('overflow', 'hidden');
      setTimeout(() => {
        this.mountEvents(val);
      }, 0);

      setTimeout(() => {
        $('.picker').css('overflow', 'visible');
        $('.picker__body').css('overflow', 'visible');
      }, 1000);
    },
  },
  computed: {
    //draws dots events in home's calendar
    eventDataDraw() {
      return this.eventData.map(event => {
        return events.date;
      });
    },
  },
  mounted() {
    this.uglyMethodForDOMManipulation();
  },
  methods: {
    mountEvents(val) {
      let referenceYearMonth = this.$refs['calendario'].$data.tableDate;

      let referenceMonth = Number(referenceYearMonth.split('-')[1]);

      let calendarDOMBlocks = $('.date-picker-table.date-picker-table--date  div.btn__content');

      let monthEvents = [];

      /**
       * FILTER DATA EVENTS BY CURRENT CALENDAR MONTH
       */
      monthEvents = this.events
        .map(event => {
          // Object { _id: "5b2d527cb25e68f336994113", name: "Zenia Coal", position: "Staff Scientist", born: "2000-06-23T18:47:53.000Z" }
          let ev = (() => {
            let clock = moment(event.born);
            let [year, month, day] = [clock.format('YYYY'), clock.format('M'), clock.format('D')];
            return { year, month, day };
          })();
          return Object.assign(ev, event);
        })
        .filter(ev => {
          return Number(ev.month) == Number(referenceMonth);
        });

      /**
       * WALK DOM DAYS BLOCKS. MATCH THOSE WITH EVENTS
       */
      Object.keys(calendarDOMBlocks).forEach(block => {
        if (block != 'length' && block != 'prevObject') {
          var blockData = calendarDOMBlocks[block];

          //.append(`<h1 class="born-container" style="display:none;"></h1>`);
          $(blockData).parent().append(`
                  <div class="tooltip elevation-20" style="position:absolute;
                  display: none;
                  width: 120px;
                  background-color: #555;
                  color: #fff;
                  text-align: center;
                  padding: 5px 0;
                  border-radius: 6px;
                  z-index:10000 !important;bottom:25px;">
                  </div>`);

          console.log($(blockData).parent());

          let domHasEvents;
          monthEvents.forEach(event => {
            if (event.day == blockData.childNodes[0].data) {
              domHasEvents = true;
              $(blockData)
                .parent()
                .find('.tooltip')
                .append(
                  `<i style="display:inline-block;" class="icon white--text fa fa fa fa-birthday-cake"></i><span style="bottom: 125%;padding:5%;">${event.name}</span></br>
                `,
                );
            }
          });
          if (domHasEvents == true) {
            $(blockData)
              .parent()
              .append(
                `
              <div class="date-picker-table__event warning"></div>
            `,
              )
              .on('mouseover', function() {
                console.log('Hover');
                console.log(this);
                $(this)
                  .find('.tooltip')
                  .css('display', 'inline-block');
              })
              .on('mouseout', function() {
                console.log('Out');
                console.log(this);
                $(this)
                  .find('.tooltip')
                  .css('display', 'none');
              });
          }
        }
      });
    },

    uglyMethodForDOMManipulation() {
      let element = this.$el.querySelector('.picker__title');
      element.style.display = 'none';
      element = this.$el;
      // console.log(element.querySelector('.picker.picker--date.card'));
      let selected = element.querySelector('.picker.picker--date.card');
      selected.classList.remove('card');
      selected.style.width = '100%';
      selected = selected.querySelector('.picker__body');
      selected.style.width = '100%';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

/*
  $gray-color: #1c212e; // 15%
  $gray-color--30: #3a455f; // 30%
  $gray-color--45: #57678e; // 45%
  $gray-color--60: #818eb1; // 60%
  $orange-color: #e65c00; // 50%
  $orange-color--75: #edb191; // 75%
  */

//*********************
// FUNCTIONAL CLASSES *
//*********************

.contenido {
  overflow: hidden;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: left;
  margin: 10px;
}

.header {
  background-color: $orange-color;
  color: white;
  max-height: 51px;
  h1 {
    font-weight: 300;
    font-size: 1.6rem;
    padding: 15px 0;
  }
}

.nacimientos__ {
  .picker__title {
    display: none !important;
  }
  /* Tooltip container */
  .tooltip {
    position: absolute !important;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Tooltip arrow */
  .tooltip .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
}

.picker {
  height: 256px !important;
  border-radius: 0px;
  border-bottom: 1px solid $gray-color;
  overflow: hidden;
}
</style>
