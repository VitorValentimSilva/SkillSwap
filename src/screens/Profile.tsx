import { SafeAreaView, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import Header from "../components/Header";
import TopScreen from "../components/Profile/TopScreen";
import ImgProfile from "../components/Profile/ImgProfile";

export default function Profile() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <TopScreen />

      <View
        className={`absolute bottom-0 w-full h-[75%] rounded-t-[35px]
        ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"} 
        `}
      >
        <ImgProfile />
      </View>
    </SafeAreaView>
  );
}
