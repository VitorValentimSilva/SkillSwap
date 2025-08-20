import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import OptionCard from "./OptionCard";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Skill } from "../../../types/skill";

interface StepOneLearnNowProps {
  onNext: () => void;
  skill: Skill;
  selected: "single" | "package" | null;
  setSelected: (s: "single" | "package" | null) => void;
}

export default function StepOneLearnNow({
  onNext,
  skill,
  selected,
  setSelected,
}: StepOneLearnNowProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="flex-1 pb-8">
      <Text
        className={`text-2xl font-bold
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        Escolha sua sessão
      </Text>
      <Text
        className={`text-sm mb-6
        ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
      >
        Selecione o tipo de sessão que deseja reservar
      </Text>

      <OptionCard
        title="Sessão Única"
        description={`Sessão de 1 hora de ${skill.title}`}
        price={`R$${skill.hourlyRate}/h`}
        selected={selected === "single"}
        onPress={() => setSelected("single")}
      />

      <TouchableOpacity
        onPress={onNext}
        disabled={!selected}
        className={`
          mt-auto py-3 rounded-lg items-center
          ${selected ? (isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme") : "bg-gray-300"}
        `}
        activeOpacity={0.8}
      >
        <Text
          className={`text-lg font-semibold
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Avançar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
