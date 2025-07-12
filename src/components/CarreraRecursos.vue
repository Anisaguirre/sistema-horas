<template>
  <div class="container my-4 animate__animated animate__fadeIn">
    <h2 class="text-success mb-4 text-center">Carrera Recursos Naturales</h2>

    <select v-model="cuatri" class="form-select w-100 mb-3">
      <option disabled value="">Selecciona un cuatrimestre</option>
      <option v-for="n in cuatrimestresPersonalizados" :key="n" :value="n">
        Cuatrimestre {{ n }}
      </option>
    </select>  

    <select v-model="grupo" class="form-select w-100 mb-3" v-if="mostrarSelectorGrupo">
      <option disabled value="">Selecciona un grupo</option>
      <option v-for="g in gruposDisponibles" :key="g" :value="g">
        Grupo {{ g }}
      </option>
    </select>

    <button class="btn btn-secondary mb-3 text-center" @click="volverSelector">REGRESAR</button>

    <transition name="fade" mode="out-in">
      <div v-if="cuatri && (!mostrarSelectorGrupo || grupo)">
        <h3 class="text-success mb-3">Materias Cuatrimestre {{ cuatri }}</h3>
        <table class="table table-success table-hover shadow-sm">
          <thead class="table-success">
            <tr>
              <th>Materia</th>
              <th>Horas</th>
              <th>Profesor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="materia in materiasDelCuatrimestre" :key="materia.nombre">
              <td>{{ materia.nombre }}</td>
              <td>{{ materia.horas }}</td>
              <td>
                <select v-model="materia.profesor" class="form-select form-select-sm">
                  <option :value="null" disabled>Selecciona profesor</option>
                  <option
                    v-for="profesor in profesoresVisibles"
                    :key="profesor.nombre"
                    :value="profesor.nombre"
                  >
                    {{ profesor.nombre }} ({{ profesor.carrera }})
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>

    <hr class="my-5" />
<div v-if="mostrarResumen" class="mt-5">
    <h2 class="text-success mb-3 text-center">Resumen de horas por profesor</h2>
    <ul class="list-group mb-4">
      <li
        v-for="profesor in profesoresVisibles"
        :key="profesor.nombre"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {{ profesor.nombre }} ({{ profesor.carrera }}) -
          <strong>{{ horasTotalesProfesor(profesor.nombre) }}</strong> horas
        </span>
        <button class="btn btn-outline-success btn-sm" @click="mostrarDetalleProfesor(profesor)">
          Ver detalle
        </button>

      </li>
    </ul>
     </div>
            <button @click="cerrarSesion" class="btn btn-danger mt-4">Cerrar sesión</button>

  </div>
</template>

<script>
import { materiasRecursos } from "@/data/materiasRecursos";
import { profesoresCombinados } from "@/data/profesoresCombinados";

export default {
  name: "CarreraRecursos",
  data() {
    return {
      mostrarResumen: false,
      cuatri: "",
      grupo: "",
      gruposDisponibles: ["A", "B", "C", "D"],
      cuatrimestresConGrupos: [1], // cuatrimestres que tienen grupos
      profesores: profesoresCombinados, // array con objetos { nombre, carrera }
      materiasRecursos, // renombrado para mayor consistencia
      asignaciones: {},
      cuatrimestresPersonalizados: [1, 2, 3, 4, 5, 7, 8, 9, 10],
      mapaIndicesCuatrimestres: {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        7: 5,
        8: 6,
        9: 7,
        10: 8,
      },
    };
  },

  computed: {
    mostrarSelectorGrupo() {
      return this.cuatrimestresConGrupos.includes(this.cuatri);
    },
    materiasDelCuatrimestre() {
      if (
        !this.asignaciones ||
        !this.cuatri ||
        (this.mostrarSelectorGrupo && !this.grupo)
      ) {
        return [];
      }
      const key = this.mostrarSelectorGrupo
        ? `${this.cuatri}-${this.grupo}`
        : `${this.cuatri}-ÚNICO`;

      return this.asignaciones[key] || [];
    },
    profesoresVisibles() {
    // Asumiendo que tienes una lista completa de profesores en this.profesores
    if (this.cuatri === 1) {
      return this.profesores; // mostrar todos
    } else {
      // Cambia 'TI' por la carrera que quieras mostrar en cuatris > 1
      return this.profesores.filter(p => p.carrera === 'Recursos');
    }
  },

  },

  watch: {
    cuatri(val) {
      this.crearAsignacionSiNoExiste();
          localStorage.setItem("cuatriSeleccionado", val);

      if (!this.mostrarResumen) {
      this.mostrarResumen = true; // solo la primera vez
    }
    },
    grupo(val) {
      this.crearAsignacionSiNoExiste();
          localStorage.setItem("grupoSeleccionado", val);

    },
     asignaciones: {
      handler() {
        this.guardarAsignaciones();
      },
      deep: true,
    },
  },
 created() {
    this.cargarAsignaciones();
  const cuatriGuardado = localStorage.getItem("cuatriSeleccionado");
  const grupoGuardado = localStorage.getItem("grupoSeleccionado");

  if (cuatriGuardado) {
    this.cuatri = isNaN(+cuatriGuardado) ? cuatriGuardado : +cuatriGuardado;
    this.mostrarResumen = true;
  }

  if (grupoGuardado) {
    this.grupo = grupoGuardado;
  }
},

  methods: {
  guardarAsignaciones() {
    localStorage.setItem('asignaciones', JSON.stringify(this.asignaciones));
  },
    
  cargarAsignaciones() {
    const guardado = localStorage.getItem('asignaciones');
    if (guardado) {
      this.asignaciones = JSON.parse(guardado);
    }
  },

    cerrarSesion() {
      localStorage.removeItem("asignaciones"); // o localStorage.clear()
        localStorage.removeItem("cuatriSeleccionado");
  localStorage.removeItem("grupoSeleccionado");

      this.$router.push({ name: "LoginInicio" });
    },
     volverSelector() {
      this.$router.push("/selector");
    },
    horasTotalesProfesor(nombreProfesor) {
      return Object.values(this.asignaciones)
        .flat()
        .filter((m) => m.profesor === nombreProfesor)
        .reduce((acc, m) => acc + (m.horas || 0), 0);
    },
    
    mostrarDetalleProfesor(profesor) {
      localStorage.setItem("asignaciones", JSON.stringify(this.asignaciones));
      this.$router.push({
        name: "DetalleProfesorRecursos",
        params: { nombre: profesor.nombre },
        query: { carrera: profesor.carrera },
      });
    },
      crearAsignacionSiNoExiste() {
      const indice = this.mapaIndicesCuatrimestres[this.cuatri];
      const clave = this.mostrarSelectorGrupo
        ? `${this.cuatri}-${this.grupo}`
        : `${this.cuatri}-ÚNICO`;

      if (
        this.cuatri &&
        (!this.mostrarSelectorGrupo || this.grupo) &&
        indice !== undefined &&
        !this.asignaciones[clave]
      ) {
        this.asignaciones[clave] = JSON.parse(
          JSON.stringify(this.materiasRecursos[indice])
        );
      }
    },
  },
};

  
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
