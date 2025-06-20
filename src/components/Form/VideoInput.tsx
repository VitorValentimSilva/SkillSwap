import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useController, useFormContext } from "react-hook-form";
import { ThemeContext } from "../../contexts/ThemeContext";
import { colors } from "../../styles/colors";
import { pickVideo, PickedVideo } from "../../utils/pickVideo";

type Props = {
  name: string;
  label: string;
  maxDurationSec?: number;
};

export default function VideoInput({
  name,
  label,
  maxDurationSec = 180,
}: Props) {
  const { isDark } = useContext(ThemeContext);
  const { control, setValue, trigger } = useFormContext();
  const {
    field: { value },
    fieldState: { error },
  } = useController({ name, control });

  const [filename, setFilename] = useState<string | null>(
    value ? value.split("/").pop()! : null
  );

  const handlePick = async () => {
    const video: PickedVideo | null = await pickVideo(maxDurationSec);
    if (!video) return;

    setValue(name, video.uri, { shouldValidate: true });
    setFilename(video.name);
    trigger(name);
  };

  return (
    <View className="mb-4">
      <Text
        className={`text-base font-semibold mb-2 ${
          isDark
            ? "text-TextPrimaryColorDarkTheme"
            : "text-TextPrimaryColorLightTheme"
        }`}
      >
        {label}
      </Text>

      <TouchableOpacity
        onPress={handlePick}
        className={`
          border-2 border-dashed rounded-lg
          items-center justify-center
          h-40
          ${isDark ? "border-SurfaceColorDarkTheme" : "border-SurfaceColorLightTheme"}
        `}
      >
        {filename ? (
          <Text
            className={`text-sm ${isDark ? "text-TextPrimaryColorDarkTheme" : "text-TextPrimaryColorLightTheme"}`}
          >
            {filename}
          </Text>
        ) : (
          <>
            <Ionicons
              name="videocam-outline"
              size={36}
              color={
                isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme
              }
            />
            <Text
              className="mt-2 text-center px-4"
              style={{
                color: isDark
                  ? colors.TextPrimaryColorDarkTheme
                  : colors.TextPrimaryColorLightTheme,
              }}
            >
              Upload a 2-3 minute introduction video{"\n"}
              (max {maxDurationSec / 60} min)
            </Text>
          </>
        )}
      </TouchableOpacity>

      {error && (
        <Text className="text-ErrorColor text-base mt-2">{error.message}</Text>
      )}
    </View>
  );
}
