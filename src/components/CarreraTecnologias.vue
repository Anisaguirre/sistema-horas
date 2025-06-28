<template>
  <div class="container my-4 animate__animated animate__fadeIn">
  <h2 class="text-primary mb-4 text-center">Carrera Tecnologías de la Información</h2>
   <select v-model="cuatri" class="form-select w-100 mb-3">
  <option disabled value="">Selecciona un cuatrimestre</option>
  <option v-for="n in cuatrimestresPersonalizados" :key="n" :value="n">
    Cuatrimestre {{ n }}
  </option>
</select>


<button class="btn btn-secondary mb-3 text-center" @click="volverSelector"> REGRESAR</button>

    <transition name="fade" mode="out-in">
      <div v-if="cuatri">
        <h3 class="text-primary mb-3">Materias Cuatrimestre {{ cuatri }}</h3>
        <table class="table table-info table-hover shadow-sm">
          <thead class="table-info">
            <tr>
              <th>Materia</th>
              <th>Horas</th>
              <th>Profesor</th>
            </tr>
          </thead>
          <tbody>
            <tr
             v-for="materia in materiasDelCuatrimestre" :key="materia.nombre">
              <td>{{ materia.nombre }}</td>
              <td>{{ materia.horas }}</td>
              <td>
                <select
                  v-model="materia.profesor"
                  class="form-select form-select-sm"
                >
                  <option :value="null" disabled>Selecciona profesor</option>
                  <option
                    v-for="profesor in profesores"
                    :key="profesor"
                    :value="profesor"
                  >
                    {{ profesor }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>

    <hr class="my-5" />

    <h2 class="text-primary mb-3 text-center">Resumen de horas por profesor</h2>
    <ul class="list-group mb-4">
      <li
        v-for="profesor in profesores"
        :key="profesor"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ profesor }} - <strong>{{ horasTotalesProfesor(profesor) }}</strong> horas</span>
        <button
          class="btn btn-outline-primary btn-sm"
          @click="mostrarDetalleProfesor(profesor)"
        >
          Ver detalle
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { materias, profesores } from "@/data/materiasTecnologias";

export default {
  name: "CarreraTecnologias",
 data() {
  return {
    cuatri: null,
    profesorSeleccionado: null,
    detalleVisible: false,
    profesores,
    materias,
    cuatrimestreSeleccionado: null,
    cuatrimestresPersonalizados: [1, 2, 3, 4, 5, 7, 8, 9,10],
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
    materiasDelCuatrimestre() {
      const indice = this.mapaIndicesCuatrimestres[this.cuatri];
      return indice !== undefined ? this.materias[indice] : [];
    },
  },
  methods: {
    volverSelector() {
      this.$router.push('/selector');
    },
    horasTotalesProfesor(profesor) {
      return this.materias
        .flat()
        .filter((m) => m.profesor === profesor)
        .reduce((a, b) => a + b.horas, 0);
    },
    mostrarDetalleProfesor(profesor) {
      this.$router.push({
        name: "DetalleProfesor",
        params: { nombre: profesor },
      });
    },
    obtenerCuatri(materia) {
      return this.materias.findIndex((c) => c.includes(materia)) + 1;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>

