import { z } from "zod";

export const profileSchema = z.object({
  photo: z
    .string()
    .url("Selecione uma foto de perfil válida")
    .nonempty("Foto é obrigatória"),
  fullName: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  phone: z.string().min(13, "Telefone inválido"),
  city: z.string().min(2, "Cidade é obrigatória"),
  country: z.string().min(2, "País é obrigatório"),
  bio: z.string().min(10, "Conte um pouco sobre você (mínimo 10 caracteres)"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
