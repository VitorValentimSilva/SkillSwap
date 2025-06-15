import { z } from "zod";

const phoneRegex = /^\+55\s\(\d{2}\)\s\d{4,5}-\d{4}$/;

export const profileSchema = z.object({
  photo: z
    .string()
    .url("Selecione uma foto de perfil válida")
    .nonempty("Foto é obrigatória"),
  fullName: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  phone: z
    .string()
    .regex(phoneRegex, "Telefone deve seguir +55 (XX) XXXXX-XXXX"),
  city: z.string().min(2, "Cidade é obrigatória"),
  country: z.string().min(2, "País é obrigatório"),
  bio: z.string().min(10, "Conte um pouco sobre você (mínimo 10 caracteres)"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
