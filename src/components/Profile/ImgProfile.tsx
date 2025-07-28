import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import EditProfileModal from "./EditProfileModal";
import { updateProfile } from "../../services/profileService";
import { ProfileFormData } from "../../schemas/profileSchema";

interface ImgProfileProps {
  profile: ProfileFormData | null;
  loading: boolean;
  onReload: () => void;
}

export default function ImgProfile({
  profile,
  loading,
  onReload,
}: ImgProfileProps) {
  const { user } = useAuth();
  const { isDark } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View className="items-center justify-center mt-[-40px]">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!profile) return null;

  const handleSave = async (updatedData: ProfileFormData) => {
    if (!user?.uid) return;

    try {
      await updateProfile(user.uid, updatedData);
      onReload();
    } catch (e) {
      console.error("Erro ao salvar perfil:", e);
      Alert.alert(
        "Erro",
        "Falha ao salvar perfil. Tente novamente mais tarde."
      );
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <>
      <View className="items-center justify-center mt-[-40px]">
        <Image
          source={{ uri: profile.photo }}
          className={`w-36 h-36 rounded-full border-4 
            ${isDark ? "border-BackgroundDarkTheme" : "border-BackgroundLightTheme"} `}
          resizeMode="cover"
        />
      </View>

      <View className="flex-row justify-end mt-[-40px] pr-5">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className={`p-2 rounded-full
            ${isDark ? "bg-PrimaryColorDarkTheme" : "bg-PrimaryColorLightTheme"}`}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <EditProfileModal
        visible={modalVisible}
        initialData={profile}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
}
