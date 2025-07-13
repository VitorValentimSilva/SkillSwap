import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { getAuth } from "firebase/auth";
import { Skill } from "../types/skill";
import { useSkills } from "./useSkills";

export function useNearbySkillsByCity(limit: number = 100) {
  const { skills, loading: skillsLoading } = useSkills();
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const currentUser = getAuth().currentUser;
        if (!currentUser) {
          setError("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        const userProfileSnap = await getDoc(
          doc(db, "profiles", currentUser.uid)
        );
        if (!userProfileSnap.exists()) {
          setError("Perfil do usuário não encontrado.");
          setLoading(false);
          return;
        }
        const userData = userProfileSnap.data();
        const userCityRaw = (userData.city as string) ?? "";
        const userCity = userCityRaw.trim().toLowerCase();

        const matches: Skill[] = [];
        for (const skill of skills) {
          if (skill.uid === currentUser.uid) continue;

          const profileSnap = await getDoc(doc(db, "profiles", skill.uid));
          if (!profileSnap.exists()) continue;
          const data = profileSnap.data();
          const profileCity = ((data.city as string) ?? "")
            .trim()
            .toLowerCase();

          if (profileCity === userCity && true) {
            matches.push(skill);
            if (matches.length >= limit) break;
          }
        }

        setFilteredSkills(matches);
      } catch (err) {
        console.error("Erro ao filtrar skills por cidade:", err);
        setError("Erro ao buscar habilidades na sua cidade.");
      } finally {
        setLoading(false);
      }
    })();
  }, [skills]);

  return {
    nearbySkills: filteredSkills,
    loading: skillsLoading || loading,
    error,
  };
}
