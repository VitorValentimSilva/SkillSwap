import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { TeachSkillFormData } from "../../../schemas/teachSkillSchema";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Input from "../Input";
import { colors } from "../../../styles/colors";
import AppButton from "./AppButton";
import { daysOfWeek } from "../../../utils/constants";
import TimePickerModal from "./TimePickerModal";

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
    control,
    formState: { errors },
  } = useFormContext<TeachSkillFormData>();
  const { isDark } = useContext(ThemeContext);
  const selectedDays = watch("daysAvailable") as string[];
  const { fields, append, remove } = useFieldArray({
    control,
    name: "timesAvailable",
  });
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);

  const toggleDay = (day: string) => {
    const exists = selectedDays.includes(day);
    const updated = exists
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setValue("daysAvailable", updated, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    selectedDays.forEach((day) => {
      if (!fields.find((f) => f.day === day)) {
        append({ day, times: [] });
      }
    });
    fields.forEach((f, idx) => {
      if (!selectedDays.includes(f.day)) remove(idx);
    });
  }, [selectedDays]);

  const openTimePicker = (index: number) => setPickerIndex(index);
  const closeTimePicker = () => setPickerIndex(null);

  const handleSaveTime = (time: string) => {
    if (pickerIndex === null) return;

    const currentTimes = fields[pickerIndex].times;

    if (currentTimes.includes(time)) {
      Alert.alert(
        "Horário duplicado",
        `${time} já foi adicionado para ${fields[pickerIndex].day}.`
      );
      closeTimePicker();
      return;
    }

    const updated = [...fields];
    updated[pickerIndex].times.push(time);
    setValue("timesAvailable", updated, { shouldValidate: true });
    closeTimePicker();
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

      <View className="flex-row flex-wrap mb-4 gap-2">
        {daysOfWeek.map((day) => {
          const selected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day)}
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

      <Text
        className={`
          text-base font-semibold mb-2
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}
        `}
      >
        Horários disponíveis *
      </Text>

      {fields.map((field, idx) => (
        <View key={field.id} className="mb-3">
          <Text
            className={`font-semibold mb-1
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            {field.day}
          </Text>

          <View className="flex-row flex-wrap gap-3 mb-3">
            {field.times.map((t, i) => (
              <View
                key={i}
                className={`flex-row items-center border rounded px-4 py-1
                  ${isDark ? "border-PrimaryColorDarkTheme" : "border-PrimaryColorLightTheme"}`}
              >
                <Text
                  className={`mr-2
                  ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
                >
                  {t}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const updated = [...fields];
                    updated[idx].times = updated[idx].times.filter(
                      (_, j) => j !== i
                    );
                    setValue("timesAvailable", updated, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Text className="text-ErrorColor font-semibold">X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => openTimePicker(idx)}
            className={`p-3 rounded
              ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
          >
            <Text
              className={`font-semibold text-center
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              Adicionar horário
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {errors.timesAvailable && (
        <View className="mb-4">
          {Array.isArray(errors.timesAvailable) &&
            (errors.timesAvailable as any).map((e: any, i: number) =>
              e?.times?.message ? (
                <Text key={i} className="text-ErrorColor">
                  {fields[i].day}: {e.times.message}
                </Text>
              ) : null
            )}

          {(errors.timesAvailable as any)?.message && (
            <Text className="text-ErrorColor">
              {(errors.timesAvailable as any).message}
            </Text>
          )}
        </View>
      )}

      <TimePickerModal
        visible={pickerIndex !== null}
        onSave={handleSaveTime}
        onCancel={closeTimePicker}
      />

      <View className="flex-row justify-between mt-6">
        <AppButton label="Voltar" onPress={onBack} type="secondary" />
        <AppButton
          label="Avançar"
          onPress={async () => {
            const valid = await trigger([
              "hourlyRate",
              "daysAvailable",
              "timesAvailable",
            ]);
            if (valid) onNext();
          }}
        />
      </View>
    </View>
  );
}
