import React, { useContext, useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StepOneLearnNow from "./StepOneLearnNow";
import StepTwoLearnNow from "./StepTwoLearnNow";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { colors } from "../../../styles/colors";
import { Skill } from "../../../types/skill";

interface LearnNowProps {
  visible: boolean;
  onClose: () => void;
  skill: Skill;
}

export default function LearnNow({ visible, onClose, skill }: LearnNowProps) {
  const { isDark } = useContext(ThemeContext);
  const TOTAL_STEPS = 4;
  const [step, setStep] = useState(1);
  const [selectedSession, setSelectedSession] = useState<
    "single" | "package" | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setStep(1);
    }
  }, [visible]);

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else onClose();
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <View
        className={`flex-1 justify-center px-5
        ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
      >
        <View
          className={`flex-row items-center justify-between py-3 mb-3 border-b
          ${isDark ? "border-TextPrimaryColorDarkTheme" : "border-TextPrimaryColorLightTheme"}`}
        >
          <Text
            className={`text-4xl font-bold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            Sessões
          </Text>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={32} color={colors.ErrorColor} />
          </TouchableOpacity>
        </View>

        <View className="flex-1">
          {step === 1 && (
            <StepOneLearnNow
              onNext={handleNext}
              skill={skill}
              selected={selectedSession}
              setSelected={setSelectedSession}
            />
          )}

          {step === 2 && (
            <StepTwoLearnNow
              onBack={() => setStep(1)}
              skill={skill}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
