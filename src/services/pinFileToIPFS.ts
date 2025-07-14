import * as FileSystem from "expo-file-system";
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from "@env";

export async function uploadVideoToIPFS(localUri: string): Promise<string> {
  const fileInfo = await FileSystem.getInfoAsync(localUri);
  if (!fileInfo.exists) {
    throw new Error("Arquivo não encontrado.");
  }

  const fileName = localUri.split("/").pop() || "video.mp4";
  const fileType = "video/mp4";

  const formData = new FormData();
  formData.append("file", {
    uri: localUri,
    name: fileName,
    type: fileType,
  } as any);

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
      body: formData,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      `Erro ao enviar para o Pinata: ${json.error?.message || JSON.stringify(json)}`
    );
  }

  return `https://gateway.pinata.cloud/ipfs/${json.IpfsHash}`;
}

export async function unpinVideoFromIPFS(videoUrl: string): Promise<void> {
  const match = videoUrl.match(/\/ipfs\/(.+)$/);
  if (!match) return;
  const hash = match[1];

  const response = await fetch(
    `https://api.pinata.cloud/pinning/unpin/${hash}`,
    {
      method: "DELETE",
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY || "",
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY || "",
      },
    }
  );
  if (!response.ok) {
    console.error("Falha ao despin de vídeo:", await response.text());
  }
}
