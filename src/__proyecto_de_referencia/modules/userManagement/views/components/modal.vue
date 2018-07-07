<template>
  <v-layout row justify-center>
    <v-dialog v-model="renderMe" persistent max-width="600">
      <v-card style="padding:40px;border-radius:20px;">
        <v-container>
          <v-layout row wrap justify-center align-center>
            <v-flex p4 sm6 class="text-sm-center" align-center>
              <div>
                <slot>
                  <!-- content will be injected here -->
                </slot>
              </div>
            </v-flex>
            <v-flex sm3>
              <v-btn color="dark darken-1" @click="modalConfirmed(true, $event)">Aceptar</v-btn>
            </v-flex>
            <v-flex sm3>
              <v-btn color="dark darken-1" @click="modalConfirmed(false, $event)">Cancelar</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['show'],
  computed: {
    renderMe: function() {
      return this.$props.show;
    },
  },
  methods: {
    modalConfirmed(yes) {
      if (yes) {
        this.$emit('close', { response: true });
      } else {
        this.$emit('close', { response: false });
      }
    },
  },
};
</script>