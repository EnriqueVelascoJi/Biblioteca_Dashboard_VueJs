<template>
  <v-container>
        <v-data-table
    :headers="headers"
    :items="socios"
    sort-by="calories"
    class="elevation-1"
    >
    <template v-slot:top>
        <v-toolbar
        flat
        >
        <v-toolbar-title>Socios</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
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
                Agregar Socio
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
                    sm="6"
                    md="4"
                    >
                    <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                    <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                    <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                    <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                    <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
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
                Cancel
                </v-btn>
                <v-btn
                color="blue darken-1"
                text
                @click="save"
                >
                Save
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
                { text: 'Nombre', value: 'nombre'},
                { text: 'Identificador', value: 'identificador' },
                { text: 'Teléfono', value: 'telefono', sortable: false  },
                { text: 'Email', value: 'email', sortable: false  },
                { text: 'Reputación', value: 'reputacion', sortable: false  },
                { text: 'Puntos', value: 'puntos' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            socios: [],
            editedIndex: -1,
            editedItem: {
                nombre: '',
                identificador: 0,
                telefono: '',
                email: 0,
                reputacion: 0,
                puntos: 0,
            },
            defaultItem: {
                nombre: '',
                identificador: 0,
                telefono: '',
                email: 0,
                reputacion: 0,
                puntos: 0,
            },
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Socio' : 'Editar Socio'
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
        this.socios = [
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Mala',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Mala',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Mala',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Mala',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
          {
            nombre: 'Enrique Velasco Jimenez',
            identificador: '2019640343',
            telefono: '5510007710',
            email: 'enriquevel_233@gmail.com',
            reputacion: 'Buena',
            puntos: 3,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.socios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.socios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.socios.splice(this.editedIndex, 1)
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
          Object.assign(this.socios[this.editedIndex], this.editedItem)
        } else {
          this.socios.push(this.editedItem)
        }
        this.close()
      },
    }

}
</script>

<style>

</style>