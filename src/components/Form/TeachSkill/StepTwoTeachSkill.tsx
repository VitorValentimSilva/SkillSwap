import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { TeachSkillFormData } from "../../../schemas/teachSkillSchema";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Input from "../Input";
import { colors } from "../../../styles/colors";
import AppButton from "./AppButton";
import { useToggleArray } from "../../../hooks/useToggleArray";
import { daysOfWeek } from "../../../utils/constants";

export interface StepTwoTeachSkillProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwoTeachSkill({
  onNext,
  onBack,
}: StepTwoTeachSkillProps) {
  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<TeachSkillFormData>();
  const { isDark } = useContext(ThemeContext);
  const { items: selectedDays, toggle, setItems } = useToggleArray<string>([]);

  useEffect(() => {
    trigger("daysAvailable");
  }, []);

  useEffect(() => {
    setValue("daysAvailable", selectedDays, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  }, [selectedDays, setValue]);

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
              onPress={() => toggle(day)}
              className={`flex-row items-center px-4 py-2 border rounded-full ${
                selected
                  ? isDark
                    ? "bg-SecondaryColorDarkTheme border-SecondaryColorDarkTheme"
                    : "bg-SecondaryColorLightTheme border-SecondaryColorLightTheme"
                  : isDark
                    ? "bg-SurfaceColorDarkTheme border-SurfaceColorDarkTheme"
                    : "bg-SurfaceColorLightTheme border-SurfaceColorLightTheme"
              }`}
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
                className={`text-sm ${
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                }`}
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
        <AppButton label="Voltar" onPress={onBack} type="secondary" />
        <AppButton
          label="Avançar"
          onPress={async () => {
            const valid = await trigger(["hourlyRate", "daysAvailable"]);
            if (valid) onNext();
          }}
        />
      </View>
    </View>
  );
}
