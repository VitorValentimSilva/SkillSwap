import React, { createContext, useContext, useState, ReactNode } from "react";
import { TeachSkillFormData } from "../schemas/teachSkillSchema";
import { createTeachSkill } from "../services/skillService";
import { useAuth } from "./AuthContext";

type TeachSkillContextType = {
  isSubmitting: boolean;
  submitTeachSkill: (data: TeachSkillFormData) => Promise<string>;
};

const TeachSkillContext = createContext<TeachSkillContextType | null>(null);

export function TeachSkillProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitTeachSkill = async (data: TeachSkillFormData) => {
    setIsSubmitting(true);
    try {
      if (!user?.uid) throw new Error("Usuário não autenticado");
      const id = await createTeachSkill(user.uid, data);
      return id;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TeachSkillContext.Provider value={{ isSubmitting, submitTeachSkill }}>
      {children}
    </TeachSkillContext.Provider>
  );
}

export function useTeachSkill() {
  const ctx = useContext(TeachSkillContext);
  if (!ctx) throw new Error("useTeachSkill must be inside TeachSkillProvider");
  return ctx;
}
