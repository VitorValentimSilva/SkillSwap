import { z } from "zod";

export const profileSchema = z.object({
  photo: z
    .string()
    .url("Selecione uma foto de perfil válida")
    .nonempty("Foto é obrigatória"),
  fullName: z
    .string()
    .min(6, "Nome deve ter pelo menos 6 caracteres")
    .max(100, "Nome muito longo"),
  phone: z.string().min(13, "Telefone inválido"),
  address: z.string().min(8, "Endereço é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  country: z.string().min(2, "País é obrigatório"),
  bio: z.string().min(12, "Conte um pouco sobre você (mínimo 12 caracteres)"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
