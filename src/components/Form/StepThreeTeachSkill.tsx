import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import Input from "./Input";

export interface StepThreeTeachSkillProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepThreeTeachSkill({
  onNext,
  onBack,
}: StepThreeTeachSkillProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View>
      <Input
        name="credentials"
        label="Credenciais e Certificados"
        placeholder="Liste suas credenciais"
        multiline
        numberOfLines={4}
      />

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
            onNext();
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
