import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { uploadVideoToIPFS, unpinVideoFromIPFS } from "./pinFileToIPFS";
import { Skill } from "../types/skill";

export async function updateSkill(
  id: string,
  currentSkill: Skill,
  data: Partial<Skill>
) {
  const docRef = doc(db, "teachSkills", id);

  if (data.videoUrl && data.videoUrl.startsWith("file://")) {
    try {
      const ipfsUrl = await uploadVideoToIPFS(data.videoUrl);
      data.videoUrl = ipfsUrl;

      if (currentSkill.videoUrl && currentSkill.videoUrl !== ipfsUrl) {
        await unpinVideoFromIPFS(currentSkill.videoUrl);
      }
    } catch (err) {
      console.warn("Erro ao processar vídeo:", err);
    }
  }

  await updateDoc(docRef, {
    ...data,
    updatedAt: Date.now(),
  });
}
