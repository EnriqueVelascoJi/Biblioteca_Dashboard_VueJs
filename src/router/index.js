import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Socio from '../views/Socio.vue'
import Libro from '../views/Libro.vue'
import Multa from '../views/Multa.vue'
import ListaEsepra from '../views/ListaEspera.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/socio',
    name: 'Socio',
    component: Socio
  },
  {
    path: '/libro',
    name: 'Libro',
    component: Libro
  },
  {
    path: '/multa',
    name: 'Multa',
    component: Multa
  },
  {
    path: '/lista_espera',
    name: 'ListaEsepra',
    component: ListaEsepra
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
