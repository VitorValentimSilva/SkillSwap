import React, { useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import SkillDisplayCard from "./SkillDisplayCard";
import { getAuth } from "firebase/auth";
import ModalSkillCard from "./ModalSkillCard";
import { Skill } from "../../types/skill";

interface ListSkillsProps {
  skills: Skill[];
}

export default function ListSkills({ skills }: ListSkillsProps) {
  const { isDark } = useContext(ThemeContext);
  const currentUid = getAuth().currentUser?.uid;

  const visible = skills.filter((s) => s.uid !== currentUid);
  const [selected, setSelected] = useState<Skill | null>(null);

  if (!visible.length) {
    return (
      <Text
        className={`text-center mt-8 ${
          isDark
            ? "text-TextPrimaryColorDarkTheme"
            : "text-TextSecondaryColorLightTheme"
        }`}
      >
        Nenhuma habilidade encontrada.
      </Text>
    );
  }

  return (
    <>
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 65 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)}>
            <SkillDisplayCard {...item} />
          </TouchableOpacity>
        )}
      />

      <ModalSkillCard
        visible={!!selected}
        skill={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
