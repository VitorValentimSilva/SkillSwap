import { useMemo } from "react";
import { filterSkillsByText } from "../utils/filterSkills";
import { FiltersState } from "../types/filters";
import { Skill } from "../types/skill";

export function useFilteredSkills(
  allSkills: Skill[],
  filters: FiltersState,
  searchQuery: string
): Skill[] {
  return useMemo(() => {
    const byProps = allSkills.filter((skill) => {
      const catOk =
        filters.categoria.length === 0 ||
        filters.categoria.includes(skill.category);
      const lvlOk =
        filters.dificuldade.length === 0 ||
        filters.dificuldade.includes(skill.level);
      const fmtOk =
        filters.formato.length === 0 || filters.formato.includes(skill.method);
      return catOk && lvlOk && fmtOk;
    });

    return filterSkillsByText(byProps, searchQuery);
  }, [allSkills, filters, searchQuery]);
}
