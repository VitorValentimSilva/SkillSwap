import React, { useContext } from "react";
import {
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
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
            isSignUp={false}
            onSubmit={handleSubmit}
            onSwitchMode={() => navigation.navigate("CreateAccount")}
          />
        </View>

        <Pressable>
          <Text
            className={`text-center text-base mt-5
            ${isDark ? "text-SecondaryColorDarkTheme" : "text-SecondaryColorLightTheme"}`}
          >
            Esqueceu sua senha?
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
