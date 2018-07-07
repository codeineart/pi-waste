<template>
  <v-app>
    <v-container class="wrapper" fluid>

      <div id="bisel"></div>

      <v-layout fill-height column>
        <v-flex xs3 sm2 md4 column style="position:relative;">
          <v-flex mb-4 style="background-color:white;">
            <v-flex xs12 sm12 md2 offset-md-1 text-xs-center pa-2>
              <img src="http://www.mpm.cl/wp-content/uploads/2018/01/newmpm.png" alt="">
            </v-flex>
          </v-flex>
        </v-flex>

        <v-flex xs4 sm6 md4 row justify-center>
          <v-flex mx-auto xs8 md3 xl2 class="login">
            <h1>INGRESA</h1>
            <div>
              <label for="username">Usuario</label>
              <input type="text" name="username" v-model="userData.username" />
              <br><br>
              <label for="password">Contraseña</label>
              <input type="password" name="password" v-model="userData.password"  />
              <br><br><br>
              <div style="text-align:center;">
                <button @click="login" class="btn form-submit mx-auto" style="text-align:center;">Ingresar</button>
              </div>
            </div>
          </v-flex>
        </v-flex>

        <v-flex xs4 sm4 md4>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar
      :timeout="6000"
      :top="true"
      :right="true"
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn flat @click.native="snackbar = false">Cerrar</v-btn>
    </v-snackbar>

  </v-app>

</template>

<script>
import { AUTH_LOGIN, AUTH_SIGN_UP, AUTH_LOGOUT, AUTH_TOKEN_CHECK } from '@/modules/auth/store/actions';
import store from '@/store';

export default {
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      userData: {
        username: '',
        password: '',
      },
    };
  },
  components: {},
  name: 'app',
  methods: {
    login() {
      const { username, password } = this.userData;
      this.$store
        .dispatch(AUTH_LOGIN, { username, password })
        .then(() => {
          this.$router.push('/home');
        })
        .catch(() => {
          this.snackbarText = 'El usuario o contraseña no son validos'
          this.snackbar = true
        });
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push('/login');
      });
    },
  },

  beforeRouteEnter(to, from, next) {
    /**
     * Check is user is login out.
     * Redirect to login page.
     */
    if (to.query.redirect == 'logout') {
      store.dispatch(AUTH_LOGOUT).then(() => {
        next({ name: 'Login' });
      });
    }

    /**
     * Check if the user is already signed in.
     * Validates stored token with the server.
     * Redirects to dashboard.
     */
    store.dispatch(AUTH_TOKEN_CHECK).then(tokenValid => {
      if (tokenValid) {
        // If valid, go to home
        next({ name: 'Home' });
      } else {
        // If not, continue (AKA, to login)
        next();
      }
    });
  },

  mounted() {
    this.panel = 'login';
    document.title = 'Embodied Reports - Login Area';
  },
};
</script>

<style scoped lang="scss">

@import '@/assets/style.scss';

* {
  box-sizing: border-box;
}

.login {
  position: relative;
  h1 {
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
}

input {
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  margin-bottom: 10px;
  background-color: white;
  outline: none;
  padding: 10px;
  font-size: 13px;
  color: black;
  border-radius: 3px;
  border: 1px solid transparent;
  transition: all .4s ease;
  &:focus {
    border: 1px solid rgb(255, 145, 0);
  }
}

#header {
  position: relative;
  background-color: white;
  z-index: 999;
  height: 7em;
  img {
    margin-left: 8em;
  }
}

.wrapper {
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url('/static/img/bg/login.jpg');
  background-size: cover;
  background-position: center;
  padding: 0;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  text-shadow: none;
  letter-spacing: 1px;
  text-transform: uppercase;
}

label {
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-size: 1em;
  letter-spacing: 1px;
  text-transform: uppercase;
}

button {
  font-family: 'Montserrat', sans-serif;
  text-shadow: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 0;
  background-color: rgba(51, 51, 51, 0.9);
  border: none;
  margin: 0 auto;
  //width: 60%;
  transition: all 0.3s;
  box-shadow: none;
  outline-color: orangered;
}

button.btn-primary:not([disabled]):not(.disabled):active {
  background-color: orangered;
  border-color: orangered;
  box-shadow: none;
}

.button-primary {
  border-color: none;
}

button:hover {
  font-family: 'Montserrat', sans-serif;
  text-shadow: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 0;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  margin: 0 auto;
  color: black;
  transition: all 0.3s;
}

.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: 0 0 0 0.2rem rgba(orangered, 0.5);
}

input {
  font-family: 'Montserrat', sans-serif;
  text-shadow: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0 auto;
  font-size: 0.8em;
}

#bisel {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

img {
  margin-top: auto;
  margin-bottom: auto;
}

.btn.form-submit {
  background-color: $gray-color !important;
  color: #fff;
  width: 100%;
  &:hover {
    background-color: $orange-color !important;
    color: #fff;
  }
  &:focus {
    box-shadow: none;
  }
  &:active {
    background-color: $orange-color-light;
    transform: scale(.95);
  }
}

// Extra small devices (portrait phones, less than 576px)
// No media query since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>
