import React, { useContext } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import TopButton from "./TopButton";
import { ProfileFormData } from "../../schemas/profileSchema";
import { ThemeContext } from "../../contexts/ThemeContext";

interface TopScreenProps {
  profile: ProfileFormData | null;
  loading: boolean;
}

export default function TopScreen({ profile, loading }: TopScreenProps) {
  const { isDark } = useContext(ThemeContext);

  if (loading) {
    return (
      <View className="items-center justify-center mt-[-40px]">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!profile) return null;

  if (!profile.backgroundImage) {
    return (
      <View
        className={`w-full h-52 items-center justify-center
        ${isDark ? "bg-TextPrimaryColorDarkTheme" : "bg-TextPrimaryColorLightTheme"}`}
      >
        <Text
          className={`mb-20 text-lg font-semibold
          ${isDark ? "text-BackgroundDarkTheme" : "text-BackgroundLightTheme"}`}
        >
          Sem imagem de fundo
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: profile?.backgroundImage }}
      style={{ width: "100%", height: 200 }}
      resizeMode="cover"
    >
      <TopButton />
    </ImageBackground>
  );
}
