<template>
  <v-container>
    <v-data-table
    :headers="headers"
    :items="ventas"
    :search="search"
    class="elevation-1"
    >
      <template v-slot:top>
          <v-toolbar
          flat
          >
          <v-toolbar-title>Ventas</v-toolbar-title>
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
    
          </v-toolbar>
      </template>
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

            headers: [
                { text: 'Forma de pago', value: 'forma_pago'},
                { text: 'Fecha y Hora', value: 'fecha_hora' },
                { text: 'Impuesto', value: 'impuesto', sortable: false  },
                { text: 'Total', value: 'total'}
            ],
            ventas: [],
            search: ''
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.ventas = [
                {
                    forma_pago: 'Efectivo',
                    fecha_hora: new Date().getDate(),
                    impuesto: '18%',
                    total: '242.23'
                }
            ]
        }
    }
    

}
</script>

<style>

</style>