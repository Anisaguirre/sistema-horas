// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginInicio.vue'; // Ajusta la ruta según tu estructura
import SelectorCarrera from '@/components/SelectorCarrera.vue';
// Importa los componentes que usarás en las rutas
import CarreraTecnologias from '../components/CarreraTecnologias.vue';
import CarreraRecursos from '@/components/CarreraRecursos.vue';
import DetalleProfesor from '../components/DetalleProfesor.vue';
import DetalleProfesorRecursos from "@/components/DetalleProfesorRecursos.vue";

const routes = [
     
      {
    path: '/',
    name: 'LoginInicio',
    component: Login,
  },
  {
  path: '/selector',
  name: 'SelectorCarrera',
  component: SelectorCarrera,
},

  {
    path: '/recursos',
    name: 'CarreraRecursos',
    component: CarreraRecursos,
  },
  {
    path: '/tecnologias',
    name: 'CarreraTecnologias',
    component: CarreraTecnologias,
  },
  {
    path: '/detalle-profesor/:nombre',
    name: 'DetalleProfesor',
    component: DetalleProfesor,
    props: true,
  },
   {
    path: "/detalle-profesor-recursos/:nombre",
    name: "DetalleProfesorRecursos",
    component: DetalleProfesorRecursos,
  },
  // Puedes agregar más rutas aquí
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router;
