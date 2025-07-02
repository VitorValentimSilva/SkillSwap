import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

interface FilterButtonProps {
  onPressFilter: () => void;
}

export default function FilterButton({ onPressFilter }: FilterButtonProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPressFilter}
      style={{
        backgroundColor: isDark
          ? colors.PrimaryColorDarkTheme
          : colors.PrimaryColorLightTheme,
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="funnel"
        size={24}
        color={
          isDark
            ? colors.TextPrimaryColorDarkTheme
            : colors.TextPrimaryColorLightTheme
        }
      />
    </TouchableOpacity>
  );
}
