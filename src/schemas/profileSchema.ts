import { z } from "zod";

export const profileSchema = z.object({
  photo: z
    .string()
    .url("Selecione uma foto de perfil válida")
    .nonempty("Foto é obrigatória"),
  userName: z
    .string()
    .min(6, "Nome de usuário deve ter pelo menos 6 caracteres")
    .max(25, "Nome de usuário muito longo")
    .refine((val) => !/\s/.test(val), {
      message: "Nome de usuário não pode conter espaços",
    }),
  fullName: z
    .string()
    .min(6, "Nome deve ter pelo menos 6 caracteres")
    .max(100, "Nome muito longo"),
  phone: z.string().min(13, "Telefone inválido"),
  address: z.string().min(8, "Endereço é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  country: z.string().min(2, "País é obrigatório"),
  bio: z.string().min(12, "Conte um pouco sobre você (mínimo 12 caracteres)"),
  instagram: z.string().optional(),
  gitHub: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
