import { useCallback } from "react";
import { useSkills } from "./useSkills";
import { updateSkill } from "../services/updateSkillService";
import { Skill } from "../types/skill";

export function useEditSkill() {
  const { loadSkills, skills } = useSkills();

  const editSkill = useCallback(
    async (id: string, partial: Partial<Omit<Skill, "id" | "uid">>) => {
      const current = skills.find((s) => s.id === id);
      if (!current) throw new Error("Skill não encontrada");

      await updateSkill(id, current, partial);
      await loadSkills();
    },
    [loadSkills, skills]
  );

  return { editSkill };
}
