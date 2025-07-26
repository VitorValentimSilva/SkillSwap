import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export function useUserProfile(uid: string | null | undefined) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    async function fetchProfile() {
      try {
        if (typeof uid !== "string") {
          setProfile(null);
          setLoading(false);
          return;
        }
        const ref = doc(db, "profiles", uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [uid]);

  return { profile, loading };
}

export async function isUserNameTaken(userName: string): Promise<boolean> {
  const q = query(
    collection(db, "profiles"),
    where("userName", "==", userName)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
