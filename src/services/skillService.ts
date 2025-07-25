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
import { unpinVideoFromIPFS, uploadVideoToIPFS } from "./pinFileToIPFS";

export async function createTeachSkill(
  uid: string | undefined,
  data: TeachSkillFormData
) {
  if (!uid) throw new Error("UID é obrigatório");
  const id = `${uid}-${Date.now()}`;
  const docRef = doc(db, "teachSkills", id);

  let ipfsUrl: string | undefined;
  if (data.videoUrl) {
    ipfsUrl = await uploadVideoToIPFS(data.videoUrl);
    data.videoUrl = ipfsUrl;
  }

  const packagesSanitized = data.packages
    ? data.packages.split(",").map((p) => p.trim())
    : [];

  const payload = {
    title: data.title,
    description: data.description,
    category: data.category,
    level: data.level,
    method: data.method,
    hourlyRate: data.hourlyRate,
    daysAvailable: data.daysAvailable,
    credentials: data.credentials,
    videoUrl: data.videoUrl,
    maxStudents: data.maxStudents,
    packages: packagesSanitized,
    createdAt: Date.now(),
    uid,
  };

  try {
    await setDoc(docRef, payload);
    return id;
  } catch (firebaseError) {
    console.error(
      "Erro ao gravar no Firestore, removendo do Pinata:",
      firebaseError
    );
    if (ipfsUrl) {
      try {
        await unpinVideoFromIPFS(ipfsUrl);
      } catch (unpinError) {
        console.error(
          "Falha ao despin no Pinata após erro no Firestore:",
          unpinError
        );
      }
    }
    throw firebaseError;
  }
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
      hourlyRate: data.hourlyRate,
      daysAvailable: data.daysAvailable,
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
