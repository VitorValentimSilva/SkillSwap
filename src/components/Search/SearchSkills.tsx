import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

export default function SearchSkills() {
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
          placeholder="Pesquisar habilidades, instrutores ou categorias"
          placeholderTextColor={
            isDark
              ? colors.TextSecondaryColorDarkTheme
              : colors.TextSecondaryColorLightTheme
          }
        />
      </View>
    </View>
  );
}
