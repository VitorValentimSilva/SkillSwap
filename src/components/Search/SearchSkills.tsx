import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

interface SearchSkillsProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchSkills({
  value,
  onChangeText,
}: SearchSkillsProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="px-4 py-3 w-[85%]">
      <View
        className={`relative flex-row items-center rounded-lg
        ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
      >
        <Ionicons
          name="search"
          size={20}
          color={
            isDark
              ? colors.TextSecondaryColorDarkTheme
              : colors.TextSecondaryColorLightTheme
          }
          className="ml-3"
        />

        <TextInput
          className={`flex-1 px-3 py-3 ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
          placeholder="Pesquisar pelas habilidades"
          placeholderTextColor={
            isDark
              ? colors.TextSecondaryColorDarkTheme
              : colors.TextSecondaryColorLightTheme
          }
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
