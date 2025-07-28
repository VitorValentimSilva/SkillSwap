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
  method: z.string().nonempty("Método de ensino é obrigatório"),
  maxStudents: z.coerce.string().optional(),
  description: z
    .string()
    .nonempty("Descrição é obrigatória")
    .min(5, "Descrição deve ter pelo menos 5 caracteres"),

  // Etapa 2
  hourlyRate: z.coerce
    .number({ invalid_type_error: "Valor por hora deve ser número" })
    .min(0, "Valor mínimo é 0")
    .refine((val) => !isNaN(val), "Valor por hora é obrigatório"),
  packages: z.string().optional(),
  daysAvailable: z.array(z.string()).min(1, "Selecione ao menos um dia"),
  timesAvailable: z
    .array(
      z.object({
        day: z.string(),
        times: z.array(z.string()).min(1, "Adicione ao menos um horário"),
      })
    )
    .refine((arr) => {
      const days = arr.map((e) => e.day);
      return (
        arr.length > 0 && new Set(days).size === arr.length
      );
    }, "Horários devem ser configurados para cada dia selecionado"),

  // Etapa 3
  credentials: z.string().optional(),
  videoUrl: z.string().optional(),
});

export type TeachSkillFormData = z.infer<typeof teachSkillSchema>;
