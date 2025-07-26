import React, { useContext } from "react";
import {
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import FormAuth from "../components/Form/FormAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const CreateAccount = ({ navigation }: Props) => {
  const { signUp } = useAuth();
  const { isDark } = useContext(ThemeContext);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signUp(values.email, values.password);
      navigation.navigate("CreateProfile");
    } catch (error: any) {
      Alert.alert("Erro no cadastro", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex-1 px-5 pt-12 ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="items-center">
          <Image
            source={require("../assets/logo.png")}
            className="w-60 h-60"
            resizeMode="contain"
          />
        </View>

        <View>
          <FormAuth
            isSignUp={true}
            onSubmit={handleSubmit}
            onSwitchMode={() => navigation.navigate("LoginAccount")}
          />
        </View>

        <Text
          className={`text-center text-sm mt-4
          ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
        >
          Ao criar uma conta você concorda com nossos Termos e Política de
          Privacidade
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
