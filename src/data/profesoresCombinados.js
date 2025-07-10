import { profesoresRecursos } from "./materiasRecursos";
import { profesores } from "./materiasTecnologias"; // asegúrate de tener este archivo

export const profesoresCombinados = [
  ...profesoresRecursos,
  ...profesores,
];
