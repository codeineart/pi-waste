<template>
  <div id="dashboard">

    <!-- Show All -->
    <div v-if="display === 'all'">
      <h3>Estructura organizacional</h3>
      <v-data-table :headers="headers" :items="desserts" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>
            <img :src="props.item.meta.avatar_url" class="avatar-image">
          </td>
          <td>{{ props.item.meta.title }}</td>
          <td>{{ props.item.meta.content }}</td>
          <td class="text-xs-center">{{ props.item.meta.row }}</td>
          <td class="text-xs-center">{{ props.item.meta.col }}</td>
          <td class="text-xs-center" width="160">
            <v-btn flat icon color="grey darken-1" @click.native="edit(props.item._id)">
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn flat icon color="grey darken-1" @click.native="remove(props.item._id, true, props.item.meta.avatar_url)">
              <v-icon dark>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <v-fab-transition>
        <v-btn fab fixed bottom right dark color="orange" @click.native="add()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>

    <!-- Edit mode -->
    <div v-else-if="display === 'edit'">
      <v-card>
        <v-container>
        <h3>Edición persona comité paritario</h3>
        <v-layout fill-height>
          <v-flex xs6 pl-2 pr-2>
            <v-text-field name="title" label="Título" v-model="person.title"></v-text-field>
          </v-flex>
          <v-flex xs6 pl-2 pr-2>
            <v-text-field name="content" label="Cargo" v-model="person.content"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 pl-2 pr-2>
            <v-card class="image">
              <img v-if="imagePreview" :src="imagePreview" class="image">
              <img v-else :src="person.avatar_url || placeHolderImage" class="image">
              <v-card-actions>
                <v-spacer></v-spacer>
                <input type="file" @change="inputUploadImage" ref="image" style="display: none;">
                <v-btn icon @click.native="$refs.image.click()">
                  <v-icon color="grey darken-1">edit</v-icon>
                </v-btn>
                <v-btn icon @click.native="deleteImage()">
                  <v-icon color="grey darken-1">delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
          <v-layout row>
          <v-flex xs6 pl-2 pr-2>
            <v-text-field name="row" label="Fila" v-model="person.row"></v-text-field>
          </v-flex>
          <v-flex xs6 pl-2 pr-2>
            <v-text-field name="col" label="Columna" v-model="person.col"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-right>
          <v-flex xs12 text-xs-right>
            <div>
              <v-btn align-center color="error" outline @click.native="goToAll()">Cerrar</v-btn>
              <v-btn align-center color="success" outline @click.native="update(person._id)">Guardar</v-btn>
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
          <h3>Edición persona comité paritario</h3>
          <v-layout fill-height>
            <v-flex xs6 pl-2 pr-2>
              <v-text-field name="title" label="Título" v-model="person.title"></v-text-field>
            </v-flex>
            <v-flex xs6 pl-2 pr-2>
              <v-text-field name="content" label="Cargo" v-model="person.content"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 pl-2 pr-2>
              <v-card class="image">
                <img v-if="imagePreview" :src="imagePreview" class="image">
                <img v-else :src="person.avatar_url || placeHolderImage" class="image">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <input type="file" @change="inputUploadImage" ref="image" style="display: none;">
                  <v-btn icon @click.native="$refs.image.click()">
                    <v-icon color="grey darken-1">edit</v-icon>
                  </v-btn>
                  <v-btn icon @click.native="person.cover_url = ''; imagePreview = ''">
                    <v-icon color="grey darken-1">delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs6 pl-2 pr-2>
              <v-text-field name="row" label="Fila" v-model="person.row"></v-text-field>
            </v-flex>
            <v-flex xs6 pl-2 pr-2>
              <v-text-field name="col" label="Columna" v-model="person.col"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-right>
            <v-flex xs12 text-xs-right>
              <div>
                <v-btn align-center color="error" outline @click.native="goToAll()">Cerrar</v-btn>
                <v-btn align-center color="success" outline @click.native="save(person._id)">Guardar</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>

    <!-- Modal boorar -->
    <v-dialog v-model="deleteItemModal" max-width="550">
      <v-card>
        <v-card-title class="headline">¿Esta seguro que desea eliminar persona?</v-card-title>
        <v-card-text>
          <img :src="person.avatar_url || placeHolderImage" width="420" style="display: block; margin: auto">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outline flat="flat" @click.native="remove(person._id, false)">Eliminar</v-btn>
          <v-btn color="success" outline flat="flat" @click.native="deleteItemModal = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import { service } from '@/services/general_service.js';
  import moment from 'moment'
  import placeHolderImage from 'static/img/placeholder-img.png'

  export default {
    name: 'comite',
    data: () => ({
      deleteItemModal: false,
      placeHolderImage: placeHolderImage,
      date: '',
      menu: '',
      form: '',
      person: {},
      imagePreview: '',
      display: 'all',
      newsEditionSelected: {
        title: ''
      },
      headers: [
        {
          text: 'Imagen',
          value: 'title',
          sortable: false
        },
        {
          text: 'Nombre',
          value: 'title',
          sortable: false
        },
        {
          text: 'Cargo',
          value: 'title',
          sortable: false
        },
        {
          text: 'Posición fila',
          value: 'title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Posición columna',
          value: 'title',
          align: 'center',
          sortable: false
        },
        {
          text: 'Acción',
          value: 'title',
          align: 'center',
          sortable: false
        }
      ],
      desserts: []
    }),
    methods: {
      goToAll () {
        this.display = 'all'
        this.imagePreview = ''
        this.form = ''
        this.deleteItemModal = false
        this.loadData();
        this.$forceUpdate()
      },
      deleteImage () {
        this.person.avatar_url = ''
        this.imagePreview = ''
        this.$forceUpdate()
      },
      inputUploadImage (event) {
        if (event) {
          this.form = new FormData()
          let image = event.target.files[0]
          this.form.append('file', image, image.name)
          let reader = new FileReader()
          reader.onload = imageLoad => { this.imagePreview = imageLoad.srcElement.result }
          reader.readAsDataURL(image)
        }
      },
      remove(id, dialog = true, image = '') {
        if (dialog) {
          this.person.avatar_url = image
          this.person._id = id
          this.deleteItemModal = true
        } else {
          service()
            .delete('/organization_chart/' + id)
            .then(res => {
              this.goToAll()
            });
        }
      },
      edit (id) {
        service().get('/organization_chart/' + id).then(res => {
          this.person = res.data.member.meta
          this.person._id = res.data.member._id
          this.display = 'edit'
        })
      },
      update (id) {
        if (this.form) {
          service()
            .post('/file/subir', this.form)
            .then(res => {
              this.person.avatar_url = res.data.path
              service().put('/organization_chart/' + id, {
                meta: this.person
              }).then(res => {
                this.goToAll()
              })
            });
        } else {
          service().put('/organization_chart/' + id, {
            meta: this.person
          }).then(res => {
            this.goToAll()
          })
        }
      },
      loadData () {
        service().get('/info/organization_chart').then(res => {
          this.desserts = res.data.info
        })
      },
      add () {
        this.person = {}
        this.display = 'add'
      },
      save () {
        if (this.form) {
          service()
            .post('/file/subir', this.form)
            .then(res => {
              this.person.avatar_url = res.data.path
              service().post('/organization_chart', {
                meta: this.person
              }).then(res => {
                this.goToAll()
              })
            });
        } else {
          service().post('/organization_chart', {
            meta: this.person
          }).then(res => {
            this.goToAll()
          })
        }
      }
    },
    created () {
      this.loadData()
    },
    filters: {
      summary (value) {
        if (!value) return ''
        value = value.substring(0, 60)
        value = value.replace(/\<(\/?)p\>/gm, '')
        return value + '...'
      },
      humanDate (value) {
        if (!value) return ''
        return moment(value).format('DD MMM YYYY')
      }
    }
  }
</script>

<style lang="sass" scoped>
  .avatar-image
    height: 45px
    margin-top: 10px
    border-radius: 50%
  .image
    margin: 20px auto
    max-width: 300px
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
