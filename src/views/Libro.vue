<template>
  <v-container>
    <v-data-table
    :headers="headers"
    :items="libros"
    :search="search"
    class="elevation-1"
    >
      <template v-slot:top>
          <v-toolbar
          flat
          >
          <v-toolbar-title>Libros</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
              v-model="dialog"
              max-width="500px"
          >
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="orange darken-3"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                  Agregar Libro
              </v-btn>
              </template>
              <v-card>
              <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                  <v-container>
                  <v-row>
                      <v-col
                      cols="12"
                      >
                      <v-text-field
                          v-model="editedItem.titulo"
                          label="Título"
                      ></v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      >
                      <v-text-field
                          v-model="editedItem.autor"
                          label="Autor"
                      ></v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      md="6"
                      >
                      <v-text-field
                          v-model="editedItem.isbn"
                          label="ISBN"
                      ></v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      md="6"
                      >
                      <v-text-field
                          v-model="editedItem.editorial"
                          label="Editorial"
                      ></v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      md="6"
                      >
                      <v-text-field
                          v-model="editedItem.edicion"
                          label="Edición"
                      ></v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      md="6"
                      >
                      <v-text-field
                          v-model="editedItem.copias_venta"
                          label="Copias Venta"
                      ></v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      md="6"
                      >
                      <v-text-field
                          v-model="editedItem.copias_servicio"
                          label="Copias Servicio"
                      ></v-text-field>
                      </v-col>
                      <v-col
                      cols="12"
                      md="6"
                      >
                      <v-text-field
                          v-model="editedItem.precio"
                          label="Precio"
                      ></v-text-field>
                      </v-col>
                      
                  </v-row>
                  </v-container>
              </v-card-text>

              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                  >
                  Cancelar
                  </v-btn>
                  <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  >
                  Registrar
                  </v-btn>
              </v-card-actions>
              </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
              <v-card-title class="text-h5">¿Seguro que deseas eliminar el libro?</v-card-title>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">Aceptar</v-btn>
                  <v-spacer></v-spacer>
              </v-card-actions>
              </v-card>
          </v-dialog>
          </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
          <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
          >
          mdi-pencil
          </v-icon>
          <v-icon
          small
          @click="deleteItem(item)"
          >
          mdi-delete
          </v-icon>
      </template>
      <template v-slot:no-data>
          <v-btn
          color="primary"
          @click="initialize"
          >
          Reset
          </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {

    data() {
        return {

            dialog: false,
            dialogDelete: false,
            headers: [
                { text: 'Título', value: 'titulo'},
                { text: 'Autor', value: 'autor' },
                { text: 'ISBN', value: 'isbn', sortable: false  },
                { text: 'Edición', value: 'edicion', sortable: false  },
                { text: 'Editorial', value: 'editorial', sortable: false  },
                { text: 'Copias_venta', value: 'copias_venta', sortable: false },
                { text: 'Copias_servicio', value: 'copias_servicio', sortable: false },
                { text: 'Precio', value: 'precio' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            libros: [],
            editedIndex: -1,
            editedItem: {
                titulo: '',
                autor: 0,
                isbn: '',
                edicion: 0,
                editorial: 0,
                copias_venta: 0,
                copias_servicio: 0,
                precio: 0,

            },
            defaultItem: {
                titulo: '',
                autor: 0,
                isbn: '',
                edicion: 0,
                editorial: 0,
                copias_venta: 0,
                copias_servicio: 0,
                precio: 0,
            },
            search: ''
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Libro' : 'Editar Libro'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        this.libros = [
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
          {
            titulo: 'La tregua',
            autor: 'Mario Beneditti',
            isbn: '123413263526',
            edicion: 1,
            editorial: 'McHill',
            copias_venta: 3,
            copias_servicio: 5,
            precio: 45.2,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.libros.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.libros.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.libros.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.libros[this.editedIndex], this.editedItem)
        } else {
          this.libros.push(this.editedItem)
        }
        this.close()
      },
    }

}
</script>

<style>

</style>