import { Pressable, Text, View } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

interface HomeTitleProps {
  titulo: string;
  onPress?: () => void;
}

export default function HomeTitle({ titulo, onPress }: HomeTitleProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View className="flex-row items-center justify-between px-5">
      <Text
        className={`font-bold text-2xl
        ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
      >
        {titulo}
      </Text>

      {onPress && (
        <Pressable onPress={onPress}>
          <Text
            className={`text-center font-semibold ${
              isDark
                ? "text-PrimaryColorDarkTheme"
                : "text-PrimaryColorLightTheme"
            }`}
          >
            Ver Todas {">"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
