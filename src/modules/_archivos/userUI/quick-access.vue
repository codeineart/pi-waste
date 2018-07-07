<template>
  <!-- ACCESO RÁPIDO MÓDULO DE ARCHIVOS-->
  <v-carousel hide-delimiters :cycle="false" style="height:100%;overflow-y:hidden;" :lazy="false">
    <v-carousel-item :key="index" v-for="(page, index) in filesData">

      <v-layout row>
        <!-- FILE-ELEMENTS-PER-PAGE -->
        <v-flex xs3 :key="index" v-for="(file, index) in page">
          <v-layout v-ripple column class="file-element" @click="download(file.file_url)">

            <!-- FILE-TYPE-ICON -->
            <v-flex xs7 class="file-icon-box">
              <v-layout>
                <v-flex xs3></v-flex>
                <v-flex xs6 class="file-icon relative">

                  <!-- FILE LABEL -->
                  <v-layout class="file_icon_overlay" absolute fill-height justify-center align-center>
                    <!-- <v-flex xs12>{{`${ file.file_name.split('.')[1] || 'Desconocido' }`}}</v-flex> -->
                    <v-flex xs12>{{ $route.params.type | uppercase }}</v-flex>
                  </v-layout>
                  <v-icon> fa fa-file</v-icon>

                </v-flex>
                <v-flex xs3></v-flex>
              </v-layout>
            </v-flex>

            <!-- FILE-ACTION-BAR -->
            <v-flex xs5 class="file-action-bar">
              <p class="text-xs-right">{{ `${ file.file_name }` }} <br>
                <span class="sub-heading"> Subido el {{ file.file_last_modified }}</span>
              </p>
            </v-flex>

          </v-layout>
        </v-flex>

      </v-layout>

    </v-carousel-item>
  </v-carousel>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({}),
  components: {},
  props: ['filesData'],
  watch: {},
  events: {},
  computed: {},
  methods: {
    download(file_url) {
      //alert(`Descargando ${JSON.stringify(this.row)}`);
      axios({
        url: file_url,
        method: 'GET',
        responseType: 'blob', // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file_url); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
  },
  directives: {},
  filters: {
    uppercase(value) {
      if (!value) return '';
      value = value.toString().replace('-', ' ');
      return value.toUpperCase();
    },
  },
  watch: {},

  beforeCreate() {},
  created() {},

  beforeMount() {},
  mounted() {},

  beforeUpdate() {},
  updated() {},

  beforeDestroy() {},
  destroyed() {},

  activated() {},
  deactivated() {},

  beforeRouteEnter(to, from, next) {},
  beforeRouteUpdate(to, from, next) {},
  beforeRouteLeave(to, from, next) {},
};
</script>

<style lang="scss" scoped>
@import 'src/assets/style.scss';

.file_icon_overlay {
  width: 100%;
  padding-left: 25%;
  padding-right: 25%;
  overflow-wrap: break-word;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
}
.sub-heading {
  color: #ddd;
  font-size: 1rem;
}
.spacer--180.top {
  background-color: #ddd;
  border-bottom: solid 5px $orange-color;
  padding: 0% 15%;
  position: relative;
  h1 {
    color: #444;
    position: absolute;
    bottom: 0px;
    font-size: 5.5rem;
    font-weight: 500;
  }
}
.spacer--180.bottom {
  background-color: green;
}

.horizontal-bar {
  width: 100%;
  height: 4px;
  background: $orange-color;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
}

.content-block.more-margin {
  margin: 4% 15%;
}

.remove-after-bar::before {
  all: unset;
}

.intro-title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.file-icon {
  text-align: center;
  i {
    font-size: 16px;
    font-size: 5vw;
    color: grey !important;
  }
}

.carousel {
  box-shadow: none;
}

.file-element {
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10px;
  overflow: hidden;
  .file-action-bar {
    font-size: 1.4rem;
    font-weight: 400;
    background-color: $orange-color;
    color: white;
    padding: 10px;
  }
  .file-icon-box {
    padding: 15px;
    background-color: lightgrey;
  }
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    transition: transform 0.1s linear;
  }
}
</style>
