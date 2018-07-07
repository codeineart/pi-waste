<template>
  <v-layout column fill-height class="agenda__">
    <v-flex md12 row align-center d-flex class="header">
      <h1>Agenda Telefónica</h1>
      <v-spacer></v-spacer>
      <v-icon color="white">fa fa-phone</v-icon>
    </v-flex>
    <v-flex md12 fill-height class="board--dark">
      <div class="box">
        <p style="font-size:1.3rem;text-align:left;">Nombre o apellido de la persona que desea buscar</p>
        <v-text-field class="agenda-search-input" :append-icon="'search'" v-model="search" solo label="" style=""></v-text-field>
        <router-link to="/agenda-directorio">
          <v-btn style="float:right; color:white;background-color:#e65c00;text-transform:capitalize;font-size:1.4rem;font-weight:400;">Ir a directorio</v-btn>
        </router-link>
        <div class="result-list">
          <router-link :to="'/agenda-directorio/directorio/' + item.name" tag="div" class="item" :key="index" v-for="(item, index) in listFiltered">
            <h5 class="name">{{ item.name }}</h5>
            <h6 class="phone">
              <span class="number"><v-icon>local_phone</v-icon> {{ item.phone.mobile }}</span>
              <span class="annexed" v-if="item.phone.annex">- Anexo {{ item.phone.annex }}</span>
            </h6>
          </router-link>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash'

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    first: '',
    drawer: null,
    isActive: false,
    search: '',
    listFiltered: []
  }),
  props: ['directory'],
  components: {},
  watch: {
    search () {
      if (this.search.length > 2) {
        this.listFiltered = _.filter(this.directory, o => {
          return (o.name.toLowerCase().search(this.search.toLowerCase()) !== -1)
        })
      } else {
        this.listFiltered = []
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

//*********************
// FUNCTIONAL CLASSES *
//*********************

.agenda__ {
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
  }

  h1 {
    font-weight: 300;
    font-size: 1.6rem;
    padding: 15px 0;
  }

  .board--dark {
    background-color: $gray-color;
    padding: 20px;
    color: white;
  }

  .agenda-search-input {
    background-color: transparent;
    border: gray solid 2px;
    border-radius: 5px;
    margin-top: 30px;
    margin-bottom: 20px;
    color: white !important;
  }
  .box {
    position: relative;
    .result-list {
      position: absolute;
      left: 0;
      right: 0;
      top: 134px;
      .item {
        background-color: #fff;
        padding: 10px;
        border-top: 1px solid #d4d4d4;
        transition: all .4s ease;
        cursor: pointer;
        &:hover {
          background-color: #e6e6e6;
        }
        &:first-child{
          border-top: 0;
        }
        .name {
          color: $gray-color;
          text-align: left;
          text-transform: uppercase;
          font-size: 14px;
        }
        .phone {
          text-align: left;
          font-weight: 500;
          font-size: 12px;
          color: gray;
          .number {
            .icon {
              color: gray;
              font-size: 16px;
            }
          }
          .annexed {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
