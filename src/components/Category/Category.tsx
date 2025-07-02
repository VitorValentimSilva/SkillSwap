import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TabParamList } from "../../types/tabParamList";

type CategoryProps = {
  name: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  iconBgColor: string;
  iconColor?: string;
};

export default function Category({
  name,
  iconName,
  iconBgColor,
  iconColor,
}: CategoryProps) {
  const { isDark } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<TabParamList>>();

  const handlePress = () => {
    navigation.navigate("Aprenda", { category: name });
  };

  return (
    <Pressable className="w-1/3 aspect-square p-3" onPress={handlePress}>
      <View
        className={`
          flex-1
          rounded-3xl
          items-center
          justify-center
          ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}
        `}
      >
        <View
          className="w-12 h-12 rounded-full items-center justify-center mb-2"
          style={{ backgroundColor: iconBgColor }}
        >
          <Ionicons name={iconName} size={24} color={iconColor} />
        </View>
        <Text
          className={`text-center text-sm font-medium
          ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
}
