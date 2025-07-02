import { SafeAreaView, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useState } from "react";
import Header from "../components/Header";
import { colors } from "../styles/colors";
import SearchField from "../components/Search/SearchField";
import ListSkills from "../components/ListSkills";
import Filters from "../components/Search/Filters";
import { EMPTY_FILTERS } from "../utils/constants";

export default function LearnSkill() {
  const { isDark } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(EMPTY_FILTERS);

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

      <SearchField onPressFilter={() => setModalVisible(true)} />

      <Filters
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedFilters={selectedFilters}
        onChangeFilters={setSelectedFilters}
      />

      <ListSkills filters={selectedFilters} />
    </SafeAreaView>
  );
}
