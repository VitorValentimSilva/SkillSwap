import React, { useContext, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Skill } from "../../types/skill";
import SelectInput from "../Form/SelectInput";
import { FILTER_OPTIONS_AS_SELECT } from "../../utils/constants";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../Form/Input";
import { Ionicons } from "@expo/vector-icons";
import { daysOfWeek } from "../Form/TeachSkill/StepTwoTeachSkill";
import { colors } from "../../styles/colors";
import VideoInput from "../Form/VideoInput";

interface EditSkillModalProps {
  visible: boolean;
  skill: Skill | null;
  onSave: (updated: Partial<Skill>) => void;
  onCancel: () => void;
}

export default function EditSkillModal({
  visible,
  skill,
  onSave,
  onCancel,
}: EditSkillModalProps) {
  const { isDark } = useContext(ThemeContext);

  const methods = useForm<Skill>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "",
      method: "",
      pricePerHour: 0,
      availableDays: [],
      credentials: "",
      videoUrl: "",
      maxStudents: 0,
      packages: undefined,
    },
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (skill) {
      reset({
        title: skill.title,
        description: skill.description,
        category: skill.category,
        level: skill.level,
        method: skill.method,
        pricePerHour: skill.pricePerHour,
        availableDays: skill.availableDays,
        credentials: skill.credentials || "",
        videoUrl: skill.videoUrl || "",
        maxStudents: skill.maxStudents,
        packages: skill.packages,
      });
    }
  }, [skill, reset]);

  const selectedDays = watch("availableDays") || [];

  const toggleDay = (day: string) => {
    const currentDays = watch("availableDays") || [];
    const exists = currentDays.includes(day);
    const updated = exists
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    setValue("availableDays", updated, { shouldValidate: true });
    trigger("availableDays");
  };

  const onSubmit = (data: Skill) => {
    onSave({
      title: data.title,
      description: data.description,
      category: data.category,
      level: data.level,
      method: data.method,
      pricePerHour: Number(data.pricePerHour),
      availableDays: data.availableDays,
      credentials: data.credentials,
      videoUrl: data.videoUrl,
      maxStudents: Number(data.maxStudents),
      packages: data.packages,
    });
  };

  return (
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
                keyboardType="numeric"
              />

              <Input
                name="description"
                label="Descrição do curso *"
                placeholder="Descreva o que será abordado"
                multiline
                numberOfLines={4}
              />

              <Input
                name="pricePerHour"
                label="Preço por Hora"
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
                      onPress={() => toggleDay(day)}
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
                {errors.availableDays && (
                  <Text className="text-ErrorColor">
                    {errors.availableDays.message}
                  </Text>
                )}
              </View>

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
                onPress={handleSubmit(onSubmit)}
                className={`px-8 py-2 rounded-full
                 ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
              >
                <Text className="text-TextPrimaryColorDarkTheme">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FormProvider>
      </View>
    </Modal>
  );
}
