import { useState, ReactNode, createContext } from "react";
import { Skill } from "../types/skill";

type EditSkillContextType = {
  skillToEdit: Skill | null;
  openForEdit: (skill: Skill) => void;
  closeEdit: () => void;
};

export const EditSkillContext = createContext<EditSkillContextType>({
  skillToEdit: null,
  openForEdit: () => {},
  closeEdit: () => {},
});

export function EditSkillProvider({ children }: { children: ReactNode }) {
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  return (
    <EditSkillContext.Provider
      value={{
        skillToEdit,
        openForEdit: setSkillToEdit,
        closeEdit: () => setSkillToEdit(null),
      }}
    >
      {children}
    </EditSkillContext.Provider>
  );
}
