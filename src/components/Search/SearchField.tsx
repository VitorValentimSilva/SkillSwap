import React from "react";
import { View } from "react-native";
import SearchSkills from "./SearchSkills";
import FilterButton from "./FilterButton";

interface SearchFieldProps {
  searchQuery: string;
  onSearchChange: (t: string) => void;
  onPressFilter: () => void;
}

export default function SearchField({
  searchQuery,
  onSearchChange,
  onPressFilter,
}: SearchFieldProps) {
  return (
    <View className="flex-row items-center pl-1 py-1 w-full">
      <SearchSkills value={searchQuery} onChangeText={onSearchChange} />

      <FilterButton onPressFilter={onPressFilter} />
    </View>
  );
}
