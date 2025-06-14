import { Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";

export default function Header() {
  const { isDark, toggle } = useContext(ThemeContext);

  return (
    <View
      className={`pt-10 flex-row justify-between items-center px-5 py-3 
    ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <Text
        className={`text-2xl font-bold 
        ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
      >
        SkillSwap
      </Text>

      <Pressable
        onPress={toggle}
        className={`p-2 rounded-full 
        ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
      >
        <Ionicons
          name={isDark ? "moon" : "sunny"}
          size={24}
          color={
            isDark
              ? colors.PrimaryColorDarkTheme
              : colors.PrimaryColorLightTheme
          }
        />
      </Pressable>
    </View>
  );
}
