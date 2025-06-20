import React, { ReactNode, useContext } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFormContext, useController } from "react-hook-form";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

export type Option = { label: string; value: string };

type SelectInputProps = {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
};

export default function SelectInput({
  name,
  label,
  options,
  placeholder = "Selecione...",
}: SelectInputProps) {
  const { isDark } = useContext(ThemeContext);
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const {
    field: { value },
  } = useController({
    name,
    control,
    rules: { required: `${label.replace("*", "").trim()} é obrigatório` },
  });

  const borderColor = isDark
    ? "border-TextPrimaryColorDarkTheme"
    : "border-TextPrimaryColorLightTheme";

  const textColor = isDark
    ? colors.TextPrimaryColorDarkTheme
    : colors.TextPrimaryColorLightTheme;

  return (
    <View className="mb-4">
      <Text
        className={`text-base font-semibold mb-1 ${
          isDark
            ? "text-TextPrimaryColorDarkTheme"
            : "text-TextPrimaryColorLightTheme"
        }`}
      >
        {label}
      </Text>

      <View className={`border rounded-md h-10 justify-center ${borderColor}`}>
        <Picker
          selectedValue={value}
          onValueChange={(v) => {
            setValue(name, v);
            trigger(name);
          }}
          style={{ color: textColor }}
          dropdownIconColor={textColor}
        >
          <Picker.Item label={placeholder} value="" />
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>

      {errors[name] && (
        <Text className="text-ErrorColor mt-1">
          {errors[name]?.message as ReactNode}
        </Text>
      )}
    </View>
  );
}
