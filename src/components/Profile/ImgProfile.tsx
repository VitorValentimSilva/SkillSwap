import { View, Image, ActivityIndicator } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

export default function ImgProfile() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile(user?.uid);
  const { isDark } = useContext(ThemeContext);

  if (loading) {
    return (
      <View className="items-center justify-center mt-[-40px]">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!profile?.photo) return null;

  return (
    <View className="items-center justify-center mt-[-40px]">
      <Image
        source={{ uri: profile.photo }}
        className={`w-36 h-36 rounded-full border-4 
            ${isDark ? "border-BackgroundDarkTheme" : "border-BackgroundLightTheme"} `}
        resizeMode="cover"
      />
    </View>
  );
}
