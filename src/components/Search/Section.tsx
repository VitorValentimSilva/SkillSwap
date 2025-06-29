import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";

interface SectionProps {
  title: string;
  items: string[];
}

export default function Section({ title, items }: SectionProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="mb-6">
      <Text
        className={`
          text-lg font-semibold mb-2
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
        `}
      >
        {title}
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            className={`px-4 py-2 rounded-full
               ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
          >
            <Text
              className={`
                text-sm
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
              `}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
