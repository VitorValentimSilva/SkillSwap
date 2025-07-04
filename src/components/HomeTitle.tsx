import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

interface HomeTitleProps {
  titulo: string;
}

export default function HomeTitle({ titulo }: HomeTitleProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="flex-row items-center justify-between px-5">
      <Text
        className={`font-bold text-2xl
                    ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        {titulo}
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
  );
}
