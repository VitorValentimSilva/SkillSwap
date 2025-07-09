import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SkillDisplayCardProps } from "../../types/skill";
import { useVideoPlayer, VideoView } from "expo-video";

interface ModalSkillCardProps {
  visible: boolean;
  skill: SkillDisplayCardProps | null;
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
          className="absolute inset-0 bg-black opacity-50"
          onPress={onClose}
        />

        <View
          className={`rounded-t-2xl p-5 max-h-3/4
            ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
        >
          <View className="border-b-2 gap-1 pb-2 mb-4 border-AccentColor">
            <View className="flex-row items-center justify-between mb-2">
              <Text
                className={`text-2xl font-bold
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              >
                {skill.title}
              </Text>

              <Text
                className={`text-2xl font-bold
                ${isDark ? "text-SecondaryColorDarkTheme" : "text-SecondaryColorLightTheme"}`}
              >
                R${skill.pricePerHour}/h
              </Text>
            </View>

            <Text
              className={`
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              {skill.description}
            </Text>
          </View>

          <ScrollView>
            {skill.videoUrl && (
              <View className="mb-4">
                <Text
                  className={`text-lg font-semibold mb-2 
                  ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
                >
                  Vídeo de Apresentação
                </Text>
                <VideoView
                  style={{ width: "100%", height: 200, borderRadius: 15 }}
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                />
              </View>
            )}

            {skill.credentials && (
              <Text
                className={`mb-2 
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              >
                <Text className="font-semibold">Credenciais: </Text>
                {skill.credentials}
              </Text>
            )}

            <View className="flex-row flex-wrap mb-2 justify-between">
              <Text
                className={`text-base
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              >
                <Text className="font-semibold">Categoria: </Text>
                {skill.category}
              </Text>

              <Text
                className={`text-base
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              >
                <Text className="font-semibold">Nível: </Text>
                {skill.level}
              </Text>
            </View>

            <View className="flex-row flex-wrap mb-2 justify-between">
              <Text
                className={`text-base
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              >
                <Text className="font-semibold">Método: </Text>
                {skill.method}
              </Text>

              {skill.maxStudents && (
                <Text
                  className={`text-base 
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
                >
                  <Text className="font-semibold">Máximo de Alunos: </Text>
                  {skill.maxStudents}
                </Text>
              )}
            </View>

            {skill.packages && (
              <Text
                className={`mb-2 
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              >
                <Text className="font-semibold">Opções Pacotes: </Text>
                {skill.packages}
              </Text>
            )}

            <Text
              className={`font-semibold mb-2 
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              Dias disponíveis:
            </Text>
            <View className="flex-row flex-wrap">
              {skill.availableDays.map((day) => (
                <View
                  key={day}
                  className={`px-3 py-1 rounded-full mr-2 mb-2
                  ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
                >
                  <Text
                    className={`text-sm
                    ${isDark ? "text-SurfaceColorDarkTheme" : "text-SurfaceColorLightTheme"}`}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={onClose}
            className={`mt-4 py-3 rounded-xl
                ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
          >
            <Text
              className={`text-center font-semibold
                ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
