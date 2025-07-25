import { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Skill } from "../../../types/skill";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { colors } from "../../../styles/colors";

interface MySkillDisplayCardProps extends Skill {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MySkillDisplayCard({
  title,
  category,
  level,
  method,
  description,
  hourlyRate,
  daysAvailable,
  onEdit,
  onDelete,
}: MySkillDisplayCardProps) {
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
          R${hourlyRate}/h
        </Text>
      </View>

      <View className="flex-row flex-wrap space-x-2 gap-3">
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
        className={`text-sm mb-1
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        {description}
      </Text>

      <View>
        <Text
          className={`font-semibold mb-1
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Dias disponíveis
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-2"
        >
          {daysAvailable.map((day) => (
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

      <View className="flex-row justify-end space-x-4 mt-3 gap-8">
        <TouchableOpacity onPress={onEdit} className="flex-row items-center">
          <Ionicons
            name="pencil"
            size={18}
            color={colors.AccentColor}
            className="mr-1"
          />
          <Text className="font-semibold text-AccentColor">Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} className="flex-row items-center">
          <Ionicons
            name="trash"
            size={18}
            color={colors.ErrorColor}
            className="mr-1"
          />
          <Text className="font-semibold text-ErrorColor">Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
