import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import ListButton from "./ListButton";
import { Skill } from "../../types/skill";

export default function SkillDisplayCard({
  title,
  category,
  level,
  method,
  description,
  pricePerHour,
  availableDays,
}: Skill) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View
      className={`rounded-2xl p-4 shadow-md mb-5
        ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text
          className={`text-xl font-bold flex-1
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          {title}
        </Text>
        <Text
          className={`font-bold text-xl
            ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
        >
          R${pricePerHour}/h
        </Text>
      </View>

      <View className="flex-row flex-wrap mb-3 space-x-2 gap-3">
        <View
          className={`px-3 py-1 rounded-full mb-2
            ${isDark ? "bg-TextPrimaryColorDarkTheme" : "bg-TextPrimaryColorLightTheme"}`}
        >
          <Text
            className={`text-sm
            ${isDark ? "text-SurfaceColorDarkTheme" : "text-SurfaceColorLightTheme"}`}
          >
            {category}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full mb-2
            ${isDark ? "bg-TextPrimaryColorDarkTheme" : "bg-TextPrimaryColorLightTheme"}`}
        >
          <Text
            className={`text-sm
            ${isDark ? "text-SurfaceColorDarkTheme" : "text-SurfaceColorLightTheme"}`}
          >
            {level}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full mb-2
            ${isDark ? "bg-TextPrimaryColorDarkTheme" : "bg-TextPrimaryColorLightTheme"}`}
        >
          <Text
            className={`text-sm
            ${isDark ? "text-SurfaceColorDarkTheme" : "text-SurfaceColorLightTheme"}`}
          >
            {method}
          </Text>
        </View>
      </View>

      <Text
        className={`text-sm mb-4
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        {description}
      </Text>

      <View className="mb-4">
        <Text
          className={`font-semibold mb-2
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Dias disponíveis
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-2"
        >
          {availableDays.map((day) => (
            <View
              key={day}
              className={`px-3 py-1 rounded-full mr-3
                ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
            >
              <Text
                className={`text-sm
                ${isDark ? "text-SurfaceColorDarkTheme" : "text-SurfaceColorLightTheme"}`}
              >
                {day}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <ListButton />
    </View>
  );
}
