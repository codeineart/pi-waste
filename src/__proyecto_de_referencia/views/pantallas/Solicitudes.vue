<template>
  <v-app column class="solicitudes__">

    <NavBar ref="navbar"></NavBar>

    <general-header src="/static/img/bg/solicitudes.jpg">
      Solicitudes
    </general-header>

    <v-layout class="content-block" row wrap>

      <v-layout column>

        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select :items="requestTypeOptions" v-model="requestType" label="Tipo de solicitud" single-line color="primary"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field name="subject" label="Asunto" v-model="subject" color="primary"></v-text-field>
            </v-flex>
            <!--<v-flex xs12>-->
              <!--<v-text-field name="cc" label="CC" v-model="cc" color="primary"></v-text-field>-->
            <!--</v-flex>-->
            <v-flex xs12>
              <v-text-field label="Solicitud" v-model="request" multi-line></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn :disabled="disableButtonSend" @click="sendForm" style="float:right; color:white;background-color:#e65c00;text-transform:capitalize;font-size:1.4rem;font-weight:400;">Enviar solicitud</v-btn>
            </v-flex>
          </v-layout>
          <transition name="fade">
            <v-alert outline color="success" icon="check_circle" :value="true"  v-if="showAlert">
              ¡Solicitud enviada con éxito!
            </v-alert>
          </transition>

        </v-flex>

      </v-layout>
    </v-layout>

    <div class="spacer--180"></div>

    <general-footer></general-footer>

  </v-app>
</template>

<script>
import Vue from 'vue';
import NavBar from '@/component/navbar';
import GeneralHeader from '@/component/header';
import GeneralFooter from '@/component/footer';
import { service } from '@/services/general_service';
import jwt_decode from 'jwt-decode'

Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
    request: '',
    requestType: '',
    requestTypeOptions: [],
    subject: '',
    cc: '',
    disableButtonSend: false,
    showAlert: false,
    userLogin: {}
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {
    '$route.params.type'(value) {
      if (value) this.requestType = value;
    },
    requestType(value) {
      if (value) this.$router.push({ path: '/solicitudes/' + value });
    },
  },
  mounted() {
    setTimeout(() => {
      let navEl = document.getElementById('nav-solicitudes')
      navEl.classList.add('active')
      if (this.$refs.navbar) {
        this.$refs.navbar.solicitudes.forEach(item => {
          this.requestTypeOptions.push(item.name)
        })
      }
    }, 400)
  },
  created() {
    this.userLogin = jwt_decode(localStorage.getItem('user-token'))
    if (this.$route.params.type) this.requestType = this.$route.params.type;
  },
  methods: {
    sendForm () {
      this.disableButtonSend = true
      service()
        .post('/request', {
          type: this.requestType,
          emitter: {
            id: this.userLogin._id,
            name: this.userLogin.name
          },
          message: this.request,
          subject: this.subject,
          status: 'sent',
          response: '',
          updated: ''
        })
        .then(res => {
          this.disableButtonSend = false
          this.showAlert = true
          setTimeout(() => {
            this.showAlert = false
          }, 5000)
        })
    }
  },
};
</script>

<style lang="scss">
.solicitudes__ {
  input[type='text'],
  textarea,
  .list__tile__title {
    color: #373737 !important;
  }
  .list__tile--active {
    font-weight: 500;
  }
}
</style>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

