import {
  TextInput as RNTextInput,
  Text,
  View,
  TextInputProps,
} from "react-native";
import { useFormContext, useController } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
} & TextInputProps;

export default function Input({ name, label, ...props }: Props) {
  const { control, setValue } = useFormContext();
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });

  const handleChangeText = (text: string) => {
    if (name === "data") {
      const cleaned = text.replace(/\D/g, "");
      const day = cleaned.slice(0, 2);
      const month = cleaned.slice(2, 4);
      const year = cleaned.slice(4, 8);
      let formatted = day;
      if (month) formatted += `/${month}`;
      if (year) formatted += `/${year}`;
      setValue(name, formatted);
    } else {
      onChange(text);
    }
  };

  return (
    <View className="mb-4">
      {label && <Text className="text-base font-semibold mb-1">{label}</Text>}

      <RNTextInput
        className="border border-gray-300 rounded px-3 py-2"
        value={value}
        onChangeText={handleChangeText}
        onBlur={onBlur}
        maxLength={name === "data" ? 10 : undefined}
        keyboardType={name === "valor" ? "decimal-pad" : props.keyboardType}
        placeholder={props.placeholder}
        {...props}
      />

      {error && (
        <Text className="text-red-500 text-base mt-1">{error.message}</Text>
      )}
    </View>
  );
}
