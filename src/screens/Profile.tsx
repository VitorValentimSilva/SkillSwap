import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Pressable } from "react-native";
import Header from "../components/Header";
import TopScreen from "../components/Profile/TopScreen";
import ImgProfile from "../components/Profile/ImgProfile";
import InitialInformation from "../components/Profile/InitialInformation";
import { ThemeContext } from "../contexts/ThemeContext";
import MySkill from "../components/Profile/MySkill";
import AllSkillsModal from "../components/Profile/AllSkillsModal";

export default function Profile() {
  const { isDark } = useContext(ThemeContext);
  const [showAll, setShowAll] = useState(false);

  return (
    <SafeAreaView
      className={`flex-1 ${
        isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"
      }`}
    >
      <Header />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <TopScreen />

        <View
          className={`w-full rounded-t-[35px] pt-4 mt-[-60px] 
            ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
        >
          <ImgProfile />

          <InitialInformation />
        </View>

        <View className="px-5 pt-5">
          <View className="flex-row items-center justify-between">
            <Text
              className={`text-xl font-bold ${
                isDark
                  ? "text-TextPrimaryColorDarkTheme"
                  : "text-TextSecondaryColorLightTheme"
              }`}
            >
              Minhas Habilidades
            </Text>

            <Pressable onPress={() => setShowAll(true)}>
              <Text
                className={`font-semibold ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
              >
                Ver Todas &gt;
              </Text>
            </Pressable>
          </View>

          <MySkill maxItems={2} />
        </View>
      </ScrollView>

      <AllSkillsModal visible={showAll} onClose={() => setShowAll(false)} />
    </SafeAreaView>
  );
}
