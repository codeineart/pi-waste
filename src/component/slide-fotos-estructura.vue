<template>
  <v-layout column fill-height class="slide_fotos_estructura__">
    <v-layout row>
      <v-flex md6 row align-center d-flex :class="{'header' : true, 'selected': tab === 1}" @click="tab = 1">
        <h1>Fotos y videos</h1>
      </v-flex>
      <v-flex md6 row align-center d-flex :class="{'header' : true, 'selected': tab === 2}" @click="tab = 2">
        <h1>Estructura organizacional</h1>
      </v-flex>
    </v-layout>
    <v-flex md12 class="board--dark">
      <transition name="fade" mode="out-in">
        <div v-if="tab === 1" :key="0">
          <v-carousel hide-delimiters class="carousel-mpm">

            <!-- Video -->
            <v-carousel-item :key="video._id" v-for="(video, key) in gallery" v-if="video.type === 'video'">
              <v-container fluid>
                <v-layout row>
                  <v-flex md5>
                    <div class="thumbnail"
                         @click="modalVideo = true; videoSelect = key"
                         :style="{backgroundImage: 'url('+video.﻿thumbnail+')'}">
                      <div class="video-placement">
                        <v-icon>play_arrow</v-icon>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex md7>
                    <div class="text">
                      <h3>{{ video.name }}</h3>
                      <p>{{ video.description }}</p>
                      <v-btn
                        @click="modalVideo = true; videoSelect = key"
                        style="float:right; color:white;background-color:#e65c00;text-transform:capitalize;font-size:1.4rem;font-weight:400;">
                        Ver video
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-carousel-item>

            <!-- Image -->
            <v-carousel-item :key="image._id" v-for="(image, key) in gallery" v-if="(image.type === 'foto')">
              <v-container fluid>
                <v-layout row>
                  <v-flex md5>
                    <div class="thumbnail"
                         @click="modalImage = true; imageSelect = key"
                         :style="{backgroundImage: 'url('+image.﻿thumbnail+')'}">
                      <div class="video-placement">
                        <v-icon>search</v-icon>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex md7>
                    <div class="text">
                      <h3>{{ image.name }}</h3>
                      <p>{{ image.description }}</p>
                      <v-btn
                        @click="modalImage = true; imageSelect = key"
                        style="float:right; color:white;background-color:#e65c00;text-transform:capitalize;font-size:1.4rem;font-weight:400;">
                        Ver Imagen
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-carousel-item>
          </v-carousel>
        </div>
        <div v-else-if="tab === 2" :key="1">
          <v-carousel hide-delimiters class="carousel-mpm">
            <v-carousel-item v-bind:key="i" v-for="person in getStructure">
              <v-container fluid>
                <v-layout row>
                  <v-flex md6 class="person" @click="$router.push({ path: '/estructura-organizacional'})">
                    <div class="avatar"
                         :style="{backgroundImage: 'url('+person[0].meta.avatar_url+')'}"></div>
                    <div class="name">{{ person[0].meta.title }}</div>
                    <div class="position">{{ person[0].meta.content }}</div>
                  </v-flex>
                  <v-flex md6 class="person" @click="$router.push({ path: '/estructura-organizacional'})">
                    <div class="avatar"
                         :style="{backgroundImage: 'url('+person[0].meta.avatar_url+')'}"></div>
                    <div class="name">{{ person[1].meta.title }}</div>
                    <div class="position">{{ person[1].meta.content }}</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-carousel-item>
          </v-carousel>
        </div>
      </transition>
    </v-flex>

    <!-- Image -->
    <v-dialog v-model="modalImage" max-width="700px" :key="image._id" v-for="(image, key) in gallery" v-if="(image.type === 'foto' && key === imageSelect)">
      <v-card>
        <img :src="image.url" width="100%" alt="">
        <v-btn @click.stop="modalImage=false" style="float:right; color:white;background-color:#e65c00;text-transform:capitalize;font-size:1.4rem;font-weight:400;">
          Cerrar
        </v-btn>
        <v-btn color="" flat @click.stop="modalImage=false"></v-btn>
      </v-card>
    </v-dialog>

    <!-- Video -->
    <v-dialog v-model="modalVideo" max-width="560px" :key="video._id" v-for="(video, key) in gallery" v-if="(video.type === 'video' && key === videoSelect)">
      <v-card>
        <iframe v-if="modalVideo" width="560" height="315" :src="urlToEmbed(video.url)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <v-btn @click.stop="modalVideo=false" style="float:right; color:white;background-color:#e65c00;text-transform:capitalize;font-size:1.4rem;font-weight:400;">
          Cerrar
        </v-btn>
        <v-btn color="" flat @click.stop="modalVideo=false"></v-btn>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
import Vue from 'vue';

Vue.prototype.$log = console.log.bind(console);

  export default {
    data: () => ({
      drawer: null,
      isActive: false,
      tab: 1,
      modalImage: false,
      modalVideo: false,
      videoSelect: '',
      imageSelect: '',
    }),
    props: ['structure', 'gallery'],
    components: {},
    watch: {},
    computed: {
      getStructure () {
        let structure = []
        let structureTemporal = []
        this.structure.forEach((item, key) => {
          if (key % 2 === 0) {
            structureTemporal.push(item)
          } else {
            structureTemporal.push(item)
            structure.push(structureTemporal)
            structureTemporal = []
          }
        })
        return structure
      }
    },
    methods: {
      urlToEmbed (url) {
        let parser = document.createElement('a');
        parser.href = url;
        let id = parser.search.replace('?v=', '')
        return 'https://www.youtube.com/embed/' + id + '?rel=0&autoplay=0'
      }
    },
  };
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';
.person {
  cursor: pointer;
}
.carousel-mpm {
  min-height: 250px;
}

.carousel {
  box-shadow: none;
  height: auto;
}
.avatar {
  width: 120px;
  height: 120px;
  background-size: cover;
  border: 2px solid #ffffff;
}
.name {
  margin-top: 10px;
  color: #ffffff;
  font-weight: 600;
}
.position {
  color: #ffffff;
}
.thumbnail {
  background-color: #4b5778;
  width: 100%;
  height: 160px;
  margin-left: 30px;
  background-position: center;
  background-size: 145%;
  cursor: pointer;
  &:hover {
    .video-placement {
      .icon {
        opacity: 1;
      }
    }
  }
  .video-placement {
    position: relative;
    height: 100%;
    transition: all 0.2s ease;
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      border: 2px solid #ffffff;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      opacity: 0.5;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
.text {
  color: #ffffff;
  padding: 0;
  text-align: right;
  margin-left: 35px;
  margin-right: 30px;
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
.fade-enter-active {
  animation: fade 0.4s;
}
.fade-leave-active {
  animation: fade 0.4s reverse;
}
.slide_fotos_estructura__ {
  overflow: hidden;
  margin-top: 20px;
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
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
      background-color: $orange-color-light;
    }
    &.selected {
      background-color: $gray-color;
    }
  }
  h1 {
    font-weight: 300;
    font-size: 1.4rem;
    padding: 20px 0 20px 30px;
    text-align: left;
  }
  .board--dark {
    background-color: $gray-color;
    padding: 0;
    color: white;
    margin-bottom: -10px;
  }
  .agenda-search-input {
    background-color: transparent;
    border: gray solid 2px;
    border-radius: 5px;
    margin-top: 30px;
    margin-bottom: 20px;
    color: white !important;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
