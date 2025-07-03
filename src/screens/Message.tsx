import { SafeAreaView } from "react-native";
import Header from "../components/Header";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Message() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      className={`flex-1 ${
        isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"
      }`}
    >
      <Header />
    </SafeAreaView>
  );
}
