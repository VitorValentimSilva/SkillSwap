import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { TeachSkillFormData } from "../schemas/teachSkillSchema";

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
