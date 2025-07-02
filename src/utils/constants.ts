import { FilterKeys, FiltersState } from "../types/filters";

export const FILTER_OPTIONS: Record<FilterKeys, string[]> = {
  categoria: [
    "Música",
    "Programação",
    "Arte",
    "Culinária",
    "Fotografia",
    "Idiomas",
  ],
  dificuldade: ["Iniciante", "Intermediário", "Avançado", "Especialista"],
  formatar: ["Individuais", "Aulas em Grupo", "Cursos Online"],
};

export const EMPTY_FILTERS: FiltersState = {
  categoria: [],
  dificuldade: [],
  formatar: [],
};
