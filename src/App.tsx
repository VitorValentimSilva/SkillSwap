import "./styles/global.css";
import "../gesture-handler";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileProvider } from "./contexts/ProfileContext";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProfileProvider>
          <Routes />
        </ProfileProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
