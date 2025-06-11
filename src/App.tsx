import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./styles/global.css";

export default function App() {
  return (
    <View className="container flex-1 items-center justify-center bg-red-500">
      <Text className="">Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
