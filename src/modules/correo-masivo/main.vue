<template>
  <div id="dashboard">
    <div>
      <v-card>
        <v-container>

          <h3 class="mb-2">Correo masivo</h3>
          <v-select v-model="to" :items="receivers" label="Destinatario(s)" chips tags></v-select>
          <v-text-field v-model="subject" label="Asunto"></v-text-field>
          <v-text-field v-model="title" label="Título"></v-text-field>
          <v-text-field multi-line v-model="paragraph1" label="Texto previo imagen"></v-text-field>

          <v-layout row>
            <v-flex xs12>
              <v-card class="image">
                <img :src="imagePreview || placeHolderImage" class="image">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <input type="file" @change="inputUploadImage" ref="image" style="display: none;">
                  <v-btn icon @click.native="$refs.image.click()">
                    <v-icon color="grey darken-1">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click.native="imagePreview = ''">
                    <v-icon color="grey darken-1">delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>

          <v-text-field multi-line v-model="paragraph2" label="Texto posterior imagen"></v-text-field>

          <v-layout align-right>
            <v-flex xs12 text-xs-right>
              <div>
                <v-btn align-center color="warning" outline @click.native="preview = true">Vista previa</v-btn>
                <v-btn align-center color="success" outline @click.native="send()" :disabled="lockButton">Enviar</v-btn>
              </div>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card>
    </div>
    <v-dialog v-model="preview" width="900">
      <v-card>
        <v-card-title class="headline orange" primary-title>
          Vista previa
        </v-card-title>
        <v-card-text v-html="getMailingHtml"></v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="orange">
          <v-spacer></v-spacer>
          <v-btn color="white" @click="preview = false">
            Cerrar
          </v-btn>
        </v-card-actions></v-card>
    </v-dialog>
    <v-snackbar :timeout="6000" :top="true" :right="true" v-model="feedback">
      Email enviado correctamente
      <v-btn flat @click.native="feedback = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar color="error" :timeout="6000" :top="true" :right="true" v-model="feedbackError">
      Problemas con el envio
      <v-btn flat @click.native="feedback = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { service } from '@/services/general_service.js';
  import placeHolderImage from 'static/img/placeholder-img.png';

  export default {
    name: 'comite',
    data: () => ({
      to: [],
      receivers: ['sergiohidalgo94@gmail.com', 'josefa@embodiedreports.com', 'gabriel@embodiedreports.com'],
      subject: '',
      title: '',
      paragraph1: '',
      paragraph2: '',
      preview: false,
      lockButton: false,
      feedback: false,
      feedbackError: false,
      imagePreview: '',
      placeHolderImage: placeHolderImage,
      imagePath: '',
      form: ''
    }),
    computed: {
      getMailingHtml () {
        let html =
          `<div style="width: 100%; background-color: #eeeeee;">
            <table width="700" style="margin: auto; background-color: #ffffff;" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="60" colspan="3" style="background-color: #eeeeee;"></td>
              </tr>`

        if (this.title) {
          html +=
            `<tr>
              <td width="50"></td>
              <td height="80"><h2 style="font-size: 28px; text-align: center">${this.title}</h2></td>
              <td width="50"></td>
            </tr>`
        }

        if (this.paragraph1) {
          html += `<tr>
              <td width="50"></td>
              <td>
              <p style="margin: 0">
                 ${this.paragraph1}
              </p>
              </td>
              <td width="50"></td>
            </tr>`
        }

        if (this.paragraph1) {
          html +=
            `<tr>
                <td width="50"></td>
                <td>
                  <p style="margin: 0">
                     ${this.paragraph1.replace(new RegExp('\r?\n','g'), '<br />')}
                  </p>
                </td>
                <td width="50"></td>
              </tr>`
        }

        if (this.imagePath) {
          html +=
            `<tr>
              <td width="50"></td>
                <td>
                    <img style="margin-top: 20px; margin-bottom: 20px" src="${this.imagePath}" width="100%" alt="">
                </td>
                <td width="50"></td>
            </tr>`
        }

        if (this.paragraph2) {
          html +=
            `<tr>
                <td width="50"></td>
                <td>
                <p style="margin: 0">
                  ${this.paragraph2.replace(new RegExp('\r?\n','g'), '<br />')}
                </p>
                </td>
                <td width="50"></td>
              </tr>`
        }

        html +=
          `<tr>
              <td width="50"></td>
            <td align="left" valign="bottom" height="90">
            <img src="http://mpm.cl/wp-content/uploads/2018/01/newmpm.png" width="200">
            </td>
            <td width="50"></td>
          </tr>
          <tr>
            <td height="20" colspan="3" style="background-color: #ffffff;"></td>
          </tr>
          <tr>
            <td height="90" align="center" valign="middel" colspan="3" style="background-color: #eeeeee;">
              &copy; 2018 - Intranet MPM <br> Mantención Proyectos Montajes
            </td>
          </tr>
        </table>
      </div>`
        html = html.replace(/\\n/, '<br>')
      return html
      }
    },
    methods: {
      send () {
        this.lockButton = true
        if (this.form) {
          service()
            .post('/file/subir', this.form)
            .then(res => {
              this.imagePath = 'http://lambda.qa.mpm.embodiedreports.com/' + res.data.path
              service().post('/massive-mailing', {
                to: this.to,
                subject: this.subject,
                html: this.getMailingHtml
              }).then(res => {
                this.lockButton = false
                this.feedback = true
              }, () => {
                this.lockButton = false
                this.feedbackError = true
              })
            });
        } else {
          service().post('/massive-mailing', {
            to: this.to,
            subject: this.subject,
            html: this.getMailingHtml
          }).then(res => {
            this.lockButton = false
            this.feedback = true
          }, () => {
            this.lockButton = false
            this.feedbackError = true
          })
        }
      },
      inputUploadImage(event) {
        if (event) {
          this.form = new FormData();
          let image = event.target.files[0];
          this.form.append('file', image, image.name);
          let reader = new FileReader();
          reader.onload = imageLoad => {
            this.imagePreview = imageLoad.srcElement.result;
          };
          reader.readAsDataURL(image);
        }
      },
    },
  }
</script>

<style lang="sass">
  .theme--light .input-group input,
  .theme--light .input-group textarea
    color: #666666 !important
</style>

<style lang="sass" scoped>
  .image
    margin: 20px auto
    max-width: 600px
    width: 100%
    display: block
    & img
      margin: 0
</style>
