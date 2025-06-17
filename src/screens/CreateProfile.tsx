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
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileFormData } from "../schemas/profileSchema";
import { useProfile } from "../contexts/ProfileContext";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const CreateProfile = ({ navigation }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const { submitProfile } = useProfile();

  const handleProfileSubmit = async (data: ProfileFormData) => {
    try {
      const id = await submitProfile(data);
      console.log("Perfil criado com ID:", id);
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    }
  };

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
          <FormProfile onSubmit={handleProfileSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
