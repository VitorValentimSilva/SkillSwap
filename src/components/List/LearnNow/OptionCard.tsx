import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";

interface OptionCardProps {
  title: string;
  description: string;
  price: string;
  selected: boolean;
  onPress: () => void;
}

export default function OptionCard({
  title,
  description,
  price,
  selected,
  onPress,
}: OptionCardProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        border rounded-lg px-4 py-2 mb-4
        ${selected ? (isDark ? "border-PrimaryColorDarkTheme" : "border-PrimaryColorLightTheme") : isDark ? "border-TextSecondaryColorDarkTheme" : "border-TextSecondaryColorLightTheme"}
      `}
      activeOpacity={0.8}
    >
      <Text
        className={`text-lg font-semibold ${selected ? (isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme") : isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
      >
        {title}
      </Text>
      <Text
        className={`text-sm mt-1
        ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
      >
        {description}
      </Text>
      <Text
        className={`text-xl font-bold mt-2 ${selected ? (isDark ? "text-PrimaryColorLightTheme" : "text-PrimaryColorDarkTheme") : isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
      >
        {price}
      </Text>
    </TouchableOpacity>
  );
}
