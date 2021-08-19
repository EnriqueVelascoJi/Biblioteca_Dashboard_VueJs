import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Socio from '../views/Socio.vue'
import Libro from '../views/Libro.vue'
import Multa from '../views/Multa.vue'
import ListaEsepra from '../views/ListaEspera.vue'
import Venta from '../views/Venta.vue'
import FichasPrestamo from '../views/FichasPrestamo.vue'
import FichasRenta from '../views/FichasRenta.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/socios',
    name: 'Socio',
    component: Socio
  },
  {
    path: '/libros',
    name: 'Libro',
    component: Libro
  },
  {
    path: '/multas',
    name: 'Multa',
    component: Multa
  },
  {
    path: '/lista_espera',
    name: 'ListaEsepra',
    component: ListaEsepra
  },
  {
    path: '/fichas_renta',
    name: 'FichasRenta',
    component: FichasRenta
  },
  {
    path: '/fichas_prestamo',
    name: 'FichasPrestamo',
    component: FichasPrestamo
  },
  {
    path: '/ventas',
    name: 'Venta',
    component: Venta
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
