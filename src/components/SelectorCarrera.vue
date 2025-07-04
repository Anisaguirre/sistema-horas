<template>
  <div class="container text-center mt-2 animate__animated animate__fadeIn">
      
    <h1 class="selector-titulo">Bienvenido </h1>
<h2>
  <span class="subrayado-cuadro">Sistema para la asignación de horas al docente
  </span>
</h2>
  
<h3 class="">Selecciona una carrera</h3>
  
    <div class="d-flex justify-content-center gap-3 mt-2">
     
    <button class="btn-carrera" @click="$router.push('/tecnologias')">Tecnologías de la Informacion</button>
    <button class="btn-carrera2" @click="$router.push('/recursos')">Recursos Naturales</button>
    
  </div>
<button @click="cerrarSesion" class="btn btn-danger mt-4">Cerrar sesión</button>

  </div>
</template>


<script>
export default {
  name: "SelectorCarrera",
  methods: {
    irACarrera(carrera) {
      if (carrera === "recursos") {
        this.$router.push("/carrera-recursos");
      } else {
        this.$router.push("/carrera-tecnologias");
      }
    },
    cerrarSesion() {
    // Si estás usando localStorage o algún estado global, aquí lo limpias
    // localStorage.removeItem('usuarioAutenticado'); // solo si aplica

    this.$router.push('/'); // Redirige al login
  }
}
  };
</script>

<style scoped>
.selector-titulo {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #2c3e50;
  transition: color 0.3s ease;
  cursor: default;
}

.selector-titulo:hover {
  color: #71f750; /* cambia a azul suave al pasar mouse */
}

/* Botones un poco más elegantes */
.btn-carrera{
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  background: transparent;
  color: #2575fc;
  border: 2px solid #2575fc;
  padding: 0.6rem 1.6rem;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: color 0.4s ease;
  cursor: pointer;
}

.btn-carrera::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #d3dfd6;
  transition: left 0.4s ease;
  z-index: -1;
  border-radius: 10px;
}

.btn-carrera:hover {
  color: white;
}

.btn-carrera:hover::before {
  left: 0;
}
.btn-carrera2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  background: transparent;
  color: #1ace47;
  border: 2px solid #1ace47;
  padding: 0.6rem 1.6rem;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: color 0.4s ease;
  cursor: pointer;
}
.subrayado-cuadro {
  background-color: #c7f877; /* fondo tipo marcador suave */
  padding: 4px 8px;
  border-radius: 4px;
  box-decoration-break: clone;
}


.btn-carrera2::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #d3dfd6;
  transition: left 0.4s ease;
  z-index: -1;
  border-radius: 10px;
}

.btn-carrera2:hover {
  color: white;
}

.btn-carrera2:hover::before {
  left: 0;
}


</style>