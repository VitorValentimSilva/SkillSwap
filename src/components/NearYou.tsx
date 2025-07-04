import { useContext } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNearbySkills } from "../hooks/useNearbySkills";
import SkillDisplayCard from "../components/List/SkillDisplayCard";
import { colors } from "../styles/colors";

export default function NearYou() {
  const { isDark } = useContext(ThemeContext);
  const { nearbySkills, loading, error } = useNearbySkills();

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
        Nenhuma habilidade encontrada próxima a você.
      </Text>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 16, gap: 16, paddingTop: 5 }}
    >
      {nearbySkills.map((skill, index) => (
        <View key={index} style={{ width: 320, marginRight: 16 }}>
          <SkillDisplayCard {...skill} />
        </View>
      ))}
    </ScrollView>
  );
}
