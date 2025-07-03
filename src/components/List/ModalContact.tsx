import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";
import FieldInstructor from "./FieldInstructor";

type Props = {
  visible: boolean;
  onClose: () => void;
  instrutorUid: string;
  title: string;
};

export default function ModalContact({
  visible,
  onClose,
  instrutorUid,
  title,
}: Props) {
  const { isDark } = useContext(ThemeContext);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              className={`rounded-xl w-full px-5 py-4
                ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text
                  className={`text-2xl font-bold
                    ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
                >
                  Instrutor de contato
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  className="w-8 h-8 rounded-full justify-center items-center"
                >
                  <Ionicons
                    name="close"
                    size={28}
                    color={
                      isDark
                        ? colors.PrimaryColorDarkTheme
                        : colors.PrimaryColorLightTheme
                    }
                  />
                </TouchableOpacity>
              </View>

              <FieldInstructor uid={instrutorUid} title={title} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
