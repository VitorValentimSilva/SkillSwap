import React, { useContext, useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDateRange } from "../../../hooks/useDateRange";
import {
  formatDate,
  normalizeDay,
  weekdayNameFromDate,
} from "../../../utils/date";
import CalendarGrid from "./CalendarGrid";
import TimeList from "./TimeList";
import ActionButtons from "./ActionButtons";
import { Skill } from "../../../types/skill";
import { ThemeContext } from "../../../contexts/ThemeContext";

interface StepTwoLearnNowrops {
  onNext: () => void;
  onBack: () => void;
  skill: Skill;
}

export default function StepTwoLearnNow({
  onNext,
  onBack,
  skill,
}: StepTwoLearnNowrops) {
  const { isDark } = useContext(ThemeContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { monthCells } = useDateRange({
    start: new Date(),
    monthsAhead: 1,
  });

  const availableDaysSet = useMemo(
    () =>
      new Set((skill?.timesAvailable || []).map((t) => normalizeDay(t.day))),
    [skill]
  );

  const timesForDate = (date: Date) => {
    const dayName = weekdayNameFromDate(date);
    return (
      (skill?.timesAvailable || []).find((t) => normalizeDay(t.day) === dayName)
        ?.times || []
    );
  };

  const canProceed = !!selectedDate && !!selectedTime;

  return (
    <View className="flex-1 pb-8">
      <ScrollView className="flex-1">
        <Text
          className={`text-2xl font-bold 
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Escolha data e hora
        </Text>
        <Text
          className={`text-sm mb-6 
          ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
        >
          Escolha quando você gostaria de ter sua sessão
        </Text>

        <CalendarGrid
          monthCells={monthCells}
          availableDaysSet={availableDaysSet}
          selectedDate={selectedDate}
          onSelectDate={(d) => {
            setSelectedDate(d);
            setSelectedTime(null);
          }}
        />

        {selectedDate && (
          <>
            <Text
              className={`mb-2 font-semibold 
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              Horários para {formatDate(selectedDate)}
            </Text>

            <TimeList
              times={timesForDate(selectedDate)}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          </>
        )}
      </ScrollView>

      <ActionButtons onBack={onBack} onNext={onNext} canProceed={canProceed} />
    </View>
  );
}
