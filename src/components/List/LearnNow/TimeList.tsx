import React, { useContext } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";

interface Props {
  times: string[];
  selectedTime: string | null;
  onSelectTime: (t: string) => void;
}

export default function TimeList({ times, selectedTime, onSelectTime }: Props) {
  const { isDark } = useContext(ThemeContext);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingVertical: 4 }}
    >
      {times.map((t) => {
        const chosen = selectedTime === t;
        const cls = chosen
          ? isDark
            ? "bg-PrimaryColorDarkTheme"
            : "bg-PrimaryColorLightTheme"
          : isDark
            ? "bg-BackgroundDarkTheme"
            : "bg-BackgroundLightTheme";
        return (
          <TouchableOpacity
            key={t}
            onPress={() => onSelectTime(t)}
            className={`px-4 py-2 mr-3 rounded-md ${cls}`}
          >
            <Text
              className={`font-bold ${isDark ? "text-white" : "text-black"}`}
            >
              {t}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
