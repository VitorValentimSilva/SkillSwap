import { View } from "react-native";
import Category from "./Category";

export default function CategoryComponent() {
  return (
    <View className="flex-row items-center justify-between flex-wrap px-2">
      <Category
        name="Música"
        iconName="musical-notes-outline"
        iconBgColor="#e53e3e5a"
        iconColor="#E53E3E"
      />
      <Category
        name="Programação"
        iconName="code-slash-outline"
        iconBgColor="#38b2ac55"
        iconColor="#38B2AC"
      />
      <Category
        name="Arte"
        iconName="color-palette-outline"
        iconBgColor="#4299e14e"
        iconColor="#4299E1"
      />

      <Category
        name="Culinária"
        iconName="restaurant-outline"
        iconBgColor="#68d39142"
        iconColor="#68D391"
      />
      <Category
        name="Fotografia"
        iconName="camera-outline"
        iconBgColor="#d69e2e49"
        iconColor="#D69E2E"
      />
      <Category
        name="Idiomas"
        iconName="language-outline"
        iconBgColor="#9f7aea55"
        iconColor="#9F7AEA"
      />
    </View>
  );
}
