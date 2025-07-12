import { useContext, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import SkillDisplayCard from "../components/List/SkillDisplayCard";
import { colors } from "../styles/colors";
import { useNearbySkillsByCity } from "../hooks/useNearbySkillsByCity";
import ModalSkillCard from "./List/ModalSkillCard";
import { SkillDisplayCardProps } from "../types/skill";

export default function NearYou() {
  const { isDark } = useContext(ThemeContext);
  const { nearbySkills, loading, error } = useNearbySkillsByCity();
  const [selectedSkill, setSelectedSkill] =
    useState<SkillDisplayCardProps | null>(null);

  if (loading) {
    return (
      <View className="justify-center items-center py-10">
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
    return <Text className="text-center text-ErrorColor mt-4">{error}</Text>;
  }

  if (nearbySkills.length === 0) {
    return (
      <Text
        className={`text-center mt-4 ${
          isDark
            ? "text-TextPrimaryColorDarkTheme"
            : "text-TextPrimaryColorLightTheme"
        }`}
      >
        Nenhuma habilidade encontrada na mesma cidade sua.
      </Text>
    );
  }

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, gap: 16, paddingTop: 5 }}
      >
        {nearbySkills.map((skill, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedSkill(skill)}
            style={{ width: 320, marginRight: 16 }}
          >
            <SkillDisplayCard {...skill} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ModalSkillCard
        visible={!!selectedSkill}
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </>
  );
}
