import React from "react";
import { View } from "react-native";
import Input from "./Input";
import VideoInput from "./VideoInput";
import AppButton from "./AppButton";

export interface StepThreeTeachSkillProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepThreeTeachSkill({
  onNext,
  onBack,
}: StepThreeTeachSkillProps) {
  return (
    <View>
      <Input
        name="credentials"
        label="Credenciais e Certificados"
        placeholder="Liste suas credenciais"
        multiline
        numberOfLines={4}
      />

      <VideoInput
        name="videoUrl"
        label="Vídeo de Introdução"
        maxDurationSec={180}
      />

      <View className="flex-row justify-between mt-4">
        <AppButton label="Voltar" onPress={onBack} type="secondary" />
        <AppButton
          label="Enviar"
          onPress={async () => {
            onNext();
          }}
        />
      </View>
    </View>
  );
}
