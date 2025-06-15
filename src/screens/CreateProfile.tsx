import { SafeAreaView } from "react-native";
import FormProfile from "../components/Form/FormProfile";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function CreateProfile() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      className={`flex-1 px-5 pt-10
      ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <FormProfile />
    </SafeAreaView>
  );
}
