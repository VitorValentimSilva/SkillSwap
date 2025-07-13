import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Skill } from "../../types/skill";
import { useVideoPlayer, VideoView } from "expo-video";
import { colors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import InfoCard from "./InfoCard";
import DetailSection from "./DetailSection";

interface ModalSkillCardProps {
  visible: boolean;
  skill: Skill | null;
  onClose: () => void;
}

export default function ModalSkillCard({
  visible,
  skill,
  onClose,
}: ModalSkillCardProps) {
  const { isDark } = useContext(ThemeContext);
  const player = useVideoPlayer(
    skill && skill.videoUrl ? skill.videoUrl : "",
    (player) => {
      player.loop = true;
    }
  );

  if (!skill) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <TouchableOpacity
          className="absolute inset-0 bg-black opacity-60"
          onPress={onClose}
        />

        <View
          className={`rounded-t-3xl pb-6 max-h-[90%] shadow-xl elevation-[100] z-[100]
            ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
        >
          <View
            className={`flex-row items-center justify-between mb-2 flex-wrap px-6 py-4
            ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
          >
            <Text
              className={`text-2xl font-bold flex-1 mr-4
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {skill.title}
            </Text>

            <View
              className={`px-4 py-1 rounded-full flex-shrink-0
              ${isDark ? "bg-BackgroundLightTheme" : "bg-BackgroundDarkTheme"}`}
            >
              <Text
                className={`text-xl font-bold
                  ${isDark ? "text-PrimaryColorLightTheme" : "text-PrimaryColorDarkTheme"}`}
              >
                R${skill.pricePerHour}/h
              </Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="px-6">
            <Text
              className={`text-base mb-4
              ${isDark ? "text-TextSecondaryColorDarkTheme" : "text-TextSecondaryColorLightTheme"}`}
            >
              {skill.description}
            </Text>

            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <View
                  className={`w-1 h-5 rounded-full mr-2
                    ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
                />
                <Text
                  className={`text-lg font-semibold
                    ${isDark ? "text-BackgroundLightTheme" : "text-BackgroundDarkTheme"}`}
                >
                  Detalhes
                </Text>
              </View>

              <View className="grid grid-cols-2 gap-4">
                <InfoCard title="Categoria" value={skill.category} />

                <InfoCard title="Nível" value={skill.level} />

                <InfoCard title="Método" value={skill.method} />

                {skill.maxStudents && (
                  <InfoCard
                    title="Máx. Alunos"
                    value={skill.maxStudents.toString()}
                  />
                )}
              </View>
            </View>

            {skill.videoUrl && (
              <View className="mb-6" style={{ zIndex: 1 }}>
                <View className="flex-row items-center mb-3">
                  <View
                    className={`w-1 h-5 rounded-full mr-2
                      ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
                  />
                  <Text
                    className={`text-lg font-semibold
                      ${isDark ? "text-BackgroundLightTheme" : "text-BackgroundDarkTheme"}`}
                  >
                    Vídeo de Apresentação
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <VideoView
                    style={{
                      width: "100%",
                      height: 200,
                    }}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                  />
                </View>
              </View>
            )}

            {skill.credentials && (
              <DetailSection
                title="Credenciais"
                content={skill.credentials}
                icon="medal-outline"
              />
            )}

            {skill.packages && (
              <DetailSection
                title="Pacotes"
                content={skill.packages.join(", ")}
                icon="gift-outline"
              />
            )}

            <View className="mb-6">
              <View className="flex-row items-center mb-3">
                <View
                  className={`w-1 h-5 rounded-full mr-2
                     ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
                />
                <Text
                  className={`text-lg font-semibold
                    ${isDark ? "text-BackgroundLightTheme" : "text-BackgroundDarkTheme"}`}
                >
                  Dias Disponíveis
                </Text>
              </View>

              <View className="flex-row flex-wrap">
                {skill.availableDays.map((day) => (
                  <View
                    key={day}
                    className={`px-4 py-2 rounded-2xl mr-3 mb-3 shadow-sm
                      ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
                  >
                    <Text
                      className={`font-medium
                        ${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
                    >
                      {day}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="flex-col">
            <View className="flex-row pr-6 space-x-2">
              <TouchableOpacity
                onPress={onClose}
                className={`flex-1 py-4 mx-6 rounded-xl flex-row items-center justify-center shadow
              ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={
                    isDark
                      ? colors.BackgroundLightTheme
                      : colors.BackgroundDarkTheme
                  }
                />
                <Text
                  className={`text-center font-bold ml-2
               ${isDark ? "text-BackgroundLightTheme" : "text-BackgroundDarkTheme"}`}
                >
                  Fechar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-4 rounded-xl flex-row items-center justify-center shadow
                    ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
              >
                <Text
                  className={`font-semibold
                      ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
                >
                  Aprenda agora
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
