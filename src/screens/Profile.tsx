import { SafeAreaView, ScrollView, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import Header from "../components/Header";
import TopScreen from "../components/Profile/TopScreen";
import ImgProfile from "../components/Profile/ImgProfile";
import InitialInformation from "../components/Profile/InitialInformation";

export default function Profile() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      className={`flex-1
      ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <Header />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <TopScreen />

        <View
          className={`w-full rounded-t-[35px] pt-4 mt-[-60px]
            ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}
          `}
        >
          <ImgProfile />

          <InitialInformation />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
