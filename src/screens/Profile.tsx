import { SafeAreaView } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import Header from "../components/Header";

export default function Profile() {
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
