import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  GestureResponderEvent,
} from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

interface SocialNetworkProps {
  link: string;
  icon: React.ReactNode;
}

export default function SocialNetwork({ link, icon }: SocialNetworkProps) {
  const { isDark } = useContext(ThemeContext);

  const handlePress = (event: GestureResponderEvent) => {
    Linking.canOpenURL(link)
      .then((supported) => {
        if (supported) {
          Linking.openURL(link);
        } else {
          console.warn("Não foi possível abrir a URL:", link);
        }
      })
      .catch((err) => console.error("Erro ao abrir link:", err));
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className="w-11 h-11 rounded-xl items-center justify-center"
      style={[
        {
          backgroundColor: isDark
            ? colors.TextSecondaryColorDarkTheme
            : colors.TextSecondaryColorLightTheme,
        },
      ]}
    >
      <View>{icon}</View>
    </TouchableOpacity>
  );
}
