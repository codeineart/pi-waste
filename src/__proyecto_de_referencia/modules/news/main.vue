<template>
  <div id="dashboard">

    <!-- Show All -->
    <div v-if="display === 'all'">
      <h3>Noticias</h3>
      <v-data-table :headers="headers" :items="news" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.content | summary }}</td>
          <td class="text-xs-center" width="160">{{ props.item.creator.date | humanDate }}</td>
          <td class="text-xs-center" width="160">
            <v-btn flat icon color="grey darken-1" @click.native="edit(props.item._id)">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn flat icon color="grey darken-1" @click.native="remove(props.item._id)">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>

      <!-- BUTTON CLICK ADD NEW ENTRY -->
      <v-fab-transition>
        <v-btn fab fixed bottom right dark color="orange" @click="addNews()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>

    </div>

    <!-- Edit mode -->
    <div v-else-if="display === 'edit'">
      <v-card>
        <v-container>
          <h3>Edición noticia</h3>
          <v-layout fill-height>
            <v-flex xs9>
              <v-text-field name="title" label="Título" v-model="newsEditionSelected.title"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="newsEditionSelected.creator.date" label="Fecha" prepend-icon="event" readonly></v-text-field>
                <v-date-picker ref="picker" locale="es-cl" v-model="newsEditionSelected.creator.date" :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
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
                <img v-else :src="newsEditionSelected.cover_url || placeHolderImage" class="image">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <input type="file" @change="inputUploadImage" ref="image" style="display: none;">
                  <v-btn icon @click.native="$refs.image.click()">
                    <v-icon color="grey darken-1">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click.native="newsEditionSelected.cover_url = ''; imagePreview = ''">
                    <v-icon color="grey darken-1">delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="content" label="Contenido" v-model="newsEditionSelected.content" multi-line></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-right>
            <v-flex xs12 text-xs-right>
              <div>
                <v-btn align-center color="error" outline @click.native="goToAll()">Cerrar</v-btn>
                <v-btn align-center color="success" outline @click.native="save(newsEditionSelected._id)">Guardar</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>

    <div v-else-if="display === 'add'">
      <v-card>
        <v-container>
          <h3>Nueva noticia</h3>
          <v-layout fill-height>
            <v-flex xs9>
              <v-text-field name="title" label="Título" v-model="news.title"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="news.date" label="Fecha" prepend-icon="event" readonly></v-text-field>
                <v-date-picker ref="picker" v-model="news.date" locale="es-cl" :max="new Date().toISOString().substr(0, 10)"></v-date-picker>
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
                <img v-else :src="news.cover_url || placeHolderImage" class="image">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <input type="file" @change="inputUploadImage" ref="image" style="display: none;">
                  <v-btn icon @click.native="$refs.image.click()">
                    <v-icon color="grey darken-1">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click.native="news.cover_url = ''; imagePreview = ''">
                    <v-icon color="grey darken-1">delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field name="content" label="Contenido" v-model="news.content" multi-line></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-right>
            <v-flex xs12 text-xs-right>
              <div>
                <v-btn align-center color="error" outline @click.native="goToAll()">Cerrar</v-btn>
                <v-btn align-center color="success" outline @click.native="addNewNews(news)">Crear</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>

  </div>
</template>

<script>
/* @flow */
import { service } from '@/services/general_service.js';
import moment from 'moment';
import placeHolderImage from 'static/img/placeholder-img.png';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

export default {
  name: 'news',
  data: () => ({
    placeHolderImage: placeHolderImage,
    categoriesSelected: [],
    date: null,
    menu: '',
    form: '',
    imagePreview: '',
    display: 'all',
    news: {},
    newsEditionSelected: {
      title: '',
    },
    headers: [
      {
        text: 'Título',
        value: 'title',
        sortable: false,
      },
      {
        text: 'Resumen',
        value: 'summary',
        align: 'right',
        sortable: false,
      },
      {
        text: 'Fecha',
        value: 'date',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Acción',
        value: 'title',
        align: 'center',
        sortable: false,
      },
    ],
    news: [],
  }),
  methods: {
    goToAll() {
      this.display = 'all';
      this.news = {};
      this.categoriesSelected = [];
      this.imagePreview = '';
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
    remove(id) {
      service()
        .delete('/news/' + id)
        .then(res => {
          this.loadData();
        });
    },
    edit(id) {
      service()
        .get('news/obtenerPorId?id=' + id)
        .then(res => {
          this.display = 'edit';
          if (typeof res.data.news.creator.date !== 'undefined') res.data.news.creator.date = res.data.news.creator.date.substring(0, 10);
          this.newsEditionSelected = res.data.news;
          this.categoriesSelected =res.data.news.tags
        });
    },
    save(id) {
      this.newsEditionSelected.tags = this.categoriesSelected
      if (this.form) {
        service()
          .post('/file/subir', this.form)
          .then(res => {
            service()
              .put('news/' + id, this.newsEditionSelected)
              .then(res => {
                this.goToAll();
              });
          });
      } else {
        service()
          .put('news/' + id, this.newsEditionSelected)
          .then(res => {
            this.goToAll();
          });
      }
    },
    addNews() {
      this.display = 'add';
    },
    loadData() {
      service()
        .get('/news/obtenerTodo')
        .then(res => {
          this.news = res.data.news;
        });
    },
    addNewNews(news) {
      let user = jwt_decode(localStorage.getItem('user-token'));
      if (this.form) {
        service()
          .post('/file/subir', this.form)
          .then(res => {
            service()
              .post('news', {
                creator: {
                  _id: user.id,
                  name: user.name,
                  date: news.date,
                },
                available: 'public',
                tags: this.categoriesSelected,
                cover_url: res.data.path,
                title: news.title,
                content: news.content,
              })
              .then(res => {
                this.goToAll();
              });
          });
      } else {
        service()
          .post('news', {
            creator: {
              _id: user.id,
              name: user.name,
              date: news.date,
            },
            available: 'public',
            tags: this.categoriesSelected,
            cover_url: '',
            title: news.title,
            content: news.content,
          })
          .then(res => {
            this.goToAll();
          });
      }
    },
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
      let categories = ['Responsabilidad social'];
      this.news.forEach(single => {
        single.tags.forEach(category => {
          categories.push(category);
        });
      });
      return _.uniq(categories);
    },
  },
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
</style>

<style lang="sass">
  .theme--light .input-group input,
  .theme--light .input-group textarea
    color: #666666 !important
</style>
