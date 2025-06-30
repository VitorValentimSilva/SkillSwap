import React, { useContext } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useSkills } from "../hooks/useSkills";
import SkillDisplayCard from "./SkillDisplayCard";
import { colors } from "../styles/colors";

export default function ListSkills() {
  const { isDark } = useContext(ThemeContext);
  const { skills, loading, error } = useSkills();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator
          size="large"
          color={
            isDark
              ? colors.PrimaryColorDarkTheme
              : colors.PrimaryColorLightTheme
          }
        />
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4">
        <Text className="text-center text-ErrorColor">{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={skills}
      keyExtractor={(_, idx) => String(idx)}
      contentContainerStyle={{ padding: 16, paddingBottom: 65 }}
      renderItem={({ item }) => <SkillDisplayCard {...item} />}
      ListEmptyComponent={
        <Text
          className={`text-center mt-8 ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Nenhuma habilidade cadastrada.
        </Text>
      }
    />
  );
}
