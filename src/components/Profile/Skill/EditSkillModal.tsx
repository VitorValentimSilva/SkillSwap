import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skill } from "../../../types/skill";
import {
  TeachSkillFormData,
  teachSkillSchema,
} from "../../../schemas/teachSkillSchema";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Input from "../../Form/Input";
import SelectInput from "../../Form/SelectInput";
import { daysOfWeek, FILTER_OPTIONS_AS_SELECT } from "../../../utils/constants";
import { colors } from "../../../styles/colors";
import VideoInput from "../../Form/VideoInput";
import TimePickerModal from "../../Form/TeachSkill/TimePickerModal";

interface EditSkillModalProps {
  visible: boolean;
  skill: Skill | null;
  onSave: (updated: TeachSkillFormData) => void;
  onCancel: () => void;
}

export default function EditSkillModal({
  visible,
  skill,
  onSave,
  onCancel,
}: EditSkillModalProps) {
  const { isDark } = useContext(ThemeContext);
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm<TeachSkillFormData>({
    resolver: zodResolver(teachSkillSchema),
    defaultValues: {
      title: "",
      category: "",
      level: "",
      method: "",
      description: "",
      hourlyRate: 0,
      daysAvailable: [],
      timesAvailable: [],
      credentials: "",
      videoUrl: "",
      maxStudents: "",
      packages: undefined,
    },
    mode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = methods;

  const selectedDays = watch("daysAvailable") as string[];
  const { fields, append, remove } = useFieldArray({
    control,
    name: "timesAvailable",
  });
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);

  useEffect(() => {
    if (skill) {
      reset({
        title: skill.title,
        description: skill.description,
        category: skill.category,
        level: skill.level,
        method: skill.method,
        hourlyRate: skill.hourlyRate,
        daysAvailable: skill.daysAvailable,
        timesAvailable: skill.timesAvailable || [],
        credentials: skill.credentials || "",
        videoUrl: skill.videoUrl || "",
        maxStudents:
          skill.maxStudents !== undefined ? String(skill.maxStudents) : "",
        packages: Array.isArray(skill.packages)
          ? skill.packages.join(", ")
          : skill.packages || "",
      });
    }
  }, [skill, reset]);

  useEffect(() => {
    selectedDays.forEach((day) => {
      if (!fields.find((f) => f.day === day)) {
        append({ day, times: [] });
      }
    });
    fields.forEach((f, idx) => {
      if (!selectedDays.includes(f.day)) {
        remove(idx);
      }
    });
  }, [selectedDays]);

  const openTimePicker = (index: number) => setPickerIndex(index);
  const closeTimePicker = () => setPickerIndex(null);

  const handleSaveTime = (time: string) => {
    if (pickerIndex === null) return;
    const dayTimes = fields[pickerIndex].times;
    if (dayTimes.includes(time)) {
      return closeTimePicker();
    }
    const updated = [...fields];
    updated[pickerIndex].times.push(time);
    setValue("timesAvailable", updated, { shouldValidate: true });
    closeTimePicker();
  };

  return (
    <>
      <Modal transparent animationType="slide" visible={visible}>
        <View className="flex-1 bg-black bg-opacity-30">
          <FormProvider {...methods}>
            <View
              className={`flex-1 w-full h-full p-4 
              ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
            >
              <Text
                className={`text-3xl font-bold mb-4 ${
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                }`}
              >
                Editar Habilidade
              </Text>

              <ScrollView
                contentContainerStyle={{ paddingBottom: 16 }}
                showsVerticalScrollIndicator={true}
              >
                <Input name="title" label="Título da habilidade *" />

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

                <Input
                  name="hourlyRate"
                  label="Preço por Hora *"
                  placeholder="Ex: 50"
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
                  className={`text-base font-semibold mb-2 ${
                    isDark
                      ? "text-TextPrimaryColorDarkTheme"
                      : "text-TextPrimaryColorLightTheme"
                  }`}
                >
                  Dias disponíveis *
                </Text>
                <View className="flex-row flex-wrap mb-4 gap-2">
                  {daysOfWeek.map((day) => {
                    const selected = selectedDays.includes(day);
                    return (
                      <TouchableOpacity
                        key={day}
                        onPress={() => {
                          const exists = selectedDays.includes(day);
                          const updated = exists
                            ? selectedDays.filter((d) => d !== day)
                            : [...selectedDays, day];
                          setValue("daysAvailable", updated, {
                            shouldValidate: true,
                            shouldTouch: true,
                            shouldDirty: true,
                          });
                        }}
                        className={`flex-row items-center px-4 py-2 border rounded-full ${
                          selected
                            ? isDark
                              ? "bg-SecondaryColorDarkTheme border-SecondaryColorDarkTheme"
                              : "bg-SecondaryColorLightTheme border-SecondaryColorLightTheme"
                            : isDark
                              ? "bg-BackgroundDarkTheme border-BackgroundDarkTheme"
                              : "bg-BackgroundLightTheme border-BackgroundLightTheme"
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
                          className={`text-sm ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
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
                  className={`text-base font-semibold mb-2 ${
                    isDark
                      ? "text-TextPrimaryColorDarkTheme"
                      : "text-TextPrimaryColorLightTheme"
                  }`}
                >
                  Horários disponíveis *
                </Text>
                {fields.map((field, idx) => (
                  <View key={field.id} className="mb-4">
                    <Text
                      className={`font-semibold mb-2 ${
                        isDark
                          ? "text-TextPrimaryColorDarkTheme"
                          : "text-TextPrimaryColorLightTheme"
                      }`}
                    >
                      {field.day}
                    </Text>
                    <View className="flex-row flex-wrap gap-3 mb-3">
                      {field.times.map((t, i) => (
                        <View
                          key={i}
                          className={`flex-row items-center border rounded px-4 py-1 ${isDark ? "border-PrimaryColorDarkTheme" : "border-PrimaryColorLightTheme"}`}
                        >
                          <Text
                            className={`mr-2 ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
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
                            <Text className="text-ErrorColor font-semibold">
                              X
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity
                      onPress={() => openTimePicker(idx)}
                      className={`p-3 rounded ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
                    >
                      <Text
                        className={`font-semibold text-center ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
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

                <Input
                  name="credentials"
                  label="Credenciais e Certificados"
                  placeholder="Liste suas credenciais"
                  multiline
                  numberOfLines={4}
                />

                <VideoInput
                  name="videoUrl"
                  label="Vídeo de Introdução"
                  maxDurationSec={180}
                />
              </ScrollView>

              <View className="flex-row justify-end space-x-4 mt-2 gap-10">
                <TouchableOpacity
                  onPress={onCancel}
                  className={`px-6 py-2 rounded-full border
                  ${isDark ? "border-PrimaryColorDarkTheme" : "border-PrimaryColorLightTheme"}`}
                >
                  <Text
                    className={`${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={isSaving || !isDirty}
                  onPress={handleSubmit(
                    async (data) => {
                      setIsSaving(true);
                      try {
                        await onSave(data);
                      } catch (e) {
                        console.error("Erro ao salvar edição:", e);
                      } finally {
                        setIsSaving(false);
                      }
                    },
                    (errors) => {
                      console.log("Form errors:", errors);
                    }
                  )}
                  className={`
                  px-8 py-2 rounded-full flex-row justify-center items-center
                  ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}
                  ${isSaving ? "opacity-50" : ""}
                  ${
                    isSaving || !isDirty
                      ? "opacity-50 pointer-events-none bg-gray-300"
                      : ""
                  }
                  `}
                >
                  {isSaving ? (
                    <ActivityIndicator
                      size="small"
                      color={
                        isDark
                          ? colors.TextPrimaryColorDarkTheme
                          : colors.TextPrimaryColorLightTheme
                      }
                    />
                  ) : (
                    <Text
                      className={`text-base font-semibold ${
                        isDark
                          ? "text-TextPrimaryColorDarkTheme"
                          : "text-TextPrimaryColorLightTheme"
                      }`}
                    >
                      Salvar
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </FormProvider>
        </View>
      </Modal>

      <TimePickerModal
        visible={pickerIndex !== null}
        onSave={handleSaveTime}
        onCancel={closeTimePicker}
      />
    </>
  );
}
