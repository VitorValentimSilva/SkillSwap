import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import FormProfile from "../components/Form/FormProfile";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { colors } from "../styles/colors";

export default function CreateProfile() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        backgroundColor: isDark
          ? colors.BackgroundDarkTheme
          : colors.BackgroundLightTheme,
      }}
    >
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? 0 : (StatusBar.currentHeight ?? 0)
        }
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <FormProfile />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
