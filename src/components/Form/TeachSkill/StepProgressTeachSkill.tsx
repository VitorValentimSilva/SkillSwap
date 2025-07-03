import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepProgressTeachSkill({
  currentStep,
  totalSteps,
}: StepProgressProps) {
  const { isDark } = useContext(ThemeContext);
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="mb-6">
      <View className="flex-row gap-2 mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            className={`flex-1 h-1 rounded-md ${
              index < currentStep
                ? isDark
                  ? "bg-SecondaryColorDarkTheme"
                  : "bg-SecondaryColorLightTheme"
                : isDark
                  ? "bg-SurfaceColorDarkTheme"
                  : "bg-SurfaceColorLightTheme"
            }`}
          />
        ))}
      </View>

      <View className="flex-row justify-between">
        <Text
          className={`text-sm mt-1
          ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
        >
          Etapa {currentStep} de {totalSteps}
        </Text>
        <Text
          className={`text-base font-semibold mt-1 
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          {Math.round(progress)}% Completo
        </Text>
      </View>
    </View>
  );
}
