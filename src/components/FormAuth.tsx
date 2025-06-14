import { View, Button, Pressable, Text } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

type Props = {
  isSignUp: boolean;
  onSubmit: (values: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => void;
  onSwitchMode: () => void;
};

const baseSchema = {
  email: z.string().email({ message: "E‑mail inválido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres" }),
};

const loginSchema = z.object(baseSchema);

const signupSchema = z
  .object({
    ...baseSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Senhas devem ser iguais",
  });

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
        className={`p-5 space-y-4 rounded-2xl w-full
        ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
      >
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

        <View className="mt-4 gap-6">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className={`p-3 rounded-md 
              ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
          >
            <Text
              className={`text-center font-semibold
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              {isSignUp ? "Criar Conta" : "Entrar"}
            </Text>
          </Pressable>

          <Pressable
            onPress={onSwitchMode}
            className={`p-3 rounded-md
              ${isDark ? "bg-TextSecondaryColorLightTheme" : "bg-TextSecondaryColorDarkTheme"}`}
          >
            <Text
              className={`text-center font-semibold
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              {isSignUp ? "Já tem conta? Faça login" : "Criar nova conta"}
            </Text>
          </Pressable>
        </View>
      </View>
    </FormProvider>
  );
}
