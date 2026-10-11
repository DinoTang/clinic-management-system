import axios from "axios";
import { useState } from "react";
import PatientBookingPage from "./pages/BookingPage/PatientBookingPage";
import StaffLoginPage from "./pages/AuthPage/StaffLoginPage";
import ReceptionPage from "./pages/ReceptionPage/ReceptionPage";
import DesktopSchedulePage from "./pages/SchedulePage/DesktopSchedulePage";
import DoctorExaminationPage from "./pages/ExaminationPage/DoctorExaminationPage";
import AdminWorkspace from "./pages/AdminPage/AdminWorkspace.jsx";
import { normalizeRole, ROLE_CONFIG } from "./roles.js";
import "./styles/desktop-index.css";
import "./styles/desktop-schedule.css";
import "./styles/reception.css";

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
  const hostname = window.location.hostname;
  const demoLogin =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]";

  const [session, setSession] = useState(readStaffSession);
  const [currentPage, setCurrentPage] = useState(() =>
    session?.role === "ADMIN"
      ? "admin"
      : session?.role === "DOCTOR"
        ? "schedule"
        : "reception",
  );

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
    setSession(authenticatedSession);
    setCurrentPage(
      role === "ADMIN" ? "admin" : role === "DOCTOR" ? "schedule" : "reception",
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem("clinic-staff-session");
    delete axios.defaults.headers.common.Authorization;
    setSession(null);
    setCurrentPage("reception");
  };

  if (!session) {
    return (
      <StaffLoginPage
        onLoginSuccess={handleLoginSuccess}
        demoLogin={demoLogin}
      />
    );
  }

  const roleConfig = ROLE_CONFIG[session.role];

  if (session.role === "ADMIN") {
    return (
      <div className="desktop-app-root">
        <AdminWorkspace onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="desktop-app-root">
      <nav className="desktop-workspace-nav" aria-label="Khu vực làm việc">
        <div className="desktop-workspace-links">
          {roleConfig.pages.map((page) => (
            <button
              aria-current={currentPage === page.id ? "page" : undefined}
              className={`desktop-workspace-button${currentPage === page.id ? " is-active" : ""}`}
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              type="button"
            >
              {page.label}
            </button>
          ))}
        </div>
        <div className="desktop-workspace-account">
          <span className="desktop-role-label">{roleConfig.label}</span>
          {session.mode === "demo" && (
            <span className="desktop-demo-label">Đăng nhập tạm</span>
          )}
          <button
            className="desktop-workspace-button desktop-logout-button"
            onClick={handleLogout}
            type="button"
          >
            Đăng xuất
          </button>
        </div>
      </nav>

      {currentPage === "reception" && <ReceptionPage />}
      {currentPage === "booking" && <PatientBookingPage />}
      {currentPage === "schedule" && <DesktopSchedulePage />}
      {currentPage === "examination" && <DoctorExaminationPage />}
    </div>
  );
}

export default App;
