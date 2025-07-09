import { Text, View } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

interface InfoCardProps {
  title: string;
  value: string | number;
}

export default function InfoCard({ title, value }: InfoCardProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View
      className={`p-3 rounded-xl
      ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <Text
        className={`text-xs font-medium mb-1 opacity-80
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-primaryColorLightTheme"}`}
      >
        {title}
      </Text>
      <Text
        className={`font-semibold
        ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
      >
        {value}
      </Text>
    </View>
  );
}
