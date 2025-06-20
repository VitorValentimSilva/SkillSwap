import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  teachSkillSchema,
  TeachSkillFormData,
} from "../../schemas/teachSkillSchema";
import StepOneTeachSkill from "./StepOneTeachSkill";
import StepTwoTeachSkill from "./StepTwoTeachSkill";
import StepThreeTeachSkill from "./StepThreeTeachSkill";
import ReviewTeachSkill from "./ReviewTeachSkill";
import { ThemeContext } from "../../contexts/ThemeContext";
import StepProgressTeachSkill from "./StepProgressTeachSkill";

export default function FormTeachSkill() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { isDark } = useContext(ThemeContext);

  const methods = useForm<TeachSkillFormData>({
    resolver: zodResolver(teachSkillSchema),
    defaultValues: {
      title: "",
      category: "",
      level: "",
      method: "",
      maxStudents: "",
      description: "",
      packages: "",
      daysAvailable: [],
      credentials: "",
      videoUrl: "",
    },
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  const onSubmitAll = methods.handleSubmit((data) =>
    console.log("Enviando dados:", data)
  );

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
            <ReviewTeachSkill onSubmit={onSubmitAll} onBack={handleBack} />
          )}
        </View>
      </FormProvider>
    </View>
  );
}
