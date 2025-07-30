import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProfileFormData, profileSchema } from "../../schemas/profileSchema";
import Input from "../Form/Input";
import { pickBackgroundImage, pickImage } from "../../utils/pickImage";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

interface EditProfileModalProps {
  visible: boolean;
  initialData: ProfileFormData;
  onSave: (data: ProfileFormData) => Promise<void>;
  onCancel: () => void;
}

export default function EditProfileModal({
  visible,
  initialData,
  onSave,
  onCancel,
}: EditProfileModalProps) {
  const { isDark } = useContext(ThemeContext);
  const [photoUri, setPhotoUri] = useState<string>(initialData.photo);
  const [backgroundImg, setBackgroundImg] = useState<string>(
    initialData.backgroundImage ?? ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    reset(initialData);
    setPhotoUri(initialData.photo);
    setBackgroundImg(initialData.backgroundImage ?? "");
  }, [initialData, reset]);

  const handlePickPhoto = async () => {
    const uri = await pickImage();
    if (uri) {
      setPhotoUri(uri);
      setValue("photo", uri, { shouldValidate: true });
    }
  };

  const handlePickBackground = async () => {
    const uri = await pickBackgroundImage();
    if (uri) {
      setBackgroundImg(uri);
      setValue("backgroundImage", uri, { shouldValidate: true });
    }
  };

  const submit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      await onSave(data);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View className="flex-1 bg-black bg-opacity-30">
        <View className="bg-white overflow-hidden flex-1">
          <View
            className={`flex-row justify-between items-center px-5 pt-2
            ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
          >
            <Text
              className={`text-3xl font-bold mb-4 ${
                isDark
                  ? "text-TextPrimaryColorDarkTheme"
                  : "text-TextPrimaryColorLightTheme"
              }`}
            >
              Editar Perfil
            </Text>
          </View>

          <FormProvider {...methods}>
            <ScrollView
              contentContainerStyle={{ padding: 16 }}
              className={`${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
            >
              <View className="items-center mb-4">
                {photoUri ? (
                  <TouchableOpacity onPress={handlePickPhoto}>
                    <Image
                      source={{ uri: photoUri }}
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handlePickPhoto}
                    className="bg-blue-500 p-3 rounded-full"
                  >
                    <Ionicons name="camera" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
                {errors.photo && (
                  <Text className="text-ErrorColor mt-2">
                    {errors.photo.message}
                  </Text>
                )}
              </View>

              <Input
                name="fullName"
                label="Nome Completo *"
                placeholder="Digite seu nome"
              />

              <Input
                name="address"
                label="Endereço *"
                placeholder="Seu endereço"
              />

              <Input name="city" label="Cidade *" placeholder="Sua cidade" />

              <Input name="country" label="País *" placeholder="Seu país" />

              <Input
                name="bio"
                label="Bio *"
                placeholder="Fale um pouco sobre você"
                multiline
                numberOfLines={5}
              />

              <Input
                name="instagram"
                label="Instagram"
                placeholder="Digite seu arroba do Instagram"
              />

              <Input
                name="gitHub"
                label="GitHub"
                placeholder="Digite seu arroba do Instagram"
              />

              <Input
                name="linkedin"
                label="LinkedIn"
                placeholder="Digite seu arroba do Instagram"
              />

              <Input
                name="twitter"
                label="X (Twitter)"
                placeholder="Digite seu arroba do Instagram"
              />

              <Text
                className={`font-semibold mb-2 ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
              >
                Imagem de Fundo
              </Text>
              <View className="items-center mb-4">
                {backgroundImg ? (
                  <TouchableOpacity onPress={handlePickBackground}>
                    <ImageBackground
                      source={{ uri: backgroundImg }}
                      style={{
                        width: SCREEN_WIDTH - 32,
                        height: 200,
                        borderRadius: 12,
                        overflow: "hidden",
                      }}
                      resizeMode="cover"
                    >
                      <View className="absolute bottom-2 right-2 bg-black bg-opacity-30 rounded-full p-1">
                        <Ionicons name="camera" size={20} color="#fff" />
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handlePickBackground}
                    className="bg-blue-500 p-3 rounded-full"
                  >
                    <Ionicons name="camera" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
                {errors.backgroundImage && (
                  <Text className="text-ErrorColor mt-2">
                    {errors.backgroundImage.message}
                  </Text>
                )}
              </View>
            </ScrollView>

            <View
              className={`flex-row justify-end space-x-4 p-4  gap-10
                ${isDark ? "bg-SurfaceColorDarkTheme" : "bg-SurfaceColorLightTheme"}`}
            >
              <TouchableOpacity
                onPress={() => {
                  reset(initialData);
                  setPhotoUri(initialData.photo);
                  onCancel();
                }}
                className="px-4 py-2 rounded-full border"
                style={{
                  borderColor: isDark
                    ? colors.PrimaryColorDarkTheme
                    : colors.PrimaryColorLightTheme,
                }}
              >
                <Text
                  className={`${isDark ? "text-PrimaryColorDarkTheme" : "text-PrimaryColorLightTheme"}`}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isSaving || isSubmitting || !isDirty}
                onPress={handleSubmit(submit)}
                className={`px-6 py-2 rounded-full flex-row justify-center items-center 
                ${
                  isDark
                    ? "bg-PrimaryColorDarkTheme"
                    : "bg-PrimaryColorLightTheme"
                } 
                ${isSaving ? "opacity-50" : ""}
                ${
                  isSaving || !isDirty
                    ? "opacity-50 pointer-events-none bg-gray-300"
                    : ""
                }`}
              >
                {isSaving ? (
                  <ActivityIndicator
                    size="small"
                    color={
                      isDark
                        ? colors.TextPrimaryColorDarkTheme
                        : colors.TextPrimaryColorLightTheme
                    }
                  />
                ) : (
                  <Text
                    className={`font-semibold ${
                      isDark
                        ? "text-TextPrimaryColorDarkTheme"
                        : "text-TextPrimaryColorLightTheme"
                    }`}
                  >
                    Salvar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </FormProvider>
        </View>
      </View>
    </Modal>
  );
}
