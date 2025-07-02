import { useEffect, useState } from "react";
import { fetchAllSkills } from "../services/teachSkillService";
import { SkillDisplayCardProps } from "../components/List/SkillDisplayCard";

export function useSkills() {
  const [skills, setSkills] = useState<SkillDisplayCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const items = await fetchAllSkills();
        setSkills(items);
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
