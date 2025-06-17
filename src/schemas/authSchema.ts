import { z } from "zod";

const baseSchema = {
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres" }),
};

export const loginSchema = z.object(baseSchema);

export const signupSchema = z
  .object({
    ...baseSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Senhas devem ser iguais",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
