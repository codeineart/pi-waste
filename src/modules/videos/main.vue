<template>
  <div id="dashboard">

    <!-- Show All -->
    <div v-if="display === 'all'">
      <h3>Videos</h3>
      <v-data-table :headers="headers" :items="videos" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td width="100"><img :src="props.item.thumbnail" class="thumbnail"></td>
          <td width="260">{{ props.item.name }}</td>
          <td>{{ props.item.description }}</td>
          <td width="160">
            <v-btn flat icon color="grey darken-1" @click.native="edit(props.item._id)">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn flat icon color="grey darken-1" @click.native="remove(props.item._id, true, props.item.thumbnail)">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <v-fab-transition>
        <v-btn fab fixed bottom right dark color="orange" @click.native="display = 'add'">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>

    <!-- Edit mode -->
    <div v-else-if="display === 'edit'">
      <v-card>
        <v-container>
          <h3>Edición video</h3>
          <v-layout fill-height>
            <v-flex xs12>
              <v-text-field name="title" label="Título" v-model="video.name"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy
                      transition="scale-transition" offset-y full-width min-width="290px">
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-select v-model="categoriesSelected" :items="getCategories" label="Categorías" chips tags></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-card class="image">
                <img v-if="imagePreview" :src="imagePreview" class="image">
                <img v-else :src="video.thumbnail || placeHolderImage" class="image">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <input type="file" @change="inputUploadImage" ref="image" style="display: none;">
                  <v-btn icon @click.native="$refs.image.click()">
                    <v-icon color="grey darken-1">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click.native="video.thumbnail = ''; imagePreview = ''">
                    <v-icon color="grey darken-1">delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs9>
              <v-text-field name="url" label="Url" v-model="video.url"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-select :items="['video', 'image']" v-model="video.type" label="Tipo" single-line></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="content" label="Contenido" v-model="video.description" multi-line></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-right>
            <v-flex xs12 text-xs-right>
              <div>
                <v-btn align-center color="error" outline @click.native="goToAll()">Cerrar</v-btn>
                <v-btn align-center color="success" outline @click.native="save(video._id)">Guardar</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>

    <!-- Create -->
    <div v-else-if="display === 'add'">
      <v-card>
        <v-container>
          <h3>Nueva noticia</h3>
          <v-layout fill-height>
            <v-flex xs12>
              <v-text-field name="title" label="Título" v-model="video.name"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy
                      transition="scale-transition" offset-y full-width min-width="290px">
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-select v-model="categoriesSelected" :items="getCategories" label="Categorías" chips tags></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-card class="image">
                <img v-if="imagePreview" :src="imagePreview" class="image">
                <img v-else :src="video.thumbnail || placeHolderImage" class="image">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <input type="file" @change="inputUploadImage" ref="image" style="display: none;">
                  <v-btn icon @click.native="$refs.image.click()">
                    <v-icon color="grey darken-1">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click.native="video.thumbnail = ''; imagePreview = ''">
                    <v-icon color="grey darken-1">delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs9>
              <v-text-field name="url" label="Url" v-model="video.url"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-select :items="['video', 'image']" v-model="video.type" label="Tipo" single-line></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="content" label="Contenido" v-model="video.description" multi-line></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-right>
            <v-flex xs12 text-xs-right>
              <div>
                <v-btn align-center color="error" outline @click.native="goToAll()">Cerrar</v-btn>
                <v-btn align-center color="success" outline @click.native="addNewVideo(video)">Crear</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>

    <v-dialog v-model="deleteItemModal" max-width="550">
      <v-card>
        <v-card-title class="headline">¿Esta seguro que desea eliminar el video?</v-card-title>
        <v-card-text>
          <img :src="video.thumbnail || placeHolderImage" width="420" style="display: block; margin: auto">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outline flat="flat" @click.native="remove(video._id, false)">Eliminar</v-btn>
          <v-btn color="success" outline flat="flat" @click.native="deleteItemModal = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import {service} from '@/services/general_service.js';
  import moment from 'moment';
  import placeHolderImage from 'static/img/placeholder-img.png';
  import jwt_decode from 'jwt-decode'
  import _ from 'lodash'

  export default {
    name: 'news',
    data: () => ({
      deleteItemModal: false,
      placeHolderImage: placeHolderImage,
      categoriesSelected: [],
      date: '',
      menu: '',
      form: '',
      imagePreview: '',
      display: 'all',
      videos: [],
      video: {},
      newsEditionSelected: {
        title: '',
      },
      headers: [
        {
          text: 'Imagen destacada',
          value: 'thumbnail',
          sortable: false,
        },
        {
          text: 'Nombre',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Descripción',
          value: 'description',
          // align: 'right',
          sortable: false,
        },
        {
          text: 'Tipo',
          value: 'type',
          // align: 'center',
          sortable: false,
        }
      ]
    }),
    methods: {
      goToAll() {
        this.display = 'all';
        this.video = {};
        this.categoriesSelected = [];
        this.imagePreview = '';
        this.deleteItemModal = false
        this.loadData();
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
      remove(id, dialog = true, image = '') {
        if (dialog) {
          this.video.thumbnail = image
          this.video._id = id
          this.deleteItemModal = true
        } else {
          service()
            .delete('/video/' + id)
            .then(res => {
              this.goToAll()
            });
        }
      },
      edit(id) {
        service()
          .get('video/' + id)
          .then(res => {
            this.display = 'edit';
            this.video = res.data.video;
            this.categoriesSelected = this.video.tags
          });
      },
      save(id) {
        this.video.tags = this.categoriesSelected
        if (this.form) {
          service()
            .post('/file/subir', this.form)
            .then(res => {
              this.video.thumbnail = res.data.path
              service()
                .put('video/' + id, this.video)
                .then(res => {
                  this.goToAll();
                });
            });
        } else {
          service()
            .put('video/' + id, this.video)
            .then(res => {
              this.goToAll();
            });
        }
      },
      loadData() {
        service()
          .get('/video')
          .then(res => {
            this.videos = res.data.videos;
          });
      },
      addNewVideo (video) {
        let user = jwt_decode(localStorage.getItem('user-token'))
        if (this.form) {
          service()
            .post('/file/subir', this.form)
            .then(res => {
              service()
                .post('video', {
                  creator: {
                    _id: user.id,
                    name: user.name
                  },
                  thumbnail: res.data.path,
                  name: video.name,
                  description: video.description,
                  url: video.url,
                  type: video.type,
                  tags: this.categoriesSelected
                })
                .then(res => {
                  this.goToAll();
                });
            });
        } else {
          service()
            .post('video', {
              creator: {
                _id: user.id,
                name: user.name
              },
              thumbnail: video.thumbnail,
              name: video.name,
              description: video.description,
              url: video.url,
              type: video.type,
              tags: this.categoriesSelected
            })
            .then(res => {
              this.goToAll();
            });
        }

      }
    },
    created() {
      this.loadData();
    },
    filters: {
      summary(value) {
        if (!value) return '';
        value = value.substring(0, 60);
        value = value.replace(/\<(\/?)p\>/gm, '');
        return value + '...';
      },
      humanDate(value) {
        if (!value) return '';
        return moment(value).format('DD MMM YYYY');
      },
    },
    computed: {
      getCategories() {
        let categories = ['Casa matriz', 'Proyectos', 'RSE y Capacitaciones']
        this.videos.forEach(video => {
          video.tags.forEach(category => {
            categories.push(category)
          })
        })
        return _.uniq(categories);
      }
    }
  };
</script>

<style lang="sass" scoped>
  .image
    margin: 20px auto
    max-width: 600px
    width: 100%
    display: block
    & img
      margin: 0
  h3
    font-size: 24px
    font-weight: 400
    margin-bottom: 20px
  .thumbnail
    width: 90px
    margin-top: 10px
</style>

<style lang="sass">
  .theme--light .input-group input,
  .theme--light .input-group textarea
    color: #666666 !important
</style>
