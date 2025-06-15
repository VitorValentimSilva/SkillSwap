import React, { createContext, ReactNode, useContext, useState } from "react";
import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { createProfile } from "../services/profileService";
import { ProfileFormData } from "../schemas/profileSchema";
import { useAuth } from "./AuthContext";

type ProfileContextType = {
  isSubmitting: boolean;
  hasProfile: boolean | null;
  submitProfile: (data: ProfileFormData) => Promise<string>;
  checkProfile: (uid: string) => Promise<boolean>;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const { user } = useAuth();

  const checkProfile = async (uid: string) => {
    if (!uid) {
      setHasProfile(false);
      return false;
    }
    try {
      const ref = doc(db, "profiles", uid);
      const snap = await getDoc(ref);
      const exists = snap.exists();

      setHasProfile(exists);
      return exists;
    } catch (error) {
      console.error("Erro ao checar perfil:", error);
      setHasProfile(false);
      return false;
    }
  };

  const submitProfile = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      if (!user?.uid) throw new Error("Usuário não autenticado");
      const id = await createProfile(user.uid, data);
      setHasProfile(true);
      return id;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ isSubmitting, hasProfile, submitProfile, checkProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be inside ProfileProvider");
  return ctx;
}
