import React, { useContext, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { TextInput } from "react-native";
import { colors } from "../../../styles/colors";

interface Props {
  visible: boolean;
  onSave: (time: string) => void;
  onCancel: () => void;
}

export default function TimePickerModal({ visible, onSave, onCancel }: Props) {
  const [raw, setRaw] = useState("");
  const [formatted, setFormatted] = useState("");
  const { isDark } = useContext(ThemeContext);

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "");
    const limited = digits.slice(0, 4);
    setRaw(limited);

    if (limited.length <= 2) {
      setFormatted(limited);
    } else {
      setFormatted(`${limited.slice(0, 2)}:${limited.slice(2)}`);
    }
  };

  const isValid = /^([01]\d|2[0-3]):([0-5]\d)$/.test(formatted);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View className="flex-1 bg-black opacity-60" />
      </TouchableWithoutFeedback>

      <View className="absolute inset-0 justify-center items-center">
        <View
          className={`w-[90%] p-4 rounded-lg shadow-lg
          ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
        >
          <Text
            className={`font-semibold mb-2
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            Digite o horário (HH:MM):
          </Text>

          <TextInput
            value={formatted}
            onChangeText={handleChange}
            placeholder="Ex: 14:30"
            className={`border p-2 rounded mb-4
            ${isDark ? "border-TextPrimaryColorDarkTheme text-TextPrimaryColorDarkTheme" : "border-TextPrimaryColorLightTheme text-TextPrimaryColorLightTheme"}`}
            placeholderTextColor={
              isDark
                ? colors.TextPrimaryColorDarkTheme
                : colors.TextPrimaryColorLightTheme
            }
            keyboardType="numeric"
            maxLength={5}
          />

          {!isValid && formatted.length === 5 && (
            <Text className="text-ErrorColor mb-2">Horário inválido</Text>
          )}

          <View className="flex-row justify-end space-x-4 gap-10">
            <TouchableOpacity
              onPress={() => {
                setRaw("");
                setFormatted("");
                onCancel();
              }}
            >
              <Text className="text-blue-500">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!isValid}
              onPress={() => {
                onSave(formatted);
                setRaw("");
                setFormatted("");
              }}
            >
              <Text className={`text-blue-500 ${!isValid ? "opacity-50" : ""}`}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
