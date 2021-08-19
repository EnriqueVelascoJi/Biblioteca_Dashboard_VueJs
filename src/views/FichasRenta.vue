<template>
  <v-container>
    <v-data-table
    :headers="headers"
    :items="rentas"
    :search="search"
    class="elevation-1"
    >
      <template v-slot:top>
          <v-toolbar
          flat
          >
          <v-toolbar-title>Fichas Renta</v-toolbar-title>
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
          <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
              <v-card-title class="text-h5">¿Seguro que deseas eliminar el registro?</v-card-title>
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

            dialogDelete: false,
            headers: [
                { text: 'Socio identificador', value: 'soc_identificador'},
                { text: 'Socio nombre', value: 'soc_nombre' },
                { text: 'Titulo del libro', value: 'lib_titulo', sortable: false  },
                { text: 'ISBN', value: 'lib_isbn'},
                { text: 'Fecha renta', value: 'fecha_renta', sortable: false},
                { text: 'Fecha regreso', value: 'fecha_regreso', sortable: false },
                { text: 'Estado', value: 'estado', sortable: false  },
                { text: 'Opciones', value: 'actions'}
            ],
            rentas: [],
            editedIndex: -1,
            editedItem: {
                soc_identificador: '',
                soc_nombre: 0,
                lib_titulo: '',
                lib_isbn: 0,
                fecha_renta: 0,
                fecha_regreso: 0,
                estado: 0
            },
            defaultItem: {
                soc_identificador: '',
                soc_nombre: 0,
                lib_titulo: '',
                lib_isbn: 0,
                fecha_renta: 0,
                fecha_regreso: 0,
                estado: 0
            },
            search: ''
        }
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
        this.rentas = [
           {
                soc_identificador: '',
                soc_nombre: 0,
                lib_titulo: '',
                lib_isbn: 0,
                fecha_renta: 0,
                fecha_regreso: 0,
                estado: 0
           }
        ]
      },
      deleteItem (item) {
        this.editedIndex = this.rentas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.rentas.splice(this.editedIndex, 1)
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
      }
    }

}
</script>

<style>

</style>


