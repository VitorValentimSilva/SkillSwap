import * as FileSystem from "expo-file-system";

export async function uploadVideoToIPFS(localUri: string): Promise<string> {
  // Substitua pelos seus dados do Pinata
  const PINATA_API_KEY = "de7af9cee9a0663d0792";
  const PINATA_SECRET_API_KEY =
    "5f11341399aca85b539f5e121b7c12779f3ec31c5f70df9cbf1acabfc17a78f0";

  const fileInfo = await FileSystem.getInfoAsync(localUri);
  if (!fileInfo.exists) {
    throw new Error("Arquivo não encontrado.");
  }

  const fileName = localUri.split("/").pop() || "video.mp4";
  const fileType = "video/mp4";

  const formData = new FormData();
  // @ts-ignore
  formData.append("file", {
    uri: localUri,
    name: fileName,
    type: fileType,
  });

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
        // NÃO defina Content-Type, o fetch faz isso automaticamente
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

  // O hash CID estará em json.IpfsHash
  return `https://gateway.pinata.cloud/ipfs/${json.IpfsHash}`;
}
