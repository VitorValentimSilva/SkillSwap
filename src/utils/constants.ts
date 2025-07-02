import { FilterKeys, FiltersState } from "../types/filters";
import { Option } from "../components/Form/SelectInput";
import { Ionicons } from "@expo/vector-icons";

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

export const CATEGORY_STYLES: Record<
  string,
  {
    iconName: React.ComponentProps<typeof Ionicons>["name"];
    iconBgColor: string;
    iconColor: string;
  }
> = {
  Música: {
    iconName: "musical-notes-outline",
    iconBgColor: "#e53e3e5a",
    iconColor: "#E53E3E",
  },
  Programação: {
    iconName: "code-slash-outline",
    iconBgColor: "#38b2ac55",
    iconColor: "#38B2AC",
  },
  Arte: {
    iconName: "color-palette-outline",
    iconBgColor: "#4299e14e",
    iconColor: "#4299E1",
  },
  Culinária: {
    iconName: "restaurant-outline",
    iconBgColor: "#68d39142",
    iconColor: "#68D391",
  },
  Fotografia: {
    iconName: "camera-outline",
    iconBgColor: "#d69e2e49",
    iconColor: "#D69E2E",
  },
  Idiomas: {
    iconName: "language-outline",
    iconBgColor: "#9f7aea55",
    iconColor: "#9F7AEA",
  },
};
