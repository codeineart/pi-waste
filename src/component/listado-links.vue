<template>
  <div>
    <nav>
      <ul>
        <li v-for="(link, key) in links">
          <a class="" v-if="link.type === 'accordion'" @click="accordionActiveNumber !== key ? accordionActiveNumber = key : accordionActiveNumber = -1">
            {{ link.title }}
            <v-icon>keyboard_arrow_down</v-icon>
          </a>
          <router-link :to="link.to" tag="a" v-else>
            {{ link.title }}
            <v-icon>chevron_right</v-icon>
          </router-link>
          <transition name="accordion" mode="in-out">
            <div class="accordionContent" v-if="accordionActiveNumber === key">
              <div v-if="accordionActiveNumber === 0">
                <v-carousel class="carousel" hide-delimiters :dark="true">
                  <v-carousel-item>
                    <article class="politic">
                      <h2>AENOR</h2>
                      <h4>Certificado del Sistema de Gestión Seguridad y Salud en el Trabajo</h4>
                      <a href="/static/reg_mark.pdf" target="_blank">
                        <img src="/static/img/reg_mark.jpg" class="img-responsive" alt="">
                      </a>
                    </article>
                  </v-carousel-item>

                  <v-carousel-item>
                    <article class="politic">
                      <h2>AENOR</h2>
                      <h4>Certificado del Sistema de Gestión Ambiental</h4>
                      <a href="/static/gest_amb.pdf" target="_blank">
                        <img src="/static/img/gest_amb.jpg" class="img-responsive" alt="">
                      </a>
                    </article>
                  </v-carousel-item>

                  <v-carousel-item>
                    <article class="politic">
                      <h2>AENOR</h2>
                      <h4>Certificado del Sistema de Gestión de la Calidad</h4>
                      <a href="/static/seg_lab.pdf" target="_blank">
                        <img src="/static/img/seg_lab.jpg" class="img-responsive" alt="">
                      </a>
                    </article>
                  </v-carousel-item>
                </v-carousel>

              </div>
              <div v-if="accordionActiveNumber === 1">
                <v-container fluid>
                  <v-layout row>
                    <v-flex md12 class="person">
                      <v-carousel class="carousel" hide-delimiters :dark="true" style="max-height: 300px">
                        <v-carousel-item v-for="(person, index) in comite" :key="index">
                          <div class="person">
                            <div class="avatar"
                                 :style="{backgroundImage: 'url('+person.meta.avatar_url+')'}"></div>
                            <div class="name">{{ person.meta.title }}</div>
                            <div class="position">{{ person.meta.content }}</div>
                          </div>
                        </v-carousel-item>
                      </v-carousel>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'listado-links',
    props: ['comite'],
    data: () => ({
      accordionActiveNumber: -1,
      links: [
        {
          title: 'Políticas',
          to: '/politicas',
          type: 'accordion'
        },
        {
          title: 'Comité paritario',
          to: '/comite',
          type: 'accordion'
        },
        {
          title: 'Lista de solicitudes',
          to: '/solicitudes',
          type: 'url'
        }
      ]
    })
  }
</script>

<style scoped lang="scss">
  @import '@/assets/style.scss';
  .person {
    .avatar {
      width: 200px;
      height: 200px;
      background-size: cover;
      margin-bottom: 20px;
    }
    .name {
      font-weight: 600;
      font-size: 20px;
    }
    .position {
      font-size: 16px;
      max-width: 290px;
      margin: 0 auto;
    }
  }
  .politic {
    h2 {
      text-align: center;
      margin-bottom: 15px;
    }
    h4 {
      text-align: center;
      font-weight: 400;
      margin: 0 30px;
      font-size: 18px;
    }
    a {
      background-color: transparent !important;
      padding: 0;
      &:hover {
        background-color: transparent !important;
      }
      img {
        max-width: 180px;
        margin: 20px auto 0 auto;
        display: block;
      }
    }
  }
  .carousel {
    overflow: hidden !important;
    background-color: transparent;
    box-shadow: none;
  }
  .accordionContent {
    margin-left: 10px;
    margin-bottom: 20px;
  }
  nav {
    margin-top: 20px;
    li {
      list-style: none;
      a {
        position: relative;
        display: block;
        text-decoration: none;
        text-align-last: left;
        background-color: $orange-color;
        height: 50px;
        width: calc(100% - 10px);
        margin: 0 10px 20px;
        font-weight: 500;
        font-size: 16px;
        padding: 15px;
        color: #ffffff;
        transition: all .2s ease;
        &:hover {
          background-color: $orange-color-light;
        }
        i.icon {
          position: absolute;
          right: 15px;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
      i.icon {
        position: absolute;
        right: 15px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }

  .accordion-enter-active {
    animation: accordion-in 1s;
  }
  .accordion-leave-active {
    animation: accordion-in 1s reverse;
  }
  @keyframes accordion-in {
    0% {
      max-height: 0px;
    }
    100% {
      max-height: 9999px;
    }
  }

</style>

<style lang="scss">
  .accordionContent {
    margin-left: 10px;
    margin-bottom: 20px;
    .btn .btn__content .icon{
      color: #2d2d2d;
    }
  }
</style>
