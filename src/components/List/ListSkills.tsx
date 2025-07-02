import React, { useContext } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useSkills } from "../../hooks/useSkills";
import { colors } from "../../styles/colors";
import { FiltersState } from "../../types/filters";
import SkillDisplayCard from "./SkillDisplayCard";

interface ListSkillsProps {
  filters: FiltersState;
}

export default function ListSkills({ filters }: ListSkillsProps) {
  const { isDark } = useContext(ThemeContext);
  const { skills, loading, error } = useSkills();

  const filtered = skills.filter((skill) => {
    const byCat =
      filters.categoria.length === 0 ||
      filters.categoria.includes(skill.category);
    const byLevel =
      filters.dificuldade.length === 0 ||
      filters.dificuldade.includes(skill.level);
    const byMethod =
      filters.formatar.length === 0 || filters.formatar.includes(skill.method);
    return byCat && byLevel && byMethod;
  });

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
      data={filtered}
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
