import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";

interface SectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggleItem: (item: string) => void;
}

export default function Section({
  title,
  items,
  selectedItems,
  onToggleItem,
}: SectionProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="mb-6">
      <Text
        className={`
          text-lg font-semibold mb-2
          ${
            isDark
              ? "text-TextPrimaryColorDarkTheme"
              : "text-TextPrimaryColorLightTheme"
          }
        `}
      >
        {title}
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item);
          return (
            <TouchableOpacity
              key={item}
              className={`px-4 py-2 rounded-full
                ${
                  isSelected
                    ? isDark
                      ? "bg-PrimaryColorDarkTheme"
                      : "bg-PrimaryColorLightTheme"
                    : isDark
                      ? "bg-SurfaceColorDarkTheme"
                      : "bg-SurfaceColorLightTheme"
                }
              `}
              onPress={() => onToggleItem(item)}
            >
              <Text
                className={`
                  text-sm
                  ${
                    isSelected
                      ? isDark
                        ? "text-TextPrimaryColorLightTheme"
                        : "text-TextPrimaryColorDarkTheme"
                      : isDark
                        ? "text-TextPrimaryColorDarkTheme"
                        : "text-TextPrimaryColorLightTheme"
                  }
                `}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
