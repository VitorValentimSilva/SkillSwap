import React from "react";
import { View } from "react-native";
import { useFormContext } from "react-hook-form";
import Input from "./Input";
import { TeachSkillFormData } from "../../schemas/teachSkillSchema";
import AppButton from "./AppButton";
import SelectInput, { Option } from "./SelectInput";

export interface StepOneTeachSkillProps {
  onNext: () => void;
}

export default function StepOneTeachSkill({ onNext }: StepOneTeachSkillProps) {
  const { trigger } = useFormContext<TeachSkillFormData>();

  const categoryOptions: Option[] = [
    { label: "Música", value: "Música" },
    { label: "Programação", value: "Programação" },
    { label: "Arte", value: "Arte" },
    { label: "Culinária", value: "Culinária" },
    { label: "Fotografia", value: "Fotografia" },
    { label: "Idiomas", value: "Idiomas" },
  ];
  const levelOptions: Option[] = [
    { label: "Iniciante", value: "Iniciante" },
    { label: "Intermediário", value: "Intermediário" },
    { label: "Avançado", value: "Avançado" },
    { label: "Especialista", value: "Especialista" },
  ];
  const methodOptions: Option[] = [
    { label: "Individuais", value: "Individuais" },
    { label: "Aulas em Grupo", value: "Aulas em Grupo" },
    { label: "Cursos Online", value: "Cursos Online" },
  ];

  return (
    <View>
      <Input
        name="title"
        label="Título da habilidade *"
        placeholder="Ex: Aulas de violão para iniciantes"
      />

      <SelectInput
        name="category"
        label="Categoria *"
        options={categoryOptions}
      />

      <SelectInput
        name="level"
        label="Nível de experiência *"
        options={levelOptions}
      />

      <SelectInput
        name="method"
        label="Método de Ensino *"
        options={methodOptions}
      />

      <Input
        name="maxStudents"
        label="Máximo de Alunos"
        placeholder="Ex: Máximo de 8 alunos para aulas em grupo"
        multiline
        numberOfLines={4}
      />

      <Input
        name="description"
        label="Descrição do curso *"
        placeholder="Descreva o que será abordado"
        multiline
        numberOfLines={4}
      />

      <AppButton
        label="Avançar"
        onPress={async () => {
          const valid = await trigger([
            "title",
            "category",
            "level",
            "method",
            "description",
          ]);
          if (valid) onNext();
        }}
        styleExtra="mt-3"
      />
    </View>
  );
}
