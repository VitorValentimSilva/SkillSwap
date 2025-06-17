import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

type Props = {
  name: string;
  label?: string;
};

export function PhoneNumberInput({ name, label }: Props) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<{ [key: string]: string }>();

  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const value = watch(name);
  const { isDark } = useContext(ThemeContext);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "Telefone é obrigatório",
        validate: (v: string) => v.length >= 8 || "Telefone inválido",
      }}
      render={({ field: { onChange } }) => (
        <View className="w-full mb-4">
          {label && (
            <Text
              className={`font-semibold mb-1 ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
            >
              {label}
            </Text>
          )}
          <PhoneInput
            value={value}
            defaultCountry="BR"
            selectedCountry={selectedCountry}
            onChangePhoneNumber={(num) => onChange(num)}
            onChangeSelectedCountry={(c) => setSelectedCountry(c)}
            placeholder="Digite seu telefone"
            modalSearchInputPlaceholder="Pesquise seu país"
            modalNotFoundCountryMessage="Desculpe, país não encontrado"
            modalHeight="60%"
            phoneInputStyles={{
              container: {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
                height: 36,
              },
              flagContainer: {
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7,
                backgroundColor: "transparent",
                justifyContent: "center",
              },
              flag: {},
              caret: {
                color: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
                fontSize: 16,
              },
              divider: {
                backgroundColor: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
              },
              callingCode: {
                fontSize: 16,
                fontWeight: "bold",
                color: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
              },
              input: {
                color: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
              },
            }}
            modalStyles={{
              modal: {
                backgroundColor: isDark
                  ? colors.BackgroundDarkTheme
                  : colors.BackgroundLightTheme,
                borderWidth: 1,
              },
              backdrop: {},
              divider: {
                backgroundColor: "transparent",
              },
              countriesList: {},
              searchInput: {
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
                color: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
                backgroundColor: isDark
                  ? colors.SurfaceColorDarkTheme
                  : colors.SurfaceColorLightTheme,
                paddingHorizontal: 12,
                height: 46,
              },
              countryButton: {
                borderWidth: 1,
                borderColor: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
                backgroundColor: isDark
                  ? colors.TextSecondaryColorLightTheme
                  : colors.TextSecondaryColorDarkTheme,
                marginVertical: 4,
                paddingVertical: 0,
              },
              noCountryText: {},
              noCountryContainer: {},
              callingCode: {
                color: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
              },
              countryName: {
                color: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
              },
            }}
          />
          {errors[name] && (
            <Text className="text-ErrorColor text-sm mt-1">
              {errors[name]?.message as string}
            </Text>
          )}
        </View>
      )}
    />
  );
}
