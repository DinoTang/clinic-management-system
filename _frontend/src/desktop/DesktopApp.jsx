import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import StaffLoginPage from "./pages/AuthPage/StaffLoginPage";
import { normalizeRole, ROLE_CONFIG } from "./roles.js";

const ROLE_PATHS = {
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  STAFF: "/staff",
};

function readStaffSession() {
  try {
    const session = JSON.parse(
      sessionStorage.getItem("clinic-staff-session") || "null",
    );
    const role = normalizeRole(session?.role);
    if (!role || !ROLE_CONFIG[role]) return null;
    if (session.mode === "database" && !session.token) return null;
    if (!["database", "demo"].includes(session.mode)) return null;
    const savedSession = { ...session, role };
    if (savedSession.mode === "database") {
      axios.defaults.headers.common.Authorization = `Bearer ${savedSession.token}`;
    }
    return savedSession;
  } catch (error) {
    console.error("Không thể đọc phiên nhân viên đã lưu.", error);
    return null;
  }
}

function App() {
  const navigate = useNavigate();
  const hostname = window.location.hostname;
  const demoLogin =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]";

  const session = readStaffSession();

  const handleLoginSuccess = (nextSession) => {
    const role = normalizeRole(nextSession.role);
    if (!role || !ROLE_CONFIG[role]) return;

    const authenticatedSession = { ...nextSession, role };
    sessionStorage.setItem(
      "clinic-staff-session",
      JSON.stringify(authenticatedSession),
    );
    if (authenticatedSession.mode === "database") {
      axios.defaults.headers.common.Authorization = `Bearer ${authenticatedSession.token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    navigate(ROLE_PATHS[role]);
  };

  if (session) {
    return <Navigate replace to={ROLE_PATHS[session.role]} />;
  }

  return <StaffLoginPage onLoginSuccess={handleLoginSuccess} demoLogin={demoLogin} />;
}

export default App;
