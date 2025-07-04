import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { getAuth } from "firebase/auth";
import { haversine } from "../utils/distanceCalculation";
import { getCoordinatesFromCity } from "../utils/getCoordinatesFromCity";
import { SkillDisplayCardProps } from "../types/skill";
import { useSkills } from "./useSkills";

export function useNearbySkills(radiusInKm: number = 25, limit: number = 4) {
  const { skills, loading: skillsLoading } = useSkills();
  const [nearbySkills, setNearbySkills] = useState<SkillDisplayCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permissão de localização negada.");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userLat = location.coords.latitude;
        const userLon = location.coords.longitude;
        const currentUser = getAuth().currentUser;
        const currentUid = currentUser?.uid;

        const filtered: SkillDisplayCardProps[] = [];

        for (const skill of skills) {
          if (skill.uid === currentUid) continue;

          const profileRef = doc(db, "profiles", skill.uid);
          const profileSnap = await getDoc(profileRef);
          if (!profileSnap.exists()) continue;

          const profileData = profileSnap.data();
          const city = profileData.city;
          if (!city) continue;

          const country = profileData.country;
          if (!country) continue;

          const cityCoords = await getCoordinatesFromCity(city, country);
          if (!cityCoords) continue;

          const distance = haversine(
            userLat,
            userLon,
            cityCoords.lat,
            cityCoords.lon
          );

          if (distance <= radiusInKm) {
            filtered.push(skill);
          }

          if (filtered.length >= limit) break;
        }

        setNearbySkills(filtered);
      } catch (err) {
        console.error("Erro ao buscar dados próximos:", err);
        setError("Erro ao buscar habilidades próximas.");
      } finally {
        setLoading(false);
      }
    })();
  }, [skills]);

  return { nearbySkills, loading: skillsLoading || loading, error };
}
