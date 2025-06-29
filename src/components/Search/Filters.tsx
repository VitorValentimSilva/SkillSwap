import React, { useContext } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";
import Section from "./Section";

const filters = {
  categoria: ["Music", "Languages", "Arts", "Cooking", "Technology", "Sports"],
  dificuldade: ["Beginner", "Intermediate", "Advanced"],
  localizacao: ["Online", "In-person", "Both"],
  formatar: ["1-on-1", "Group", "Workshop"],
};

interface FiltersProps {
  visible: boolean;
  onClose: () => void;
}

export default function Filters({ visible, onClose }: FiltersProps) {
  const { isDark } = useContext(ThemeContext);
  const screenHeight = Dimensions.get("window").height;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <TouchableOpacity
          className="flex-1 bg-black opacity-60"
          onPress={onClose}
        />

        <View
          className={`
            w-full
            rounded-t-2xl
            px-7 pt-5 pb-7
            ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}
          `}
          style={{ height: screenHeight * 0.75 }}
        >
          <View className="flex-row justify-between items-center mb-4 border-b border-white pb-4">
            <Text
              className={`
                text-3xl font-bold
                ${
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                }
              `}
            >
              Filtros
            </Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Ionicons
                name="close"
                size={30}
                color={
                  isDark
                    ? colors.TextPrimaryColorDarkTheme
                    : colors.TextPrimaryColorLightTheme
                }
              />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            <Section title="Categoria" items={filters.categoria} />
            <Section title="Dificuldade" items={filters.dificuldade} />
            <Section title="Localização" items={filters.localizacao} />
            <Section title="Formatar" items={filters.formatar} />
          </ScrollView>

          <TouchableOpacity
            className={`py-3 rounded-lg mt-4 items-center
                ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
            onPress={onClose}
          >
            <Text
              className={`
                text-base font-semibold
                ${
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                }
              `}
            >
              Aplicar Filtros
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
