import React, { useContext } from "react";
import { Pressable, Text } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";

type AppButtonProps = {
  label: string;
  onPress: () => void | Promise<void>;
  type?: "primary" | "secondary";
  styleExtra?: string;
};

export default function AppButton({
  label,
  onPress,
  type = "primary",
  styleExtra = "",
}: AppButtonProps) {
  const { isDark } = useContext(ThemeContext);

  const bgClass =
    type === "primary"
      ? isDark
        ? "bg-PrimaryColorLightTheme"
        : "bg-PrimaryColorDarkTheme"
      : isDark
        ? "bg-TextSecondaryColorLightTheme"
        : "bg-TextSecondaryColorDarkTheme";

  const textClass =
    type === "primary"
      ? isDark
        ? "text-TextPrimaryColorDarkTheme"
        : "text-TextPrimaryColorLightTheme"
      : isDark
        ? "text-TextPrimaryColorDarkTheme"
        : "text-TextPrimaryColorLightTheme";

  return (
    <Pressable
      onPress={onPress}
      className={`px-6 py-3 rounded-md ${bgClass} ${styleExtra}`}
    >
      <Text className={`text-center font-semibold ${textClass}`}>{label}</Text>
    </Pressable>
  );
}
