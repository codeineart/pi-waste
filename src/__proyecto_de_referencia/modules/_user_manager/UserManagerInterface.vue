<template>
  <v-container fluid fill-height="" class="user-manager__">

    <!-- MAIN CENTERED LAYOUT -->
    <transition @serviceStatusChange="setServiceStatus" name="fade" mode="out-in">

      <!-- ON LOADING STATUS -->
      <v-layout column justify-center align-center fill-height v-if="service == 'loading'" key="on_loading">
        <!-- <v-flex xs4 d-flex row justify-center align-center> -->
        <v-progress-circular :size="150" indeterminate color="orange">
          CARGANDO...
        </v-progress-circular>
        <!-- </v-flex> -->
      </v-layout>

      <!-- ONCE LOADED -->
      <v-layout column fill-height v-if="service == 'success'" key="on_success">
        <v-flex>
          <h3 style="font-size: 24px;font-weight: 400;margin-bottom: 20px;">Administración de Usuarios</h3>
          <v-card>
            <v-container pa-0>

              <!-- USERS DATA-TABLE -->
              <datatable></datatable>

            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

    </transition>

  </v-container>
</template>

<script>
import datatable from './datatable';

export default {
  data: () => ({
    _DEBUG_: true,
    service: '',
  }),
  components: { datatable },
  mounted() {
    // initial request
    this.setServiceStatus('loading');

    // request simulation
    let callback = () => {
      this.setServiceStatus('success');
    };
    setTimeout(callback, 1000);
  },
  methods: {
    setServiceStatus(status) {
      switch (status) {
        case 'request':
          this.service = 'request';
          break;
        case 'loading':
          this.service = 'loading';
          break;
        case 'success':
          this.service = 'success';
          break;
        case 'error':
          this.service = 'error';
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@import 'src/assets/style.scss';
.user-manager__ {
  div {
    //border: red solid 1px;
  }
}
</style>
