import { View, Pressable, Text } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { loginSchema, signupSchema } from "../../schemas/authSchema";

type Props = {
  isSignUp: boolean;
  onSubmit: (values: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => void;
  onSwitchMode: () => void;
};

export default function FormAuth({ isSignUp, onSubmit, onSwitchMode }: Props) {
  const { isDark } = useContext(ThemeContext);
  const schema = isSignUp ? signupSchema : loginSchema;
  type FormValues = z.infer<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", confirmPassword: "" } as any,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <View
        className={`w-full px-5 py-4 rounded-2xl
          ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
      >
        <Text
          className={`text-3xl font-bold mb-6 text-center
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          {isSignUp ? "Criar Nova Conta" : "Bem-vindo de Volta"}
        </Text>

        <Input
          name="email"
          label="E-mail"
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          name="password"
          label="Senha"
          placeholder="••••••"
          secureTextEntry
          autoCapitalize="none"
        />

        {isSignUp && (
          <Input
            name="confirmPassword"
            label="Confirme a Senha"
            placeholder="••••••"
            secureTextEntry
            autoCapitalize="none"
          />
        )}

        <View className="mt-5">
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text
              className={`text-base font-semibold
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              {isSignUp ? "Criar Conta" : "Entrar"}
            </Text>
          </Pressable>

          <View
            className={`flex-row items-center justify-center my-3 border-t
            ${isDark ? "border-TextSecondaryColorDarkTheme" : "border-TextSecondaryColorLightTheme"}`}
          ></View>

          <Pressable onPress={onSwitchMode}>
            <Text
              className={`text-base font-semibold
              ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
            >
              {isSignUp ? "Já tem uma conta? Entrar" : "Criar nova conta"}
            </Text>
          </Pressable>
        </View>
      </View>
    </FormProvider>
  );
}
