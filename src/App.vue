<template>
  <div>
    <nav v-if="isLoggedIn" class="navbar">
      
    </nav>

    <router-view @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
      this.$router.push('/selector'); // Ruta al selector de carreras o dashboard
    },
    goTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
<style>
body {
  background-color: #f5f5f5; /* gris bajito */
  margin: 0;
  font-family: Arial, sans-serif; /* o la que uses */
}
</style>
