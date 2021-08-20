<template>
  <v-container>
    <v-toolbar
    flat
    >
    <v-toolbar-title>Registrar préstamo</v-toolbar-title>
    <v-divider
        class="mx-4"
        inset
        vertical
    ></v-divider>
    <v-spacer></v-spacer>
    </v-toolbar>
    <v-container>
        <v-row>
        <v-col
        cols="12"
        md="4"
        >
        <v-text-field
            label="Isbn"
        ></v-text-field>
        </v-col>
        <v-btn
            class="mx-2"
            fab
            dark
            color="indigo"
            >
            <v-icon dark>
                mdi-plus
            </v-icon>
        </v-btn>
    </v-row>
    </v-container>
    <v-data-table
    :headers="headers"
    :items="prestamos"
    class="elevation-1"
    >
      <template v-slot:no-data>
          <v-btn
          color="orange darken-3"
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
                { text: 'Titulo del libro', value: 'lib_titulo', sortable: false  },
                { text: 'ISBN', value: 'lib_isbn'},
                { text: 'Hora préstamo', value: 'hora_prestamo', sortable: false},
                { text: 'Hora regreso', value: 'hora_regreso', sortable: false },
                { text: 'Fecha', value: 'fecha', sortable: false },
                { text: 'Opciones', value: 'actions'}
            ],
            prestamos: [],
            editedIndex: -1,
            editedItem: {
                lib_titulo: '',
                lib_isbn: 0,
                hora_prestamo: 0,
                hora_regreso: 0,
                fecha: '',
            },
            defaultItem: {
                lib_titulo: '',
                lib_isbn: 0,
                hora_prestamo: 0,
                hora_regreso: 0,
                fecha: '',
            },
        }
    },
    methods: {
        initialize() {
            
            const currentHour = new Date().getTime();
            const returnHour = currentHour + 4;

            this.prestamos = [
                {
                    lib_titulo: 'La tregua',
                    lib_isbn: '232342332',
                    hora_prestamo: currentHour,
                    hora_regreso: returnHour,
                    fecha: new Date().toString()
                }
            ]
        }
    }
}
</script>

<style>

</style>