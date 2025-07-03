import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import { colors } from "../styles/colors";
import { ThemeContext } from "../contexts/ThemeContext";
import Profile from "../screens/Profile";
import TeachSkill from "../screens/TeachSkill";
import LearnSkill from "../screens/LearnSkill";
import Message from "../screens/Message";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { isDark } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark
            ? colors.SurfaceColorDarkTheme
            : colors.SurfaceColorLightTheme,
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
        tabBarLabelStyle: { fontSize: 11 },
        tabBarActiveTintColor: isDark
          ? colors.PrimaryColorDarkTheme
          : colors.PrimaryColorLightTheme,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={
                isDark
                  ? colors.PrimaryColorDarkTheme
                  : colors.PrimaryColorLightTheme
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Aprenda"
        component={LearnSkill}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={22}
              color={
                isDark
                  ? colors.PrimaryColorDarkTheme
                  : colors.PrimaryColorLightTheme
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Ensine"
        component={TeachSkill}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "school" : "school-outline"}
              size={22}
              color={
                isDark
                  ? colors.PrimaryColorDarkTheme
                  : colors.PrimaryColorLightTheme
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Mensagem"
        component={Message}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={22}
              color={
                isDark
                  ? colors.PrimaryColorDarkTheme
                  : colors.PrimaryColorLightTheme
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={22}
              color={
                isDark
                  ? colors.PrimaryColorDarkTheme
                  : colors.PrimaryColorLightTheme
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
