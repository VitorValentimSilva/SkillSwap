import { View, Button } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";

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
      <View className="p-5 space-y-4 bg-white rounded-2xl w-full">
        <Input
          name="email"
          label="E‑mail"
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
          <Button
            title={isSignUp ? "Criar Conta" : "Entrar"}
            onPress={handleSubmit(onSubmit)}
          />

          <Button
            title={isSignUp ? "Já tem conta? Faça login" : "Criar nova conta"}
            onPress={onSwitchMode}
            color="gray"
          />
        </View>
      </View>
    </FormProvider>
  );
}
