import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { TeachSkillFormData } from "../schemas/teachSkillSchema";
import { SkillDisplayCardProps } from "../components/List/SkillDisplayCard";

export async function createTeachSkill(
  uid: string | undefined,
  data: TeachSkillFormData
) {
  if (!uid) throw new Error("UID é obrigatório");
  const id = `${uid}-${Date.now()}`;
  const docRef = doc(db, "teachSkills", id);

  await setDoc(docRef, {
    ...data,
    createdAt: Date.now(),
    uid,
  });

  return id;
}

export async function fetchAllSkills(): Promise<SkillDisplayCardProps[]> {
  const q = query(collection(db, "teachSkills"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      title: data.title,
      category: data.category,
      level: data.level,
      method: data.method,
      description: data.description,
      pricePerHour: data.hourlyRate,
      availableDays: data.daysAvailable,
      uid: data.uid,
    };
  });
}
