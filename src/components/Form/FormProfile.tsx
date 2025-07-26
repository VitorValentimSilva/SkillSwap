import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormData, profileSchema } from "../../schemas/profileSchema";
import { pickImage } from "../../utils/pickImage";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { isUserNameTaken } from "../../hooks/useUserProfile";

type FormProfileProps = {
  onSubmit: (data: ProfileFormData) => Promise<void>;
};

export default function FormProfile({ onSubmit }: FormProfileProps) {
  const { isDark } = useContext(ThemeContext);
  const [photoUri, setPhotoUri] = useState<string>("");
  const [userNameTaken, setUserNameTaken] = useState(false);

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      photo: "",
      userName: "",
      fullName: "",
      phone: "",
      address: "",
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

  const handlePickPhoto = async () => {
    const uri = await pickImage();
    if (uri) {
      setPhotoUri(uri);
      setValue("photo", uri, { shouldValidate: true });
    }
  };

  const checkUserName = async (userName: string) => {
    if (userName.length < 6) return;
    const exists = await isUserNameTaken(userName);
    setUserNameTaken(exists);
    if (exists) {
      methods.setError("userName", {
        type: "manual",
        message: "Este nome de usuário já está em uso",
      });
    }
  };

  const handleSubmitProfile = async (data: ProfileFormData) => {
    const exists = await isUserNameTaken(data.userName.trim());
    if (exists) {
      methods.setError("userName", {
        type: "manual",
        message: "Este nome de usuário já está em uso",
      });
      return;
    }

    await onSubmit(data);
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
          name="userName"
          label="Nome de Usuário *"
          placeholder="Digite seu nome de usuário"
          onBlur={async (e) => {
            const value = e.nativeEvent.text.trim();
            await checkUserName(value);
          }}
        />
        {userNameTaken && (
          <Text className="text-ErrorColor mt-1">
            Este nome de usuário já está em uso
          </Text>
        )}

        <Input
          name="fullName"
          label="Nome Completo *"
          placeholder="Digite seu nome"
        />

        <PhoneNumberInput name="phone" label="Telefone *" />

        <Input name="address" label="Endereço *" placeholder="Seu endereço" />

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
          onPress={handleSubmit(handleSubmitProfile)}
          className={`p-3 rounded-md
          ${isDark ? "bg-PrimaryColorLightTheme" : "bg-PrimaryColorDarkTheme"}`}
        >
          <Text
            className={`text-center font-semibold
            ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            {methods.formState.isSubmitting ? "Enviando..." : "Salvar Perfil"}
          </Text>
        </Pressable>
      </View>
    </FormProvider>
  );
}
