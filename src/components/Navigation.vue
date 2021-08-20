<template>
  <nav>
    <v-app-bar
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
        dark
        >
        <v-list>
            <v-list-item
            v-for="item in itemsSingle"
            :key="item.title"
            link
            :to="item.path"
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
              :to="child.path"
              
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
            { title: 'Home', icon: 'mdi-home', path: '/' },
            { title: 'Socios', icon: 'mdi-account', path: '/socios' },
            { title: 'Libros', icon: 'mdi-book-open-variant', path: '/libros' },
          ],
          itemsMultiple: [
            {
              action: 'mdi-clipboard-text',
              items: [
                {title: 'Registrar Préstamo', icon: 'mdi-cart', path: '/registrar_prestamo' },
                {title: 'Registrar Renta', icon: 'mdi-printer', path: '/registrar_renta' },
                {title: 'Registrar Venta', icon: 'mdi-printer', path: '/registrar_venta' },
              ],
              title: 'Registros',
            },
            {
              action: 'mdi-content-save',
              items: [
                {title: 'Ficha Préstamo', icon: 'mdi-folder', path: '/fichas_prestamo' },
                {title: 'Ficha Renta', icon: 'mdi-folder', path: '/fichas_renta' },
              ],
              title: 'Fichas',
            },
            {
              action: 'mdi-cash-100',
              items: [
                {title: 'Historial Ventas', icon: 'mdi-chart-timeline-variant', path: '/ventas' },
                {title: 'Gráficos', icon: 'mdi-chart-bubble', path: 'graficos' },
              ],
              title: 'Ventas',
            },
            {
              action: 'mdi-tag',
              items: [
                {title: 'Multas', icon: 'mdi-pin', path: '/multas' },
                {title: 'Lista de espera', icon: 'mdi-folder-clock', path: '/lista_espera' },
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