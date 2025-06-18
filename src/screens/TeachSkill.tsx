import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import Header from "../components/Header";
import FormTeachSkill from "../components/Form/FormTeachSkill";
import { colors } from "../styles/colors";

export default function TeachSkill() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark
          ? colors.BackgroundDarkTheme
          : colors.BackgroundLightTheme,
      }}
    >
      <Header />

      <View className="px-5 py-1 gap-1">
        <Text
          className={`text-3xl font-bold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Ensine uma Habilidade
        </Text>

        <Text
          className={`text-lg
            ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
        >
          Compartilhe sua experiência e ganhe dinheiro
        </Text>
      </View>

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
          style={{ flex: 1 }}
        >
          <FormTeachSkill />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
