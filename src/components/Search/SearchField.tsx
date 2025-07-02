import React from "react";
import { View } from "react-native";
import SearchSkills from "./SearchSkills";
import FilterButton from "./FilterButton";

interface SearchFieldProps {
  onPressFilter: () => void;
}

export default function SearchField({ onPressFilter }: SearchFieldProps) {
  return (
    <View className="flex-row items-center pl-1 py-1 w-full">
      <SearchSkills />

      <FilterButton onPressFilter={onPressFilter} />
    </View>
  );
}
