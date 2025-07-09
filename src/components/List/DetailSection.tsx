import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ComponentProps, useContext } from "react";
import { colors } from "../../styles/colors";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

interface DetailSectionProps {
  title: string;
  content: string;
  icon: IoniconsName;
}

export default function DetailSection({
  title,
  content,
  icon,
}: DetailSectionProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <View
          className={`w-1 h-5 rounded-full mr-2
          ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
        />
        <Ionicons
          name={icon}
          size={20}
          color={isDark ? colors.AccentColor : colors.ErrorColor}
        />
        <Text
          className={`text-lg font-semibold ml-2
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          {title}
        </Text>
      </View>
      <View
        className={`p-4 rounded-xl
        ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
      >
        <Text
          className={`
          ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
        >
          {content}
        </Text>
      </View>
    </View>
  );
}
