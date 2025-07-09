import React, { useContext } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { colors } from "../../../styles/colors";

type AppButtonProps = {
  label: string;
  onPress: () => void | Promise<void>;
  type?: "primary" | "secondary";
  styleExtra?: string;
  loading?: boolean;
};

export default function AppButton({
  label,
  onPress,
  type = "primary",
  styleExtra = "",
  loading = false,
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
      onPress={loading ? undefined : onPress}
      disabled={loading}
      className={`px-6 py-3 rounded-md ${bgClass} opacity-${loading ? "50" : "100"} ${styleExtra}`}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            isDark
              ? colors.SecondaryColorDarkTheme
              : colors.SecondaryColorLightTheme
          }
        />
      ) : (
        <Text className={`text-center font-semibold ${textClass}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
