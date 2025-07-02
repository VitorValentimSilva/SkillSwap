import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";
import Section from "./Section";
import { FILTER_OPTIONS, EMPTY_FILTERS } from "../../utils/constants";
import { FiltersState, FilterKeys } from "../../types/filters";

interface FiltersProps {
  visible: boolean;
  onClose: () => void;
  selectedFilters: FiltersState;
  onChangeFilters: (newFilters: FiltersState) => void;
}

export default function Filters({
  visible,
  onClose,
  selectedFilters,
  onChangeFilters,
}: FiltersProps) {
  const { isDark } = useContext(ThemeContext);
  const screenHeight = Dimensions.get("window").height;
  const [localFilters, setLocalFilters] =
    useState<FiltersState>(selectedFilters);

  useEffect(() => {
    if (visible) setLocalFilters(selectedFilters);
  }, [visible, selectedFilters]);

  const handleToggle = (group: FilterKeys, item: string) => {
    setLocalFilters((prev) => {
      const arr = prev[group];
      const updated = arr.includes(item)
        ? arr.filter((i) => i !== item)
        : [...arr, item];
      return { ...prev, [group]: updated };
    });
  };

  const applyFilters = () => {
    onChangeFilters(localFilters);
    onClose();
  };

  const clearFilters = () => {
    onChangeFilters(EMPTY_FILTERS);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <TouchableOpacity
          className="flex-1 bg-black opacity-60"
          onPress={onClose}
        />

        <View
          className={`
            w-full
            rounded-t-2xl
            px-7 pt-5 pb-7
            ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}
          `}
          style={{ height: screenHeight * 0.75 }}
        >
          <View className="flex-row justify-between items-center mb-4 border-b border-white pb-4">
            <Text
              className={`
                text-3xl font-bold
                ${
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                }
              `}
            >
              Filtros
            </Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Ionicons
                name="close"
                size={30}
                color={
                  isDark
                    ? colors.TextPrimaryColorDarkTheme
                    : colors.TextPrimaryColorLightTheme
                }
              />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            {(Object.keys(FILTER_OPTIONS) as FilterKeys[]).map((key) => (
              <Section
                key={key}
                title={key.charAt(0).toUpperCase() + key.slice(1)}
                items={FILTER_OPTIONS[key]}
                selectedItems={localFilters[key]}
                onToggleItem={(item) => handleToggle(key, item)}
              />
            ))}
          </ScrollView>

          <View className="flex-row justify-between mt-4 gap-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg items-center"
              style={{
                backgroundColor: isDark
                  ? colors.PrimaryColorDarkTheme
                  : colors.PrimaryColorLightTheme,
              }}
              onPress={applyFilters}
            >
              <Text
                className={`text-base font-semibold $
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                `}
              >
                Aplicar Filtros
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-lg items-center"
              style={{
                backgroundColor: colors.ErrorColor,
              }}
              onPress={clearFilters}
            >
              <Text
                className={`font-semibold $
                  isDark
                    ? "text-SurfaceColorDarkTheme"
                    : "text-SurfaceColorLightTheme"
                `}
              >
                Limpar Filtros
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
