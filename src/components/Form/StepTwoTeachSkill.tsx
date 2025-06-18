import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFormContext } from "react-hook-form";
import Input from "./Input";
import { TeachSkillFormData } from "../../schemas/teachSkillSchema";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

const daysOfWeek = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export interface StepTwoTeachSkillProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwoTeachSkill({
  onNext,
  onBack,
}: StepTwoTeachSkillProps) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<TeachSkillFormData>();
  const selectedDays = watch("daysAvailable") || [];
  const { isDark } = useContext(ThemeContext);

  const toggleDay = (day: string) => {
    const exists = selectedDays.includes(day);
    const updated = exists
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setValue("daysAvailable", updated, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <View>
      <Input
        name="hourlyRate"
        label="Valor por Hora (R$) *"
        placeholder="Ex: 25"
        keyboardType="numeric"
      />

      <Input
        name="packages"
        label="Opções de Pacote"
        placeholder="Ex: 4 sessões por 90 (10% de desconto)"
        multiline
        numberOfLines={4}
      />

      <Text
        className={`
          text-base font-semibold mb-2
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
        `}
      >
        Dias disponíveis *
      </Text>

      <View className="flex-row flex-wrap mb-6 gap-2">
        {daysOfWeek.map((day) => {
          const selected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day)}
              className={`
                flex-row items-center mr-2 mb-2
                px-4 py-2 border rounded-full
                ${
                  selected
                    ? isDark
                      ? "bg-SecondaryColorDarkTheme border-SecondaryColorDarkTheme"
                      : "bg-SecondaryColorLightTheme border-SecondaryColorLightTheme"
                    : isDark
                      ? "bg-SurfaceColorDarkTheme border-SurfaceColorDarkTheme"
                      : "bg-SurfaceColorLightTheme border-SurfaceColorLightTheme"
                }
              `}
            >
              {selected && (
                <Ionicons
                  name="checkmark"
                  size={16}
                  color={
                    isDark
                      ? colors.TextPrimaryColorDarkTheme
                      : colors.TextPrimaryColorLightTheme
                  }
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                className={`
                  text-sm
                  ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
                `}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}

        {errors.daysAvailable && (
          <Text className="text-ErrorColor">
            {errors.daysAvailable.message}
          </Text>
        )}
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={onBack}
          className={`px-10 py-3 rounded-md
          ${isDark ? "bg-TextSecondaryColorLightTheme" : "bg-TextSecondaryColorDarkTheme"}`}
        >
          <Text
            className={`text-center font-semibold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            Voltar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const valid = await trigger(["hourlyRate", "daysAvailable"]);
            if (valid) onNext();
          }}
          className={`px-10 py-3 rounded-md
          ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
        >
          <Text
            className={`text-center font-semibold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            Avançar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
