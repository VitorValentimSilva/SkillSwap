import React, { useContext, useState } from "react";
import { Alert, Text, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  teachSkillSchema,
  TeachSkillFormData,
} from "../../../schemas/teachSkillSchema";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useTeachSkill } from "../../../contexts/TeachSkillContext";
import StepProgressTeachSkill from "./StepProgressTeachSkill";
import StepOneTeachSkill from "./StepOneTeachSkill";
import StepTwoTeachSkill from "./StepTwoTeachSkill";
import StepThreeTeachSkill from "./StepThreeTeachSkill";
import ReviewTeachSkill from "./ReviewTeachSkill";

export default function FormTeachSkill() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { isDark } = useContext(ThemeContext);
  const { submitTeachSkill } = useTeachSkill();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmitAll = methods.handleSubmit(async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const id = await submitTeachSkill(data);
      console.log("Teach skill enviada com sucesso! ID:", id);
      Alert.alert(
        "Sucesso",
        "Sua habilidade foi cadastrada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              methods.reset();
              setStep(1);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      console.error("Erro ao enviar dados:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao enviar seus dados. Tente novamente mais tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  const stepTitles = {
    1: "Detalhes da Habilidade",
    2: "Estrutura de Preços",
    3: "Credenciais e Mídia",
    4: "Revise e Envie",
  };

  return (
    <View className="p-5">
      <StepProgressTeachSkill currentStep={step} totalSteps={totalSteps} />

      <Text
        className={`text-2xl font-bold mb-5
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        {stepTitles[step as keyof typeof stepTitles]}
      </Text>

      <FormProvider {...methods}>
        <View>
          {step === 1 && <StepOneTeachSkill onNext={handleNext} />}
          {step === 2 && (
            <StepTwoTeachSkill onNext={handleNext} onBack={handleBack} />
          )}
          {step === 3 && (
            <StepThreeTeachSkill onNext={handleNext} onBack={handleBack} />
          )}
          {step === 4 && (
            <ReviewTeachSkill
              onSubmit={onSubmitAll}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          )}
        </View>
      </FormProvider>
    </View>
  );
}
