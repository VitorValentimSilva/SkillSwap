import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { useFormContext } from "react-hook-form";
import Input from "./Input";
import { TeachSkillFormData } from "../../schemas/teachSkillSchema";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

export interface StepOneTeachSkillProps {
  onNext: () => void;
}

export default function StepOneTeachSkill({ onNext }: StepOneTeachSkillProps) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<TeachSkillFormData>();
  const { isDark } = useContext(ThemeContext);

  const selectedCategory = watch("category");
  const selectedLevel = watch("level");

  return (
    <View>
      <Input
        name="title"
        label="Título da habilidade *"
        placeholder="Ex: Aulas de violão para iniciantes"
      />

      <Text
        className={`text-base font-semibold mb-1 
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        Categoria *
      </Text>
      <View
        className={`border rounded-md h-10 justify-center mb-2
        ${isDark ? "border-TextPrimaryColorDarkTheme" : "border-TextPrimaryColorLightTheme"}`}
      >
        <Picker<string>
          selectedValue={selectedCategory}
          onValueChange={(value) => {
            setValue("category", value);
            trigger("category");
          }}
          style={{
            color: isDark
              ? colors.TextPrimaryColorDarkTheme
              : colors.TextPrimaryColorLightTheme,
          }}
          dropdownIconColor={
            isDark
              ? colors.TextPrimaryColorDarkTheme
              : colors.TextPrimaryColorLightTheme
          }
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Música" value="music" />
          <Picker.Item label="Arte" value="art" />
          <Picker.Item label="Esportes" value="sports" />
        </Picker>
      </View>

      {errors.category && (
        <Text className="text-ErrorColor mb-4">{errors.category.message}</Text>
      )}

      <Text
        className={`text-base font-semibold mb-1 
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        Nível de experiência *
      </Text>
      <View
        className={`border rounded-md h-10 justify-center mb-2
        ${isDark ? "border-TextPrimaryColorDarkTheme" : "border-TextPrimaryColorLightTheme"}`}
      >
        <Picker<string>
          selectedValue={selectedLevel}
          onValueChange={(value) => {
            setValue("level", value);
            trigger("level");
          }}
          style={{
            color: isDark
              ? colors.TextPrimaryColorDarkTheme
              : colors.TextPrimaryColorLightTheme,
          }}
          dropdownIconColor={
            isDark
              ? colors.TextPrimaryColorDarkTheme
              : colors.TextPrimaryColorLightTheme
          }
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Iniciante" value="beginner" />
          <Picker.Item label="Intermediário" value="intermediate" />
          <Picker.Item label="Avançado" value="advanced" />
        </Picker>
      </View>

      {errors.level && (
        <Text className="text-ErrorColor mb-4">{errors.level.message}</Text>
      )}

      <Input
        name="description"
        label="Descrição do curso *"
        placeholder="Descreva o que será abordado"
        multiline
        numberOfLines={4}
      />

      <Pressable
        onPress={async () => {
          const valid = await trigger([
            "title",
            "category",
            "level",
            "description",
          ]);
          if (valid) {
            onNext();
          }
        }}
        className={`p-3 rounded-md mt-3
        ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
      >
        <Text
          className={`text-center font-semibold
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Avançar
        </Text>
      </Pressable>
    </View>
  );
}
