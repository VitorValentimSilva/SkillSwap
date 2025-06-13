import React from "react";
import { View, Alert } from "react-native";
import FormAuth from "../components/FormAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  navigation: StackNavigationProp<any>;
};

export const LoginAccount = ({ navigation }: Props) => {
  const { signIn } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await signIn(values.email, values.password);
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Erro no login", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <FormAuth
        isSignUp={false}
        onSubmit={handleSubmit}
        onSwitchMode={() => navigation.navigate("CreateAccount")}
      />
    </View>
  );
};
