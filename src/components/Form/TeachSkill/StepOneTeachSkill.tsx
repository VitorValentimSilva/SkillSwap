import React from "react";
import { View } from "react-native";
import { useFormContext } from "react-hook-form";
import { TeachSkillFormData } from "../../../schemas/teachSkillSchema";
import Input from "../Input";
import SelectInput from "../SelectInput";
import { FILTER_OPTIONS_AS_SELECT } from "../../../utils/constants";
import AppButton from "./AppButton";

export interface StepOneTeachSkillProps {
  onNext: () => void;
}

export default function StepOneTeachSkill({ onNext }: StepOneTeachSkillProps) {
  const { trigger } = useFormContext<TeachSkillFormData>();

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
        options={FILTER_OPTIONS_AS_SELECT.categoria}
      />

      <SelectInput
        name="level"
        label="Nível de experiência *"
        options={FILTER_OPTIONS_AS_SELECT.dificuldade}
      />

      <SelectInput
        name="method"
        label="Método de Ensino *"
        options={FILTER_OPTIONS_AS_SELECT.formato}
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
