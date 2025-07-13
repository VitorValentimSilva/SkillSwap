import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { colors } from "../styles/colors";
import SearchField from "../components/Search/SearchField";
import ListSkills from "../components/List/ListSkills";
import Filters from "../components/Search/Filters";
import { EMPTY_FILTERS } from "../utils/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import { FiltersState } from "../types/filters";
import { useSkills } from "../hooks/useSkills";
import { useFilteredSkills } from "../hooks/useFilteredSkills";

type RootStackParamList = {
  Aprenda: { category?: string };
};

type LearnSkillRouteProp = RouteProp<RootStackParamList, "Aprenda">;

export default function LearnSkill() {
  const { isDark } = useContext(ThemeContext);
  const route = useRoute<LearnSkillRouteProp>();
  const { category } = route.params || {};

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FiltersState>(() =>
    category ? { ...EMPTY_FILTERS, categoria: [category] } : EMPTY_FILTERS
  );

  const { skills: allSkills, loading, error } = useSkills();
  const filteredSkills = useFilteredSkills(
    allSkills,
    selectedFilters,
    searchQuery
  );

  useEffect(() => {
    setSelectedFilters(
      category ? { ...EMPTY_FILTERS, categoria: [category] } : EMPTY_FILTERS
    );
  }, [category]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark
          ? colors.BackgroundDarkTheme
          : colors.BackgroundLightTheme,
      }}
    >
      <Header />

      <View className="px-5 py-1 gap-1">
        <Text
          className={`text-3xl font-bold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Aprenda uma Habilidade
        </Text>

        <Text
          className={`text-lg
            ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
        >
          Descubra habilidades incríveis de instrutores especialistas
        </Text>
      </View>

      <SearchField
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPressFilter={() => setModalVisible(true)}
      />

      <Filters
        visible={modalVisible}
        selectedFilters={selectedFilters}
        onChangeFilters={setSelectedFilters}
        onClose={() => setModalVisible(false)}
      />

      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center" }}
          size="large"
          color={
            isDark
              ? colors.PrimaryColorDarkTheme
              : colors.PrimaryColorLightTheme
          }
        />
      ) : error ? (
        <View className="p-4">
          <Text className="text-center text-ErrorColor">{error}</Text>
        </View>
      ) : (
        <ListSkills skills={filteredSkills} />
      )}
    </SafeAreaView>
  );
}
