<template>
  <nav>
    <v-app-bar
      color="blue-grey lighten-1"
      dark
      app
      
    >
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-flex d-md-none d-lg-none d-xl-none"></v-app-bar-nav-icon>

      <v-toolbar-title>Sistema Biblioteca</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>


    <!-- Navigation Drawer -->
    <v-navigation-drawer
        v-model="drawer"
        class=""
        app
        bottom
        >
        <v-list>
            <v-list-item
            v-for="item in itemsSingle"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-for="item in itemsMultiple"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.items"
              :key="child.title"
              link
              
            >
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
            <v-btn block>
                Logout
            </v-btn>
            </div>
        </template>
        </v-navigation-drawer>
  </nav>

  

</template>

<script>
export default {
    data() {
        return {
          drawer: true,
          itemsSingle: [
            { title: 'Socios', icon: 'mdi-account' },
            { title: 'Libros', icon: 'mdi-book-open-variant' },
          ],
          itemsMultiple: [
            {
              action: 'mdi-clipboard-text',
              items: [
                {title: 'Registrar Préstamo', icon: 'mdi-cart' },
                {title: 'Registrar Renta', icon: 'mdi-printer' },
                {title: 'Registrar Venta', icon: 'mdi-printer' },
              ],
              title: 'Registros',
            },
            {
              action: 'mdi-content-save',
              items: [
                {title: 'Ficha Préstamo', icon: 'mdi-folder' },
                {title: 'Ficha Renta', icon: 'mdi-folder' },
              ],
              title: 'Fichas',
            },
            {
              action: 'mdi-cash-100',
              items: [
                {title: 'Historial Ventas', icon: 'mdi-chart-timeline-variant' },
                {title: 'Gráficos', icon: 'mdi-chart-bubble' },
              ],
              title: 'Ventas',
            },
            {
              action: 'mdi-tag',
              items: [
                {title: 'Multas', icon: 'mdi-pin' },
                {title: 'Lista de espera', icon: 'mdi-folder-clock' },
              ],
              title: 'Otros',
            },
          ],
          mini: true,
                
        }
    }

}
</script>

<style>

</style>