import { useCallback, useEffect, useState } from "react";
import { deleteSkill, fetchAllSkills } from "../services/skillService";
import { Skill } from "../types/skill";
import { unpinVideoFromIPFS } from "../services/pinFileToIPFS";

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSkills = useCallback(async () => {
    setLoading(true);
    try {
      const docs = await fetchAllSkills();
      setSkills(docs);
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível carregar as habilidades.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const removeSkill = useCallback(
    async (skill: Skill) => {
      try {
        if (skill.videoUrl) {
          await unpinVideoFromIPFS(skill.videoUrl);
        }
        await deleteSkill(skill.id);
        await loadSkills();
      } catch (err) {
        console.error("Erro ao excluir habilidade:", err);
        throw err;
      }
    },
    [loadSkills]
  );

  return { skills, loading, error, removeSkill };
}
