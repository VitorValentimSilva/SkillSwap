import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Image, Pressable, Text, View } from "react-native";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormData, profileSchema } from "../../schemas/profileSchema";
import { useProfile } from "../../contexts/ProfileContext";
import { pickImage } from "../../utils/pickImage";
import { PhoneNumberInput } from "./PhoneNumberInput";

export default function FormProfile() {
  const { isDark } = useContext(ThemeContext);
  const { submitProfile, isSubmitting } = useProfile();
  const [photoUri, setPhotoUri] = useState<string>("");

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      photo: "",
      fullName: "",
      phone: "",
      city: "",
      country: "",
      bio: "",
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const id = await submitProfile(data);
      console.log("Perfil criado com ID:", id);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePickPhoto = async () => {
    const uri = await pickImage();
    if (uri) {
      setPhotoUri(uri);
      setValue("photo", uri, { shouldValidate: true });
    }
  };

  return (
    <FormProvider {...methods}>
      <View
        className={`w-full gap-2 ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
      >
        <Text
          className={`font-semibold mb-2 ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
        >
          Foto de Perfil
        </Text>
        <View className="mb-4">
          {photoUri ? (
            <Pressable onPress={handlePickPhoto}>
              <Image
                source={{ uri: photoUri }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={handlePickPhoto}
              className={`p-3 rounded-md ${
                isDark
                  ? "bg-PrimaryColorLightTheme"
                  : "bg-PrimaryColorDarkTheme"
              }`}
            >
              <Text
                className={`font-semibold ${
                  isDark
                    ? "text-TextPrimaryColorDarkTheme"
                    : "text-TextPrimaryColorLightTheme"
                }`}
              >
                Escolher foto
              </Text>
            </Pressable>
          )}
          {errors.photo && (
            <Text className="text-ErrorColor mt-1">{errors.photo.message}</Text>
          )}
        </View>

        <Input
          name="fullName"
          label="Nome Completo *"
          placeholder="Digite seu nome"
        />

        <PhoneNumberInput name="phone" label="Telefone *" />

        <Input name="city" label="Cidade *" placeholder="Sua cidade" />

        <Input name="country" label="País *" placeholder="Seu país" />

        <Input
          name="bio"
          label="Bio *"
          placeholder="Fale um pouco sobre você"
          multiline
          numberOfLines={5}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className={`p-3 rounded-md
                      ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
        >
          <Text
            className={`text-center font-semibold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            {isSubmitting ? "Enviando..." : "Salvar Perfil"}
          </Text>
        </Pressable>
      </View>
    </FormProvider>
  );
}
