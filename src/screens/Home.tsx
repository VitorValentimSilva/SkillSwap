import { SafeAreaView, View } from "react-native";
import Header from "../components/Header";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import HomeButtonComponent from "../components/HomeButtonComponent";

export default function Home() {
  const { isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      className={`flex-1 ${
        isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"
      }`}
    >
      <Header />

      <View className="flex-row items-center justify-between p-5">
        <HomeButtonComponent
          mode="learn"
          onPress={() => console.log("Learn pressed")}
        />
        <HomeButtonComponent
          mode="teach"
          onPress={() => console.log("Teach pressed")}
        />
      </View>
    </SafeAreaView>
  );
}
