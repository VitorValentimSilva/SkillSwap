import React, { useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";

type HomeButtonComponentProps = {
  mode: "learn" | "teach";
  onPress?: (event: GestureResponderEvent) => void;
};

export default function HomeButtonComponent({
  mode,
  onPress,
}: HomeButtonComponentProps) {
  const { isDark } = useContext(ThemeContext);

  const config = {
    learn: {
      label: "Aprenda uma Habilidade",
      iconName: "book-outline" as const,
      bgLight: colors.PrimaryColorLightTheme,
      bgDark: colors.PrimaryColorDarkTheme,
    },
    teach: {
      label: "Ensine uma Habilidade",
      iconName: "school-outline" as const,
      bgLight: colors.SecondaryColorLightTheme,
      bgDark: colors.SecondaryColorDarkTheme,
    },
  }[mode];

  const backgroundColor = isDark ? config.bgDark : config.bgLight;
  const iconColor = isDark
    ? colors.TextPrimaryColorDarkTheme
    : colors.TextSecondaryColorLightTheme;
  const textColorClass = isDark
    ? "text-TextPrimaryColorDarkTheme"
    : "text-TextSecondaryColorLightTheme";

  const containerStyle: ViewStyle = { backgroundColor };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={containerStyle}
        className="flex-row items-center px-4 py-3 rounded-lg shadow-md w-48 gap-2"
      >
        <Ionicons name={config.iconName} size={20} color={iconColor} />
        <Text className={`ml-2 font-semibold ${textColorClass}`}>
          {config.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
