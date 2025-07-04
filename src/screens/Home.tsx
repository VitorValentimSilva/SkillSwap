import { SafeAreaView, View, ScrollView } from "react-native";
import Header from "../components/Header";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import HomeButtonComponent from "../components/HomeButtonComponent";
import CategoryComponent from "../components/Category/CategoryComponent";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../types/tabParamList";
import NearYou from "../components/NearYou";
import HomeTitle from "../components/HomeTitle";

export default function Home() {
  const { isDark } = useContext(ThemeContext);
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
    >
      <Header />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between p-5">
          <HomeButtonComponent
            mode="learn"
            onPress={() =>
              navigation.navigate({ name: "Aprenda", params: { category: "" } })
            }
          />
          <HomeButtonComponent
            mode="teach"
            onPress={() => navigation.navigate("Ensine")}
          />
        </View>

        <View className="gap-2 py-4">
          <HomeTitle titulo="Categorias Populares" />
          <CategoryComponent />
        </View>

        <View className="gap-2">
          <HomeTitle titulo="Perto de você (25km)" />
          <NearYou />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
