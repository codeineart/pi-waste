<template>
  <v-layout ref="backgroundslot" class="bg-header">
    <v-flex xs12>
      <v-flex xs12 class="bisel">
        <v-layout fill-height="" column>

          <v-flex xs6></v-flex>

          <v-flex fill-height="">

            <v-layout fill-height="">
              <v-flex xs2></v-flex>
              <v-flex xs10 class="label">
                <h1 class="big-tittle">
                  <slot></slot>
                </h1>
              </v-flex>
              <v-flex xs2></v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';

export default {
  data: () => ({}),
  props: ['src'],
  components: {},
  watch: {},
  computed: {},
  mounted() {
    // Mount background for header mounted on prop
    this.$refs.backgroundslot.style.backgroundImage = `url('${this.src}')`;
  },
  methods: {},
};
</script>

<style lang="scss">
</style>
