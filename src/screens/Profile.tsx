import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Header from "../components/Header";
import TopScreen from "../components/Profile/TopScreen";
import ImgProfile from "../components/Profile/ImgProfile";
import InitialInformation from "../components/Profile/InitialInformation";
import { ThemeContext } from "../contexts/ThemeContext";
import MySkill from "../components/Profile/Skill/MySkill";
import AllSkillsModal from "../components/Profile/Skill/AllSkillsModal";
import HomeTitle from "../components/Home/HomeTitle";
import { useAuth } from "../contexts/AuthContext";
import { useUserProfile } from "../hooks/useUserProfile";
import FieldSocialNetworks from "../components/Profile/FieldSocialNetworks";

export default function Profile() {
  const { isDark } = useContext(ThemeContext);
  const [showAll, setShowAll] = useState(false);
  const { user } = useAuth();
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const { profile, loading } = useUserProfile(user?.uid, reloadTrigger);

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
        <TopScreen profile={profile} loading={loading} />

        <View
          className={`w-full rounded-t-[35px] pt-4 mt-[-60px] 
            ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
        >
          <ImgProfile
            profile={profile}
            loading={loading}
            onReload={() => setReloadTrigger((prev) => prev + 1)}
          />

          <InitialInformation profile={profile} loading={loading} />

          <FieldSocialNetworks />
        </View>

        <View className="pt-5">
          <HomeTitle
            titulo="Minhas Habilidades"
            onPress={() => setShowAll(true)}
          />

          <MySkill maxItems={2} />
        </View>
      </ScrollView>

      <AllSkillsModal visible={showAll} onClose={() => setShowAll(false)} />
    </SafeAreaView>
  );
}
