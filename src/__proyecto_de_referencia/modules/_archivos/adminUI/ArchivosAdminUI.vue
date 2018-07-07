<template>
  <!-- <div @keydown.esc.stop="sayHi" tabindex="0"> -->
  <v-layout column>
    <v-flex>
      <h3 style="font-size: 24px;font-weight: 400;margin-bottom: 20px;">Administración de archivos</h3>
      <v-card>
        <v-container pa-0>

          <FileTable></FileTable>

        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- </div> -->
</template>

<script>
import FileTable from './datatable';

export default {
  data: () => ({
    escEventListenerActive: true,
  }),
  components: { FileTable },
  props: ['prop1', 'prop2'],
  watch: {
    escEventListenerActive: function(escEventListenerActive) {
      if (escEventListenerActive == false) {
        console.log('removing global ESC listener');
        document.onkeydown = null;
      } else {
        console.log('adding global ESC listener');
        document.onkeydown = evt => {
          evt = evt || window.event;
          if (evt.keyCode == 27) {
            this.$router.go(-1);
          }
        };
      }
    },
  },
  events: {},
  computed: {},
  methods: {
    onEscEventModifier() {
      this.escEventListenerActive = false;
    },
    sayHi() {
      console.log('Hi');
      this.counter++;
    },
  },
  directives: {},
  filters: {},

  created() {},

  mounted() {
    this.showDialog = false;
  },
  destroyed() {
    // removing event listener
    document.onkeydown = null;
  },
};
</script>

<style lang="scss" scoped>
.component-name__ {
  color: white;
  &element-one {
    color: black;
  }
  &element-one--modifier {
    color: red;
  }
}
</style>
