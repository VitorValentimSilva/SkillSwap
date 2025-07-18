import "./styles/global.css";
import "../gesture-handler";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { TeachSkillProvider } from "./contexts/TeachSkillContext";
import { EditSkillProvider } from "./contexts/EditSkillContext";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProfileProvider>
          <TeachSkillProvider>
            <EditSkillProvider>
              <Routes />
            </EditSkillProvider>
          </TeachSkillProvider>
        </ProfileProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
