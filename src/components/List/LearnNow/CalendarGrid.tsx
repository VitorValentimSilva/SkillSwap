import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { normalizeDay, weekdayNameFromDate } from "../../../utils/date";
import { ThemeContext } from "../../../contexts/ThemeContext";

interface Props {
  monthCells: (Date | null)[];
  availableDaysSet: Set<string>;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
}

export default function CalendarGrid({
  monthCells,
  availableDaysSet,
  selectedDate,
  onSelectDate,
}: Props) {
  const { isDark } = useContext(ThemeContext);
  const dayBaseClass =
    "w-11 h-11 rounded-md flex items-center justify-center mb-3";

  return (
    <View>
      {Array.from({ length: Math.ceil(monthCells.length / 7) }).map(
        (_, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between">
            {monthCells.slice(rowIndex * 7, rowIndex * 7 + 7).map((cell, i) => {
              const key = cell ? cell.toISOString() : `empty-${rowIndex}-${i}`;
              if (!cell) return <View key={key} className={dayBaseClass} />;
              const dayNumber = cell.getDate();
              const dayName = weekdayNameFromDate(cell);
              const isAvailable = availableDaysSet.has(normalizeDay(dayName));
              const isSelected =
                selectedDate &&
                selectedDate.toDateString() === cell.toDateString();

              const bgClass = isSelected
                ? isDark
                  ? "bg-PrimaryColorDarkTheme"
                  : "bg-PrimaryColorLightTheme"
                : isAvailable
                  ? isDark
                    ? "bg-BackgroundDarkTheme"
                    : "bg-BackgroundLightTheme"
                  : isDark
                    ? "bg-BackgroundDarkTheme/60"
                    : "bg-BackgroundLightTheme/60";

              const textClass = isSelected
                ? isDark
                  ? "text-TextPrimaryColorLightTheme font-bold"
                  : "text-TextPrimaryColorDarkTheme font-bold"
                : isAvailable
                  ? isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                  : isDark
                    ? "text-TextPrimaryColorDarkTheme/60"
                    : "text-TextPrimaryColorLightTheme/60";

              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => isAvailable && onSelectDate(cell)}
                  disabled={!isAvailable}
                  className={`${dayBaseClass} ${bgClass}`}
                >
                  <Text className={`text-sm ${textClass}`}>{dayNumber}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )
      )}
    </View>
  );
}
