import React, { useContext } from "react";
import { View, Alert } from "react-native";
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
    <View
      className={`flex-1 justify-center items-center p-4
      ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <FormAuth
        isSignUp={true}
        onSubmit={handleSubmit}
        onSwitchMode={() => navigation.navigate("LoginAccount")}
      />
    </View>
  );
};
