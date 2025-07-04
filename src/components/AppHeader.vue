<template>
  <header class="header">
        <div class="header-content">

    <img src="@/assets/UTM.jpg" alt="Logo 1" class="logo" />
    <div class="header-text">
        <h2 class="title">Universidad Tecnológica del Mezquital</h2>
        <p class="subtitle">Dpto. Subdirección Académica</p>
      </div>
    <img src="@/assets/venado.jpg" alt="Logo 2" class="logo" />
        </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
};
</script>


<style scoped>
.header {
  background: linear-gradient(to right, #4df030, #eedc3b);
  color: white;
  padding: 10px 20px; 
  text-align: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;

}

.title {
  margin: 0 10px; /* Pequeño espacio entre las imágenes y el texto */
  font-size: 1.6rem;
  white-space: nowrap; /* Evita que se rompa el texto en varias líneas */
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
