import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import LearnNow from "./LearnNow/LearnNow";
import { Skill } from "../../types/skill";

interface ListButtonProps {
  skill: Skill;
}

export default function ListButton({ skill }: ListButtonProps) {
  const { isDark } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="flex-col mt-2">
        <View className="flex-row">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg items-center mr-2
            ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
            onPress={() => setModalVisible(true)}
          >
            <Text
              className={`font-semibold
              ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              Aprenda agora
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 py-3 rounded-lg items-center bg-BackgroundLightTheme">
            <Text className="font-semibold text-TextPrimaryColorLightTheme">
              Mensagem
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <LearnNow
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        skill={skill}
      />
    </>
  );
}
