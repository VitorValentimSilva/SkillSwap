import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ProfileFormData } from "../schemas/profileSchema";

export async function createProfile(
  uid: string | undefined,
  data: ProfileFormData
) {
  if (!uid) throw new Error("UID é obrigatório");
  const docRef = doc(db, "profiles", uid);
  await setDoc(docRef, {
    ...data,
    createdAt: Date.now(),
  });
  return uid;
}

export async function updateProfile(
  uid: string | undefined,
  data: ProfileFormData
) {
  if (!uid) throw new Error("UID é obrigatório");
  const ref = doc(db, "profiles", uid);
  await setDoc(ref, data, { merge: true });
}
