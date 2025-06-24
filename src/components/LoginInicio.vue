<template>
  <div class="container mt-5" style="max-width: 500px;">
    <div class="card p-4 animate__animated animate__fadeInDown text-center">
      
      <!-- Imagen del logo -->
<img
  src="@/assets/UTM.jpg"
  alt="Logo"
  class="mx-auto d-block mb-3 animate__animated animate__zoomIn"
  style="width: 120px; height: 120px; padding: 5px; background: white;"
/>
      <h3 class="mb-4">Inicio de sesión</h3>

      <form @submit.prevent="login">
        <div class="mb-3 text-start">
          <label for="username" class="form-label">Usuario</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3 text-start">
          <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
      </form>

      <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginInicio", // Cambiado aquí
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      USER: "admin",
      PASS: "utm2025",
    };
  },
 methods: {
  login() {
    this.errorMessage = "";
    if (this.username === this.USER && this.password === this.PASS) {
      this.$emit('login-success');
    } else {
      this.errorMessage = "Usuario o contraseña incorrectos";
    }
  },
}

  }
</script>
<style>
body {
  background-color: #f5f5f5; /* gris bajito */
  margin: 0;
  font-family: Arial, sans-serif; /* o la que uses */
}
</style>
