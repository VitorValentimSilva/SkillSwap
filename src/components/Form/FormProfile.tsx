import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Image, Text, View } from "react-native";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormData, profileSchema } from "../../schemas/profileSchema";
import { useProfile } from "../../contexts/ProfileContext";
import { pickImage } from "../../utils/pickImage";

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
        className={`p-5 ${isDark ? "bg-BackgroundDarkTheme" : "bg-BackgroundLightTheme"}`}
      >
        <Text className="font-semibold mb-2">Foto de Perfil</Text>
        <View className="mb-4">
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <Button title="Escolher foto" onPress={handlePickPhoto} />
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

        <Input
          name="phone"
          label="Telefone *"
          keyboardType="phone-pad"
          placeholder="+55 (__) _____-____"
        />

        <Input name="city" label="Cidade *" placeholder="Sua cidade" />

        <Input name="country" label="País *" placeholder="Seu país" />

        <Input
          name="bio"
          label="Bio *"
          placeholder="Fale um pouco sobre você"
          multiline
          numberOfLines={3}
        />

        <Button
          title={isSubmitting ? "Enviando..." : "Salvar Perfil"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>
    </FormProvider>
  );
}
