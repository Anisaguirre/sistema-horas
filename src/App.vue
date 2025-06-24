<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppHeader v-if="isLoggedIn && mostrarEncabezado" />

    <main class="flex-grow-1">
      <router-view @login-success="handleLoginSuccess" />
    </main>

    <AppFooter v-if="isLoggedIn && mostrarEncabezado" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  computed: {
    mostrarEncabezado() {
      const rutasConEncabezado = ['/selector', '/recursos', '/tecnologias'];
      return rutasConEncabezado.includes(this.$route.path);
    }
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
      this.$router.push('/selector');
    },
    goTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
