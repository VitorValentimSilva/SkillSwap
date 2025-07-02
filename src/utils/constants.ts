import { FilterKeys, FiltersState } from "../types/filters";
import { Option } from "../components/Form/SelectInput";

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

function mapToOptions(values: string[]): Option[] {
  return values.map((v) => ({ label: v, value: v }));
}

export const FILTER_OPTIONS_AS_SELECT: Record<FilterKeys, Option[]> = {
  categoria: mapToOptions(FILTER_OPTIONS.categoria),
  dificuldade: mapToOptions(FILTER_OPTIONS.dificuldade),
  formatar: mapToOptions(FILTER_OPTIONS.formatar),
};
