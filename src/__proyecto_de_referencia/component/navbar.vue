<template>
  <!-- Navbar -->
  <nav style="z-index:10;" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">

      <!-- Company Logo -->
      <router-link class="navbar-brand" to="/home">
        <img class="img-responsive" src="/static/img/newmpm.png" alt="Logo mpm">
      </router-link>

      <!-- Sandwich button toggle -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation" @click="() => { $refs['menu-toggle'].classList.toggle('visible')}">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Responsive menu-->
      <div ref="menu-toggle" class="collapse navbar-collapse">
        <v-layout row wrap>
          <v-flex xs12>
            <v-menu offset-y class="account-menu">
              <v-btn slot="activator" outline v-if="getUser.isBirthday">
                <v-icon left style="color: #007bff; margin-top: -3px;">cake</v-icon><strong style="margin-right: 5px; color: #007bff">¡Feliz Cumplaños!</strong> {{ getUser.name }}
              </v-btn>
              <v-btn slot="activator" outline v-else>
                <v-icon left>person</v-icon> {{ getUser.name }}
              </v-btn>
              <v-list>
                <v-list-tile router-link to="/dash/admin">
                  <v-list-tile-title>
                    <span class="account-menu-text-list">Panel</span>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="closeSession()">
                  <v-list-tile-title>
                    <span class="account-menu-text-list">Cerrar sesión</span>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
          <v-flex xs12>
            <ul class="navbar-nav justify-content-end">
              <!-- INICIO -->
              <li class="nav-item">
                <router-link to="/home" style="text-decoration:none;">
                  <router-link tag="a" class="nav-link waiting-active" to="/home" id="nav-inicio">Inicio
                    <span class="sr-only">(current)</span>
                  </router-link>
                </router-link>
              </li>

              <!-- INFORMACIÓN -->
              <li class="nav-item dropdown" @mouseover="() => { $refs['info'].classList.add('visible')}" @mouseleave="() => { $refs['info'].classList.remove('visible')}" @click="() => { $refs['info'].classList.toggle('visible')}">

                <!-- dropdown -->
                <a class="nav-link waiting-active dropdown-toggle" href="#" id="nav-info" role="button" data-toggle="dropdown" style="cursor: default;">
                  Información
                </a>

                <!-- sub-dropdown -->
                <div ref="info" class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link to="/mision_vision" class="dropdown-item">Misión y Visión</router-link>
                  <router-link to="/estructura-organizacional" class="dropdown-item">Estructura <br> Organizacional</router-link>
                  <router-link to="/politicas" class="dropdown-item">Políticas</router-link>
                  <router-link to="/noticias" class="dropdown-item">Noticias</router-link>
                  <router-link to="/noticias/Responsabilidad social" class="dropdown-item">Responsabilidad social</router-link>
                  <router-link to="/comite" class="dropdown-item">Comité Paritario</router-link>
                  <router-link to="/agenda-directorio" class="dropdown-item">Agenda / directorio</router-link>
                </div>
              </li>

              <!-- SOLICITUDES -->
              <li class="nav-item dropdown" @mouseover="() => { $refs['solicitud'].classList.add('visible')}" @mouseleave="() => { $refs['solicitud'].classList.remove('visible')}" @click="() => { $refs['solicitud'].classList.toggle('visible')}">

                <!-- dropdown -->
                <router-link to="/solicitudes" style="text-decoration:none;" tag="a" id="nav-solicitudes" class="waiting-active nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                  Solicitudes
                </router-link>

                <!-- sub-dropdown -->
                <div ref="solicitud" class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link class="dropdown-item" v-for="(solicitud, key) in solicitudes" :key="key" :to="'/solicitudes/' + solicitud.name">{{ solicitud.name }}</router-link>
                </div>
              </li>

              <!-- PROYECTOS -->
              <li class="nav-item dropdown visible waiting-active" @mouseover="() => { $refs['proyectos'].classList.add('visible')}" @mouseleave="() => { $refs['proyectos'].classList.remove('visible')}">

                <!-- dropdown -->
                <router-link class="nav-link dropdown-toggle waiting-active" to="/proyectos" id="nav-proyectos" role="button" data-toggle="dropdown" @click="$refs['proyectos'].classList.toggle('visible')">
                  Proyectos
                </router-link>

                <!-- MÓDULO DINÁMICO DE PROYECTOS -->
                <div ref="proyectos" class="dropdown-menu-multilevel" aria-labelledby="navbarDropdown">
                  <div v-for="(project, index) in getTabsOptions">
                    <router-link :to="'/proyectos/' + project" tag="div" class="dropdown-item" href="#">
                      <div class="principal">
                        {{ project }}
                        <v-icon>arrow_drop_down</v-icon>
                      </div>
                      <ul class="dropdown-submenu" v-if="getProjects[index].length">
                        <router-link :to="'/proyecto/' + _project._id" tag="li" class="dropdown-item" v-for="(_project, index) in getProjects[index]" :key="index">
                          <span class="project">{{ _project.contract }}</span>
                        </router-link>
                      </ul>
                    </router-link>
                  </div>
                </div>
              </li>

              <!-- VIDEOS -->
              <li class="nav-item">
                <router-link to="/videos" class="nav-link waiting-active" id="nav-videos">Videos</router-link>
              </li>

              <!-- GERENCIAS -->
              <li class="nav-item dropdown" @mouseover="() => { $refs['gerencias'].classList.add('visible')}" @mouseleave="() => { $refs['gerencias'].classList.remove('visible')}" @click="() => { $refs['gerencias'].classList.toggle('visible')}">

                <!-- dropdown -->
                <a class="nav-link dropdown-toggle waiting-active" href="#" id="nav-gerencias" role="button" data-toggle="dropdown">
                  Gerencias
                </a>

                <!-- sub-dropdown -->
                <div ref="gerencias" class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link to="/gerencias/hsec" class="dropdown-item">HSEC</router-link>
                  <router-link to="/gerencias/calidad" class="dropdown-item">Calidad</router-link>
                  <router-link to="/gerencias/recursos-humanos" class="dropdown-item">Recursos Humanos</router-link>
                  <router-link to="/gerencias/contabilidad" class="dropdown-item">Contabilidad</router-link>
                  <router-link to="/gerencias/compras" class="dropdown-item">Compras</router-link>
                  <router-link to="/gerencias/maquinarias" class="dropdown-item">Maquinarias</router-link>
                  <router-link to="/gerencias/remuneraciones" class="dropdown-item">Remuneraciones</router-link>
                  <router-link to="/gerencias/gerente-general" class="dropdown-item">Gerente General</router-link>
                </div>
              </li>

              <!-- SOPORTE -->
              <li class="nav-item dropdown " @mouseover="() => { $refs['soporte'].classList.add('visible')}" @mouseleave="() => { $refs['soporte'].classList.remove('visible')}" @click="() => { $refs['soporte'].classList.toggle('visible')}">

                <!-- dropdown -->
                <router-link to="/soporte" class="nav-link dropdown-toggle waiting-active" id="nav-soporte" role="button" data-toggle="dropdown">
                  Soporte
                </router-link>

                <!-- sub-dropdown -->
                <div ref="soporte" class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link class="dropdown-item" :to="'/soporte/' + _soporte.name" v-for="(_soporte, key) in soportes" :key="key">{{ _soporte.name }}</router-link>
                </div>
              </li>

            </ul>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- /responsive menu -->
  </nav>
  <!-- /Navbar -->
