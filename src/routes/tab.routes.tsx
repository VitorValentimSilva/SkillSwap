import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

function CustomHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View>
      <Text className="font-bold text-[22px]">{title}</Text>
      {subtitle && (
        <Text className="texte-[14px] text-gray-600">{subtitle}</Text>
      )}
    </View>
  );
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 10, // cor da sombra no Android
          shadowColor: "#000", // cor da sombra no iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          elevation: 10, // Android
          shadowColor: "#000", // iOS
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
          headerTitle: () => <CustomHeader title="Início" subtitle="Início" />,
        }}
      />
    </Tab.Navigator>
  );
}
