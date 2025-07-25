import React, { useContext } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { colors } from "../../../styles/colors";

interface ConfirmDeleteModalProps {
  visible: boolean;
  skillName?: string;
  confirmLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  visible,
  skillName,
  confirmLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  const { isDark } = useContext(ThemeContext);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            className="absolute inset-0 bg-black opacity-60"
            onPress={onCancel}
          />
          <TouchableWithoutFeedback>
            <View
              className={`rounded-2xl p-5 w-[80%] ${
                isDark
                  ? "bg-SurfaceColorDarkTheme"
                  : "bg-SurfaceColorLightTheme"
              }`}
            >
              <Text
                className={`text-lg font-bold mb-2 ${
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                }`}
              >
                Confirmar Exclusão
              </Text>

              {skillName ? (
                <Text
                  className={`text-base mb-4 ${
                    isDark
                      ? "text-TextSecondaryColorDarkTheme"
                      : "text-TextSecondaryColorLightTheme"
                  }`}
                >
                  Tem certeza de que deseja excluir “{skillName}”? Esta ação não
                  pode ser desfeita.
                </Text>
              ) : (
                <Text
                  className={`text-base mb-4 ${
                    isDark
                      ? "text-TextSecondaryColorDarkTheme"
                      : "text-TextSecondaryColorLightTheme"
                  }`}
                >
                  Tem certeza de que deseja excluir esta habilidade? Esta ação
                  não pode ser desfeita.
                </Text>
              )}

              <View className="flex-row justify-end space-x-4 gap-5">
                <TouchableOpacity
                  onPress={onCancel}
                  className="px-4 py-2 rounded-full border"
                  style={{
                    borderColor: isDark
                      ? colors.TextSecondaryColorDarkTheme
                      : colors.TextSecondaryColorLightTheme,
                  }}
                >
                  <Text
                    className={`font-semibold ${
                      isDark
                        ? "text-TextSecondaryColorDarkTheme"
                        : "text-TextSecondaryColorLightTheme"
                    }`}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onConfirm}
                  disabled={confirmLoading}
                  className="px-4 py-2 rounded-full bg-red-600"
                  activeOpacity={0.8}
                >
                  {confirmLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text className="font-semibold text-white">Excluir</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
