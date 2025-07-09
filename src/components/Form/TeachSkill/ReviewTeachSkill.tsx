import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFormContext } from "react-hook-form";
import { TeachSkillFormData } from "../../../schemas/teachSkillSchema";
import { ThemeContext } from "../../../contexts/ThemeContext";
import AppButton from "./AppButton";

export interface ReviewTeachSkillProps {
  onSubmit: () => void;
  onBack: (step: number) => void;
  isSubmitting: boolean;
}

export default function ReviewTeachSkill({
  onSubmit,
  onBack,
  isSubmitting,
}: ReviewTeachSkillProps) {
  const { getValues } = useFormContext<TeachSkillFormData>();
  const vals = getValues();
  const { isDark } = useContext(ThemeContext);

  const step1 = [
    "title",
    "category",
    "level",
    "method",
    "maxStudents",
    "description",
  ];
  const step2 = ["hourlyRate", "packages", "daysAvailable"];
  const step3 = ["credentials", "videoUrl"];

  const labelize = (key: string) => {
    switch (key) {
      case "title":
        return "Título";
      case "category":
        return "Categoria";
      case "level":
        return "Nível";
      case "method":
        return "Método de Ensino";
      case "maxStudents":
        return "Máximo de Alunos";
      case "description":
        return "Descrição";
      case "hourlyRate":
        return "Valor por Hora";
      case "packages":
        return "Pacotes";
      case "daysAvailable":
        return "Disponibilidade";
      case "credentials":
        return "Credenciais";
      case "videoUrl":
        return "Vídeo";
      default:
        return key;
    }
  };

  const renderBlock = (keys: string[], title: string) => (
    <View
      className={`p-4 rounded-lg mb-4
      ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}
    `}
    >
      <Text
        className={`
        text-lg font-semibold mb-3
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
      `}
      >
        {title}
      </Text>

      {keys.map((key) => {
        const raw = vals[key as keyof TeachSkillFormData];
        let display: string;

        if (key === "videoUrl" && typeof raw === "string" && raw) {
          const parts = raw.split("/");
          display = parts[parts.length - 1];
        } else if (Array.isArray(raw)) {
          display = raw.join(", ");
        } else {
          display = String(raw ?? "Não informado");
        }

        return (
          <View key={key} className="mb-2 flex-row">
            <Text
              className={`
              flex-1 font-medium
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
            `}
            >
              {labelize(key)}:
            </Text>
            <Text
              className={`
              flex-1 text-right
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
            `}
            >
              {display}
            </Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <ScrollView>
      {renderBlock(step1, "Detalhes da Habilidade")}
      {renderBlock(step2, "Preços")}
      {renderBlock(step3, "Credenciais")}

      <View className="flex-row justify-between mt-4">
        <AppButton label="Voltar" onPress={() => onBack(2)} type="secondary" />
        <AppButton label="Enviar" onPress={onSubmit} loading={isSubmitting} />
      </View>
    </ScrollView>
  );
}
