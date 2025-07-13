import { useEffect, useState } from "react";
import { fetchAllSkills } from "../services/teachSkillService";
import { Skill } from "../types/skill";

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const docs = await fetchAllSkills();
        const withId = docs.map((d) => {
          const { id, ...rest } = d;
          return {
            id: `${d.uid}-${d.title}`,
            ...rest,
          };
        });
        setSkills(withId);
      } catch (err: any) {
        console.error(err);
        setError("Não foi possível carregar as habilidades.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { skills, loading, error };
}
