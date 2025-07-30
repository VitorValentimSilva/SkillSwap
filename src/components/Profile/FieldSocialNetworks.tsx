import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import SocialNetwork from "./SocialNetworks";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";

export default function FieldSocialNetworks() {
  const { isDark } = useContext(ThemeContext);
  const { user } = useAuth();
  const { profile, loading } = useUserProfile(user?.uid);

  if (loading) {
    return <ActivityIndicator size="small" />;
  }
  if (!profile) {
    return null;
  }

  const networks: {
    field: keyof typeof profile;
    iconName: React.ComponentProps<typeof Ionicons>["name"];
    urlPrefix: string;
  }[] = [
    {
      field: "instagram",
      iconName: "logo-instagram",
      urlPrefix: "https://www.instagram.com/",
    },
    {
      field: "gitHub",
      iconName: "logo-github",
      urlPrefix: "https://github.com/",
    },
    {
      field: "linkedin",
      iconName: "logo-linkedin",
      urlPrefix: "https://www.linkedin.com/in/",
    },
    {
      field: "twitter",
      iconName: "logo-twitter",
      urlPrefix: "https://twitter.com/",
    },
  ];

  return (
    <View className="m-auto py-3 flex-row items-center gap-10">
      {networks
        .filter(({ field }) => {
          const value = profile[field];
          return typeof value === "string" && value.trim().length > 0;
        })
        .map(({ field, iconName, urlPrefix }) => {
          const username = profile[field].trim();
          const fullLink = urlPrefix + username;
          return (
            <SocialNetwork
              key={String(field)}
              link={fullLink}
              icon={
                <Ionicons
                  name={iconName}
                  size={24}
                  color={
                    isDark
                      ? colors.BackgroundDarkTheme
                      : colors.BackgroundLightTheme
                  }
                />
              }
            />
          );
        })}
    </View>
  );
}
