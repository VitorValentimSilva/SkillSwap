import React from "react";
import { View } from "react-native";
import SearchSkills from "./SearchSkills";
import FilterButton from "./FilterButton";

export default function SearchField() {
  return (
    <View className="flex-row items-center pl-1 py-1 w-full">
      <SearchSkills />

      <FilterButton />
    </View>
  );
}
