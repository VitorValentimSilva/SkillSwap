import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useFormContext } from "react-hook-form";
import { TeachSkillFormData } from "../../schemas/teachSkillSchema";
import { ThemeContext } from "../../contexts/ThemeContext";

export interface ReviewTeachSkillProps {
  onSubmit: () => void;
  onBack: (step: number) => void;
}

export default function ReviewTeachSkill({
  onSubmit,
  onBack,
}: ReviewTeachSkillProps) {
  const { getValues } = useFormContext<TeachSkillFormData>();
  const vals = getValues();
  const { isDark } = useContext(ThemeContext);

  return (
    <ScrollView>
      {Object.entries(vals).map(([key, val]) => (
        <View key={key} className="mb-2">
          <Text className="font-semibold">{key}</Text>
          <Text>{Array.isArray(val) ? val.join(", ") : String(val)}</Text>
        </View>
      ))}

      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={() => onBack(1)}
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
            onSubmit();
          }}
          className={`px-10 py-3 rounded-md
          ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
        >
          <Text
            className={`text-center font-semibold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
