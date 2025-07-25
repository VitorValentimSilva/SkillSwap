import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skill } from "../../../types/skill";
import {
  TeachSkillFormData,
  teachSkillSchema,
} from "../../../schemas/teachSkillSchema";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useToggleArray } from "../../../hooks/useToggleArray";
import Input from "../../Form/Input";
import SelectInput from "../../Form/SelectInput";
import { daysOfWeek, FILTER_OPTIONS_AS_SELECT } from "../../../utils/constants";
import { colors } from "../../../styles/colors";
import VideoInput from "../../Form/VideoInput";

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
  const { items: selectedDays, toggle, setItems } = useToggleArray<string>([]);

  const methods = useForm<TeachSkillFormData>({
    resolver: zodResolver(teachSkillSchema),
    defaultValues: {
      title: "",
      category: "",
      level: "",
      method: "",
      hourlyRate: 0,
      daysAvailable: [],
      credentials: "",
      videoUrl: "",
      maxStudents: "",
      packages: undefined,
    },
  });

  const {
    reset,
    handleSubmit,
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
        hourlyRate: skill.hourlyRate,
        daysAvailable: skill.daysAvailable,
        credentials: skill.credentials || "",
        videoUrl: skill.videoUrl || "",
        maxStudents:
          skill.maxStudents !== undefined ? String(skill.maxStudents) : "",
        packages: Array.isArray(skill.packages)
          ? skill.packages.join(", ")
          : skill.packages || "",
      });
      setItems(skill.daysAvailable);
    }
  }, [skill, reset, setItems]);

  useEffect(() => {
    setValue("daysAvailable", selectedDays, { shouldValidate: true });
    trigger("daysAvailable");
  }, [selectedDays, setValue, trigger]);

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
                      onPress={() => toggle(day)}
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
                {errors.daysAvailable && (
                  <Text className="text-ErrorColor">
                    {errors.daysAvailable.message}
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
                disabled={isSaving}
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
  );
}
