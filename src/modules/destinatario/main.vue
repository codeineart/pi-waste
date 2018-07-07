<template>
  <div id="dashboard">
    <div>
      <v-card>
        <v-container>
          <h3 class="mb-2">Destinatarios Soporte</h3>
          <div class="row-addresses" v-for="(address) in addresseeSoporte" :key="address._id">
            <h5 class="mb-1">{{ address.name }}</h5>
            <v-text-field v-model="addresseeSoporteEdit[address._id] = address.email" label="Email"></v-text-field>
          </div>
          <h3 class="mt-3 mb-2">Destinatarios Solicitud</h3>
          <div class="row-addresses" v-for="(address) in addresseeSolicitud" :key="address._id">
            <h5 class="mb-1">{{ address.name }}</h5>
            <v-text-field v-model="addresseeSolicitudEdit[address._id] = address.email" label="Email"></v-text-field>
          </div>
          <v-layout align-right>
            <v-flex xs12 text-xs-right>
              <div>
                <v-btn align-center color="success" outline @click.native="save()">Guardar</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
    <v-snackbar :timeout="6000" :top="true" :right="true" v-model="feedback">
      Emails actualizados correctamente
      <v-btn flat @click.native="feedback = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { service } from '@/services/general_service.js';
  import _ from 'lodash'

  export default {
    name: 'comite',
    data: () => ({
      addresseeSoporte: [],
      addresseeSoporteEdit: [],
      addresseeSolicitud: [],
      addresseeSolicitudEdit: [],
      countFeedback: 0,
      feedback: false
    }),
    methods: {
      loadData () {
        service().get('/addressee/soporte').then(res => {
          this.addresseeSoporte = res.data.soporte
        })
        service().get('/addressee/solicitud').then(res => {
          this.addresseeSolicitud = res.data.solicitud
        })
      },
      save () {
        _.mapKeys(this.addresseeSoporteEdit, (value, key) => {
          let indexOriginal = _.findIndex(this.addresseeSoporte, ['_id', key]);
          let newValues = this.addresseeSoporte[indexOriginal]
          newValues.email = value
          service().put('/addressee/' + key, newValues).then(res => {
            this.loadData()
            this.countFeedback++
            if (this.countFeedback === 2) {
              this.feedback = true
              this.countFeedback = 0
            }
          })
        });
        _.mapKeys(this.addresseeSolicitudEdit, (value, key) => {
          let indexOriginal = _.findIndex(this.addresseeSolicitud, ['_id', key]);
          let newValues = this.addresseeSolicitud[indexOriginal]
          newValues.email = value
          service().put('/addressee/' + key, newValues).then(res => {
            this.loadData()
            this.countFeedback++
            if (this.countFeedback === 2) {
              this.feedback = true
              this.countFeedback = 0
            }
          })
        });
      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style lang="sass">
  .theme--light .input-group input,
  .theme--light .input-group textarea
    color: #666666 !important
</style>
