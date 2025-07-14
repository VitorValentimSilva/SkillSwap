import React, { useContext, useState, useCallback } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { fetchAllSkills, deleteSkill } from "../../services/skillService";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import MySkillDisplayCard from "./MySkillDisplayCard";
import { colors } from "../../styles/colors";
import { Skill } from "../../types/skill";
import { unpinVideoFromIPFS } from "../../services/pinFileToIPFS";

interface MySkillProps {
  maxItems?: number;
}

export default function MySkill({ maxItems }: MySkillProps) {
  const { isDark } = useContext(ThemeContext);
  const currentUid = getAuth().currentUser?.uid;

  const [allSkillsLocal, setAllSkillsLocal] = useState<Skill[]>([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSkillsLocal = useCallback(async () => {
    setLocalLoading(true);
    try {
      const docs = await fetchAllSkills();
      setAllSkillsLocal(docs);
      setError(null);
    } catch {
      setError("Não foi possível carregar as habilidades.");
    } finally {
      setLocalLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSkillsLocal();
    }, [loadSkillsLocal])
  );

  const mySkills = allSkillsLocal.filter((s) => s.uid === currentUid);
  const displayedSkills =
    maxItems != null ? mySkills.slice(0, maxItems) : mySkills;

  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeletePress = (skill: Skill) => {
    setSkillToDelete(skill);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!skillToDelete) return;
    setDeleting(true);
    try {
      if (skillToDelete.videoUrl) {
        await unpinVideoFromIPFS(skillToDelete.videoUrl);
      }
      await deleteSkill(skillToDelete.id);
      await loadSkillsLocal();
    } finally {
      setDeleting(false);
      setConfirmVisible(false);
      setSkillToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmVisible(false);
    setSkillToDelete(null);
  };

  if (localLoading) {
    return (
      <ActivityIndicator
        color={
          isDark ? colors.PrimaryColorDarkTheme : colors.PrimaryColorLightTheme
        }
      />
    );
  }
  if (error) {
    return <Text className="text-center text-ErrorColor">{error}</Text>;
  }
  if (mySkills.length === 0) {
    return (
      <Text className="text-center text-TextSecondaryColorDarkTheme">
        Você ainda não cadastrou nenhuma habilidade.
      </Text>
    );
  }

  return (
    <>
      <FlatList
        data={displayedSkills}
        keyExtractor={(item) => item.id}
        scrollEnabled={maxItems == null}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <MySkillDisplayCard
            {...item}
            onDelete={() => handleDeletePress(item)}
          />
        )}
      />

      <ConfirmDeleteModal
        visible={confirmVisible}
        skillName={skillToDelete?.title}
        confirmLoading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
