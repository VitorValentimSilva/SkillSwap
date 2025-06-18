import { z } from "zod";

export const teachSkillSchema = z.object({
  // Etapa 1
  title: z
    .string()
    .nonempty("Título de habilidade é obrigatório")
    .min(5, "Título de habilidade deve ter pelo menos 5 caracteres")
    .max(80, "Título de habilidade muito longo"),
  category: z.string().nonempty("Categoria é obrigatória"),
  level: z.string().nonempty("Nível de experiência é obrigatório"),
  description: z
    .string()
    .nonempty("Descrição é obrigatória")
    .min(5, "Descrição deve ter pelo menos 5 caracteres"),

  // Etapa 2
  hourlyRate: z.coerce
    .number({ invalid_type_error: "Valor por hora deve ser número" })
    .min(0, "Valor mínimo é 0")
    .refine((val) => !isNaN(val), "Valor por hora é obrigatório"),
  packages: z
    .string()
    .min(5, "Descrição deve ter pelo menos 5 caracteres")
    .optional(),
  daysAvailable: z.array(z.string()).min(1, "Selecione ao menos um dia"),

  // Etapa 3
  credentials: z.string().optional(),
  videoUrl: z.string().url("URL deve ser válida").optional(),
});

export type TeachSkillFormData = z.infer<typeof teachSkillSchema>;
