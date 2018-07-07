<template>
  <v-card>
    <v-card-title>
      <span class="headline">Subir Archivo</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-actions v-ripple style="cursor:pointer;" class="file-input elevation-10" @click="$refs.fileInput.click()">

              <v-spacer>{{ fileName }}</v-spacer>

              <input type="file" name="" @change="previewFile" ref="fileInput" style="display: none;">

              <v-btn icon @click.stop="clearFile">
                <v-icon color="grey darken-1">delete</v-icon>
              </v-btn>

            </v-card-actions>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange darken-1" flat @click.native="$emit('close')">Cancelar</v-btn>
      <v-btn color="orange darken-1" flat @click.native="emitSave">Subir Archivo</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  data: () => ({
    fileName: 'Seleccionar archivo',
  }),
  props: [''],
  computed: {},
  watch: {},
  methods: {
    // Sets file name on vue input fro reference
    previewFile() {
      this.fileName = this.$refs.fileInput.files[0].name;
    },
    // Clears file input and display
    clearFile() {
      this.$refs.fileInput.value = '';
      this.fileName = 'Seleccionar archivo';
    },
    // Saves the file
    emitSave() {
      let form = new FormData();
      let file = this.$refs.fileInput.files[0];
      let someExampleMetadata = 'See you on server!';
      form.append('file', file); // Tip: Can't be console logged
      form.append('some_metadata', someExampleMetadata);
      this.$emit('save', form);
    },
  },
};
</script>

<style lang="scss">
.file-input {
  transform: scale(1);
  &:hover {
    transform: scale(1.05);
    transition: transform 0.05s ease-in-out;
  }
}
</style>
