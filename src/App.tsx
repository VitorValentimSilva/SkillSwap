import "./styles/global.css";
import "../gesture-handler";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
