<template>
  <v-app column class="soporte__">
    <!-- NAVBAR -->
    <NavBar ref="navbar"></NavBar>
    <!-- SPLASH SCREEN -->
    <general-header src="/static/img/bg/solicitudes.jpg">
      Soporte
    </general-header>

    <!-- CONTENT -->
    <v-layout class="content-block" row wrap>

      <!-- COLUMNAS -->
      <v-layout column>

        <!-- TITULO -->
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
              <v-btn @click="sendForm()" :disabled="disableButtonSend" style="float:right; color:white;background-color:#e65c00;text-transform:capitalize;font-size:1.4rem;font-weight:400;">Enviar solicitud de soporte</v-btn>
            </v-flex>
          </v-layout>
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

/**
 * For Logging on inline elements
 */
Vue.prototype.$log = console.log.bind(console);

export default {
  data: () => ({
    drawer: null,
    isActive: false,
    request: '',
    requestType: '',
    requestTypeOptions: [],
    userLogin: {},
    disableButtonSend: false,
    subject: '',
    cc: '',
    items: [],
  }),
  props: {},
  components: { NavBar, GeneralHeader, GeneralFooter },
  watch: {
    '$route.params.type'(value) {
      if (value) this.requestType = value;
    },
    requestType(value) {
      if (value) this.$router.push({ path: '/soporte/' + value });
    },
  },
  mounted () {
    setTimeout(() => {
      let navEl = document.getElementById('nav-soporte')
      navEl.classList.add('active')
      if (this.$refs.navbar) {
        this.$refs.navbar.soportes.forEach(item => {
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

<style scoped lang="scss">
//*********************
//    VIEW CLASSES    *
//*********************

@import '@/assets/style.scss';
</style>

<style lang="scss">
/*#app > div.application--wrap > div.layout.content-block.row.wrap > div > div > div > div:nth-child(2) > div > div.input-group__input > input[type="text"] {*/
.soporte__ {
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