</template>

<script>
import { service, endpoints } from '@/services/general_service';
import _ from 'lodash';
import jwt_decode from 'jwt-decode';

export default {
  data: () => ({
    projects: [],
    solicitudes: [],
    soportes: [],
  }),
  props: {},
  created() {
    service()
      .get(endpoints.projects.get)
      .then(res => {
        this.projects = res.data.projects;
      });
    service()
      .get('/addressee/solicitud')
      .then(res => {
        this.solicitudes = res.data.solicitud;
      });
    service()
      .get('/addressee/soporte')
      .then(res => {
        this.soportes = res.data.soporte;
      });
  },
  computed: {
    getUser() {
      let user = jwt_decode(localStorage.getItem('user-token'));
      let dateNow = new Date()
      if (user.born) {
        user.birthday = {
          month: parseInt(user.born.substring(5, 7)),
          day: parseInt(user.born.substring(8, 10))
        }
        user.isBirthday = (user.birthday.month === (dateNow.getMonth() + 1) && user.birthday.day === (dateNow.getDay() + 1))
      }
      return user
    },
    getTabsOptions() {
      return this.projects.map(item => item.name);
    },
    getProjects() {
      let count = -1;
      let project = _.mapKeys(_.groupBy(this.projects, 'name'), () => count++);
      return _.toArray(project);
    },
  },
  methods: {
    closeSession() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/bootstrap/app.scss';

$orange-color: #e65c00;
$gray-color: #1c212e;

.account-menu {
  display: block !important;
}

.account-menu button {
  display: block;
  margin: 0;
  float: right;
  font-size: 14px !important;
  text-transform: none;
  padding: 0;
  box-shadow: none !important;
  outline: 0 !important;
  .icon {
    font-size: 18px;
    margin-right: 6px;
    color: #666666;
  }
}

.account-menu-text-list {
  font-size: 14px;
  text-align: right;
}

.dropdown-menu-multilevel {
  display: block;
  visibility: hidden;
  opacity: 0;
  background-color: $gray-color;
  padding: 0;
  position: absolute !important;
  border-radius: 0;
  margin: 0;
  .dropdown-item {
    cursor: pointer;
    padding: 0;
    width: 300px;
    color: whitesmoke;
    font-size: 1.1rem;
    height: auto;
    overflow: hidden;
    &:hover {
      background-color: #252c3d;
    }
    &:last-child .principal {
      padding-bottom: 10px;
    }
    &:first-child .principal {
      padding-top: 15px;
    }
    .principal {
      color: whitesmoke;
      padding-left: 2.5rem;
      padding-right: 9rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 14px;
      display: block;
    }
    .dropdown-submenu {
      max-height: 0;
      color: whitesmoke;
      list-style: none;
      display: block;
      overflow: hidden;
      transition: max-height 0.8s cubic-bezier(0.1, 1, 0.22, 1) 0s;
      text-indent: 2rem;
      background-color: $gray-color;
      &:after {
        opacity: 0.1;
        display: none !important;
      }
      .project {
        padding: 10px 0 10px 30px;
        display: block;
        font-size: 14px;
      }
    }
  }
  .dropdown-item:hover {
    .principal {
      background-color: $orange-color;
      color: whitesmoke;
      display: block;
    }
    .dropdown-submenu {
      max-height: 1000px !important;
    }
  }
}

.dropdown-menu {
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.1s linear, opacity 0.1s linear;
  background-color: $gray-color;
  padding: 0;
  border-radius: 0;

  .dropdown-item {
    color: whitesmoke;
    padding-left: 2.5rem;
    padding-right: 9rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 14px;

    &:first-child {
      padding-top: 15px;
    }

    &:last-child {
      padding-bottom: 10px;
    }
  }

  .dropdown-item:hover {
    background-color: $orange-color;
  }

  .dropdown-item:focus {
    background-color: $orange-color;
  }

  .dropdown-divider {
    border-top: 1px solid $orange-color;
    margin: 0;
  }

  .dropdown-submenu {
    color: whitesmoke;
    list-style: none;
    display: block;
    overflow: hidden;
    //max-height: 100px;
    max-height: 0;
    transition: max-height 0.8s cubic-bezier(0.1, 1, 0.22, 1) 0s;
    text-indent: 2rem;
  }

  @media all and (max-width: 980px), (orientation: portrait) {
    display: none;
  }
}

.visible {
  display: block;
  visibility: visible;
  opacity: 1;
}

.container {
  max-width: 1180px;
  width: 100%;
  padding: 0;
}

.navbar {
  min-height: 90px;
  background-color: white !important;
  position: fixed;
  width: 100%;
  padding: 0;
  box-shadow: 0px 5px 22px 0px rgba(0, 0, 0, 0.3);
}

.navbar-nav {
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  margin-left: 0;
  margin-top: 5px;

  .nav-item a.waiting-active {
    transition: all 0.4s ease;
    border-bottom: 2px solid #ffffff;
    &.active {
      border-bottom: 2px solid $orange-color;
    }
  }

  .nav-link {
    border-top: 1px solid #cccccc;
    color: #1c212e;
    padding: 12px 15px !important;
    &.dropdown-toggle::after {
      color: $orange-color;
    }
  }
}
</style>
