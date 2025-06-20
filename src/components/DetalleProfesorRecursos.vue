<template>
  <div class="container my-4 animate__animated animate__fadeIn detalle-profesor print-area">
    <h2 class="text-center text-primary mb-3">Detalle de {{ profesor }}</h2>

    <ul class="list-group mb-3">
      <li
        v-for="materia in materiasProfesor"
        :key="materia.nombre"
        class="list-group-item d-flex justify-content-between"
      >
        <span>{{ materia.nombre }} (Cuatri {{ obtenerCuatri(materia) }})</span>
        <span><strong>{{ materia.horas }} horas</strong></span>
      </li>
    </ul>
    <p><strong>Total horas: {{ totalHoras }}</strong></p>

    <button class="btn btn-primary me-2" @click="imprimir">Descargar e Imprimir</button>
    <router-link to="/recursos" class="btn btn-secondary ms-2">Regresar</router-link>
  </div>
</template>

<script>
import { materiasRecursos } from "@/data/materiasRecursos";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "DetalleProfesorRecursos",
  data() {
    return {
      profesor: this.$route.params.nombre,
      materias: materiasRecursos,
    };
  },
  computed: {
    materiasProfesor() {
      return this.materias.flat().filter(m => m.profesor === this.profesor);
    },
    totalHoras() {
      return this.materiasProfesor.reduce((acc, m) => acc + m.horas, 0);
    },
  },
  methods: {
    obtenerCuatri(materia) {
      return this.materias.findIndex(c => c.includes(materia)) + 1;
    },
    imprimir() {
      window.print();
    },
    descargarPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(`Detalle de ${this.profesor}`, 14, 22);

      const rows = this.materiasProfesor.map((m) => [
        m.nombre,
        `Cuatri ${this.obtenerCuatri(m)}`,
        `${m.horas} horas`,
      ]);

      doc.autoTable({
        head: [["Materia", "Cuatrimestre", "Horas"]],
        body: rows,
        startY: 30,
      });

      doc.text(`Total horas: ${this.totalHoras}`, 14, doc.lastAutoTable.finalY + 10);
      doc.save(`detalle-${this.profesor}.pdf`);
    },
  },
};
</script>
<style scoped>
@media print {
  /* Oculta todo por defecto */
  body * {
    visibility: hidden;
  }

  /* Muestra solo el contenido dentro de .print-area */
  .print-area, .print-area * {
    visibility: visible;
  }

  /* Asegura que el contenido imprimible esté en la parte superior */
  .print-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  /* Oculta los botones al imprimir */
  button, a {
    display: none !important;
  }
}
</style>
