import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import ModalContact from "./ModalContact";

type ListButtonProps = {
  instrutorUid: string;
  title: string;
};

export default function ListButton({ instrutorUid, title }: ListButtonProps) {
  const { isDark } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-col mt-2">
      <View className="flex-row">
        <TouchableOpacity
          className={`flex-1 py-3 rounded-lg items-center mr-2
          ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
        >
          <Text
            className={`font-semibold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            Aprenda agora
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 py-3 rounded-lg items-center bg-BackgroundLightTheme"
          onPress={() => setModalVisible(true)}
        >
          <Text className="font-semibold text-TextPrimaryColorLightTheme">
            Contato
          </Text>
        </TouchableOpacity>
      </View>

      <ModalContact
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        instrutorUid={instrutorUid}
        title={title}
      />
    </View>
  );
}
