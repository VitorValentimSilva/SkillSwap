import React, { useContext, useState } from "react";
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import SkillDisplayCard from "../List/SkillDisplayCard";
import { colors } from "../../styles/colors";
import { useNearbySkillsByCity } from "../../hooks/useNearbySkillsByCity";
import ModalSkillCard from "../List/ModalSkillCard";
import { Skill } from "../../types/skill";
import { Ionicons } from "@expo/vector-icons";

interface ModalAllNearYouProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalAllNearYou({
  visible,
  onClose,
}: ModalAllNearYouProps) {
  const { isDark } = useContext(ThemeContext);
  const { nearbySkills, loading, error } = useNearbySkillsByCity();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className={`flex-1 ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
      >
        <View
          className="flex-row justify-between items-center px-4 py-3 border-b"
          style={{
            borderColor: isDark
              ? colors.SurfaceColorDarkTheme
              : colors.SurfaceColorLightTheme,
          }}
        >
          <Text
            className={`text-2xl font-bold ${
              isDark
                ? "text-TextPrimaryColorDarkTheme"
                : "text-TextPrimaryColorLightTheme"
            }`}
          >
            Habilidades na sua cidade
          </Text>
          <TouchableOpacity onPress={onClose} className="p-2">
            <Ionicons name="close" size={28} color={colors.ErrorColor} />
          </TouchableOpacity>
        </View>

        {loading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator
              size="large"
              color={
                isDark
                  ? colors.PrimaryColorDarkTheme
                  : colors.PrimaryColorLightTheme
              }
            />
          </View>
        )}
        {error && !loading && (
          <Text className="text-center mt-4 text-ErrorColor">{error}</Text>
        )}
        {!loading && !error && nearbySkills.length === 0 && (
          <Text
            className={`text-center mt-4 ${
              isDark
                ? "text-TextSecondaryColorDarkTheme"
                : "text-TextSecondaryColorLightTheme"
            }`}
          >
            Nenhuma habilidade encontrada.
          </Text>
        )}

        {!loading && !error && nearbySkills.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
          >
            {nearbySkills.map((skill) => (
              <TouchableOpacity
                key={skill.id}
                onPress={() => setSelectedSkill(skill)}
                className="w-full mb-4"
              >
                <SkillDisplayCard {...skill} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <ModalSkillCard
          visible={!!selectedSkill}
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      </View>
    </Modal>
  );
}
