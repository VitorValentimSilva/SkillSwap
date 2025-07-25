import React, { useContext } from "react";
import { Modal, SafeAreaView, View, Pressable, Text } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import MySkill from "./MySkill";

interface AllSkillsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AllSkillsModal({
  visible,
  onClose,
}: AllSkillsModalProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView
        className={`flex-1 ${
          isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"
        }`}
      >
        <View className="px-5 pt-5 flex-row justify-between items-center">
          <Text
            className={`text-xl font-bold ${
              isDark
                ? "text-TextPrimaryColorDarkTheme"
                : "text-TextSecondaryColorLightTheme"
            }`}
          >
            Todas as Minhas Habilidades
          </Text>
          <Pressable onPress={onClose}>
            <Text
              className={`font-semibold ${isDark ? "text-ErrorColor" : "text-ErrorColor"}`}
            >
              Fechar
            </Text>
          </Pressable>
        </View>

        <View className="px-5 pt-2 pb-12">
          <MySkill />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
