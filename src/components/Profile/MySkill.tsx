import React, { useContext, useState } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { deleteSkill } from "../../services/skillService";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import MySkillDisplayCard from "./MySkillDisplayCard";
import { colors } from "../../styles/colors";
import { Skill } from "../../types/skill";
import { unpinVideoFromIPFS } from "../../services/pinFileToIPFS";
import EditSkillModal from "./EditSkillModal";
import { useEditSkill } from "../../hooks/useEditSkill";
import { EditSkillContext } from "../../contexts/EditSkillContext";
import { useSkills } from "../../hooks/useSkills";

interface MySkillProps {
  maxItems?: number;
}

export default function MySkill({ maxItems }: MySkillProps) {
  const { isDark } = useContext(ThemeContext);
  const { skills, loading, error, removeSkill, loadSkills } = useSkills();
  const currentUid = getAuth().currentUser?.uid;
  const { skillToEdit, openForEdit, closeEdit } = useContext(EditSkillContext);
  const { editSkill } = useEditSkill();
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const mySkills = skills.filter((s) => s.uid === currentUid);
  const displayed = maxItems != null ? mySkills.slice(0, maxItems) : mySkills;

  useFocusEffect(
    React.useCallback(() => {
      loadSkills();
    }, [loadSkills])
  );

  const handleConfirmDelete = async () => {
    if (!skillToDelete) return;
    setDeleting(true);
    try {
      if (skillToDelete.videoUrl) {
        await unpinVideoFromIPFS(skillToDelete.videoUrl);
      }
      await deleteSkill(skillToDelete.id);
      await loadSkills();
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

  if (loading) {
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
        data={displayed}
        keyExtractor={(item) => item.id}
        scrollEnabled={maxItems == null}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <MySkillDisplayCard
            {...item}
            onDelete={() => removeSkill(item).then(loadSkills)}
            onEdit={() => openForEdit(item)}
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

      <EditSkillModal
        visible={!!skillToEdit}
        skill={skillToEdit}
        onSave={async (updated) => {
          console.log("Atualizando skill:", skillToEdit, updated);
          if (!skillToEdit) return;
          await editSkill(skillToEdit.id, updated);
          closeEdit();
          loadSkills();
        }}
        onCancel={() => {
          closeEdit();
        }}
      />
    </>
  );
}
