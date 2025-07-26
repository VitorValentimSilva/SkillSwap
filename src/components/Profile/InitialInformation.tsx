import { View, Text, ActivityIndicator } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

export default function InitialInformation() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile(user?.uid);
  const { isDark } = useContext(ThemeContext);

  if (loading) {
    return (
      <View className="items-center justify-center my-4">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!profile) return null;

  return (
    <View className="items-center px-10 py-2">
      <Text
        className={`text-xl font-bold text-center
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        {profile.fullName}
      </Text>

      <Text
        className={`text-base font-semibold text-center ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
      >
        @{profile.userName}
      </Text>

      <View className="flex-row items-center mt-2">
        <Ionicons
          name="location-outline"
          size={16}
          color={
            isDark
              ? colors.TextSecondaryColorDarkTheme
              : colors.TextSecondaryColorLightTheme
          }
        />
        <Text
          className={`ml-1
            ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
        >
          {profile.city}, {profile.country}
        </Text>
      </View>

      <Text
        className={`text-justify mt-4 leading-relaxed
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        {profile.bio}
      </Text>
    </View>
  );
}
