import { Pressable, SafeAreaView, Text, View } from "react-native";
import Header from "../components/Header";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import HomeButtonComponent from "../components/HomeButtonComponent";
import CategoryComponent from "../components/CategoryComponent";

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

      <View className="gap-2 py-4">
        <View className="flex-row items-center justify-between px-5">
          <Text
            className={`font-bold text-2xl
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            Categorias Populares
          </Text>

          <Pressable>
            <Text
              className={`text-center font-semibold
              ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
            >
              Ver Todas {">"}
            </Text>
          </Pressable>
        </View>

        <CategoryComponent />
      </View>
    </SafeAreaView>
  );
}
