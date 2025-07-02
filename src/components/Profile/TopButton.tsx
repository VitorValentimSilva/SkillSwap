import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

export default function TopButton() {
  const { isDark } = useContext(ThemeContext);

  const bgColor = isDark
    ? colors.SurfaceColorDarkTheme
    : colors.SurfaceColorLightTheme;
  const iconColor = isDark
    ? colors.TextPrimaryColorDarkTheme
    : colors.TextPrimaryColorLightTheme;

  return (
    <View className="flex-row justify-end gap-4 mt-4 mr-5">
      <TouchableOpacity
        className="p-2 rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        <Ionicons name="share-social-outline" size={24} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity
        className="p-2 rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        <Ionicons name="settings-outline" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}
