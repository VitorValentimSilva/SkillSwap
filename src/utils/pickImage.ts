import * as ImagePicker from "expo-image-picker";

export async function pickImage(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (result.canceled) return null;

  return result.assets?.[0]?.uri ?? null;
}

export async function pickBackgroundImage(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled) return null;

  return result.assets?.[0]?.uri ?? null;
}
