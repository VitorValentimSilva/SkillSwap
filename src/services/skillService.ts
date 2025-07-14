import { db } from "./firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { TeachSkillFormData } from "../schemas/teachSkillSchema";
import { Skill } from "../types/skill";
import { uploadVideoToIPFS } from "./pinFileToIPFS";

export async function createTeachSkill(
  uid: string | undefined,
  data: TeachSkillFormData
) {
  if (!uid) throw new Error("UID é obrigatório");
  const id = `${uid}-${Date.now()}`;
  const docRef = doc(db, "teachSkills", id);

  if (data.videoUrl) {
    data.videoUrl = await uploadVideoToIPFS(data.videoUrl);
  }

  await setDoc(docRef, {
    ...data,
    createdAt: Date.now(),
    uid,
  });

  return id;
}

export async function fetchAllSkills(): Promise<Skill[]> {
  const q = query(collection(db, "teachSkills"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      category: data.category,
      level: data.level,
      method: data.method,
      description: data.description,
      pricePerHour: data.hourlyRate,
      availableDays: data.daysAvailable,
      uid: data.uid,
      credentials: data.credentials ?? "",
      maxStudents: data.maxStudents ?? 0,
      packages: data.packages ?? [],
      videoUrl: data.videoUrl ?? "",
    };
  });
}

export async function deleteSkill(id: string): Promise<void> {
  const docRef = doc(db, "teachSkills", id);
  await deleteDoc(docRef);
}
