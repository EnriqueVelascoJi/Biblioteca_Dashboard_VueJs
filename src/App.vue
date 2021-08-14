<template>
  <v-app>
    <navigation />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import './components/Navigation.vue'
import Navigation from './components/Navigation.vue';
export default {

  name: 'App',
  components: {
    Navigation
  },

  data: () => ({
    //
  }),
};
</script>
