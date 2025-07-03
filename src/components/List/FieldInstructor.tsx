import { useContext } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useUserProfile } from "../../hooks/useUserProfile";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

type FieldInstructorProps = {
  uid: string;
  title: string;
};

export default function FieldInstructor({ uid, title }: FieldInstructorProps) {
  const { profile, loading } = useUserProfile(uid);
  const { isDark } = useContext(ThemeContext);

  if (loading) {
    return (
      <View className="items-center my-4">
        <ActivityIndicator
          size="small"
          color={
            isDark
              ? colors.PrimaryColorDarkTheme
              : colors.PrimaryColorLightTheme
          }
        />
      </View>
    );
  }

  if (!profile) return null;

  return (
    <View
      className={`flex-row items-center gap-3 my-4 rounded-lg p-3
        ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <Image
        source={{ uri: profile.photo }}
        className="w-14 h-14 rounded-full"
      />
      <View className="flex-1">
        <Text
          className={`text-xl font-semibold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          {profile.fullName}
        </Text>
        <Text
          className={`text-sm text-justify
            ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}
