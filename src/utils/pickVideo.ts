import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export interface PickedVideo {
  uri: string;
  name: string;
}

export async function pickVideo(
  maxDurationSec: number = 180
): Promise<PickedVideo | null> {
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["videos"],
    allowsMultipleSelection: false,
  });
  if (res.canceled) return null;

  const asset = res.assets && res.assets[0];
  if (!asset) return null;

  const durationMs = asset.duration ?? 0;
  const durationSec = durationMs / 1000;

  if (durationSec > maxDurationSec) {
    Alert.alert(
      "Vídeo muito longo",
      `O vídeo deve ter no máximo ${maxDurationSec / 60} minutos.`
    );
    return null;
  }

  const uri = asset.uri;
  const name = uri.split("/").pop() || "video.mp4";
  return { uri, name };
}
