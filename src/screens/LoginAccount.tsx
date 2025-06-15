import React, { useContext } from "react";
import { View, Alert } from "react-native";
import FormAuth from "../components/Form/FormAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useProfile } from "../contexts/ProfileContext";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const LoginAccount = ({ navigation }: Props) => {
  const { signIn } = useAuth();
  const { isDark } = useContext(ThemeContext);
  const { checkProfile } = useProfile();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const user = await signIn(values.email, values.password);
      const hasProfile = await checkProfile(user.uid);
      console.log("Perfil encontrado:", hasProfile);
      console.log("Usuário logado:", user.uid);
      if (hasProfile) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("CreateProfile");
      }
    } catch (error: any) {
      Alert.alert("Erro no login", error.message);
    }
  };

  return (
    <View
      className={`flex-1 justify-center items-center p-4
      ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <FormAuth
        isSignUp={false}
        onSubmit={handleSubmit}
        onSwitchMode={() => navigation.navigate("CreateAccount")}
      />
    </View>
  );
};
