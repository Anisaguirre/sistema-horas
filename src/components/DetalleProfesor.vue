<template>
  <div class="container my-4 animate__animated animate__fadeIn detalle-profesor print-area">
    <div class="text-center w-100 mt-5 mb-4">
      <h2 class="text-primary">
        Resumen de {{ profesor.nombre }} ({{ profesor.carrera }})
      </h2>
    </div>

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
    <router-link to="/tecnologias" class="btn btn-secondary ms-2">Regresar</router-link>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import { profesoresCombinados } from "@/data/profesoresCombinados"; // 👈 Asegúrate que este path esté bien

export default {
  name: "DetalleProfesor",
  data() {
    const nombre = this.$route.params.nombre;
    const encontrado = profesoresCombinados.find(p => p.nombre === nombre);

    return {
      profesor: encontrado || { nombre, carrera: "Sin carrera" },
      asignaciones: {},
      materiasProfesor: [],
    };
  },
  computed: {
    totalHoras() {
      return this.materiasProfesor.reduce((acc, m) => acc + (m.horas || 0), 0);
    }
  },
  created() {
    const guardado = localStorage.getItem("asignaciones");
    if (guardado) {
      this.asignaciones = JSON.parse(guardado);
      this.materiasProfesor = Object.values(this.asignaciones)
        .flat()
        .filter((m) => m.profesor === this.profesor.nombre);
    }
  },
  methods: {
    obtenerCuatri(materia) {
      for (const clave in this.asignaciones) {
        if (this.asignaciones[clave].includes(materia)) {
          return clave;
        }
      }
      return "Desconocido";
    },
    imprimir() {
      window.print();
    },
    descargarPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(`Detalle de ${this.profesor.nombre}`, 14, 22);

      const rows = this.materiasProfesor.map((m) => [
        m.nombre,
        this.obtenerCuatri(m),
        `${m.horas} horas`
      ]);

      doc.autoTable({
        head: [["Materia", "Cuatrimestre", "Horas"]],
        body: rows,
        startY: 30,
      });

      doc.text(`Total horas: ${this.totalHoras}`, 14, doc.lastAutoTable.finalY + 10);
      doc.save(`detalle-${this.profesor.nombre}.pdf`);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  .print-area,
  .print-area * {
    visibility: visible;
  }

  .print-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .print-area h2 {
    margin-top: 130px;
    text-align: center;
    font-size: 1.6rem;
    color: #0d6efd;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  button,
  a {
    display: none !important;
  }
}
</style>
