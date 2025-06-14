import { SafeAreaView, Text } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export default function Profile() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      className={`flex-1 ${
        isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"
      }`}
    ></SafeAreaView>
  );
}
