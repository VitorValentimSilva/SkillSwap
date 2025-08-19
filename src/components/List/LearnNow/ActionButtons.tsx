import React, { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";

interface Props {
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
}

export default function ActionButtons({ onBack, onNext, canProceed }: Props) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="flex-row justify-between items-center gap-8 mt-6 pr-8">
      <TouchableOpacity
        onPress={onBack}
        className={`py-2 w-1/2 rounded-lg 
        ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
      >
        <Text
          className={`text-lg font-semibold text-center 
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Voltar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => canProceed && onNext()}
        disabled={!canProceed}
        className={`py-2 w-1/2 rounded-lg 
        ${canProceed ? (isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme") : "bg-gray-300"}`}
      >
        <Text
          className={`text-lg font-semibold text-center 
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Avançar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
