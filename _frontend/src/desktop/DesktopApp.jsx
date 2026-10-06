import axios from "axios";
import { useState } from "react";
import PatientBookingPage from "./pages/BookingPage/PatientBookingPage";
import StaffLoginPage from "./pages/AuthPage/StaffLoginPage";
import ReceptionPage from "./pages/ReceptionPage/ReceptionPage";
import DesktopSchedulePage from "./pages/SchedulePage/DesktopSchedulePage";
import "./styles/desktop-index.css";
import "./styles/desktop-schedule.css";
import "./styles/reception.css";

function App() {
  const demoLogin =
    new URLSearchParams(window.location.search).get("loginMode") === "demo";

  const [currentPage, setCurrentPage] = useState("reception"); // Mặc định mở trang Tiếp đón
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const session = JSON.parse(
      sessionStorage.getItem("clinic-staff-session") || "null",
    );
    if (session?.mode === "database" && session.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${session.token}`;
    }
    return Boolean(session?.mode === "demo" || session?.token);
  });

  const handleLoginSuccess = (session) => {
    sessionStorage.setItem("clinic-staff-session", JSON.stringify(session));
    if (session.mode === "database") {
      axios.defaults.headers.common.Authorization = `Bearer ${session.token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("clinic-staff-session");
    delete axios.defaults.headers.common.Authorization;
    setIsAuthenticated(false);
    setCurrentPage("reception");
  };

  if (!isAuthenticated) {
    return (
      <StaffLoginPage
        onLoginSuccess={handleLoginSuccess}
        demoLogin={demoLogin}
      />
    );
  }

  return (
    <div className="desktop-app-root">
      <nav
        style={{
          display: "flex",
          gap: "12px",
          padding: "12px 24px",
          background: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
        }}
      >
        {demoLogin && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: "6px",
              color: "#245d87",
              background: "#e7f3fc",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Đăng nhập demo · Các chức năng vẫn kết nối backend
          </span>
        )}
        <button
          onClick={() => setCurrentPage("reception")}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            background: currentPage === "reception" ? "#1976d2" : "#f1f5f9",
            color: currentPage === "reception" ? "#ffffff" : "#475569",
          }}
        >
          📋 Tiếp Đón & Hàng Đợi (Lễ Tân)
        </button>

        <button
          onClick={() => setCurrentPage("booking")}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            background: currentPage === "booking" ? "#1976d2" : "#f1f5f9",
            color: currentPage === "booking" ? "#ffffff" : "#475569",
          }}
        >
          🏥 Đặt Lịch Khám (Bệnh Nhân)
        </button>

        <button
          onClick={() => setCurrentPage("schedule")}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            background: currentPage === "schedule" ? "#1976d2" : "#f1f5f9",
            color: currentPage === "schedule" ? "#ffffff" : "#475569",
          }}
        >
          👨‍⚕️ Quản Lý Lịch Trực (Bác Sĩ / Admin)
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
            color: "#475569",
            background: "#f1f5f9",
          }}
        >
          Đăng xuất
        </button>
      </nav>

      {currentPage === "reception" && <ReceptionPage />}
      {currentPage === "booking" && <PatientBookingPage />}
      {currentPage === "schedule" && <DesktopSchedulePage />}
    </div>
  );
}

export default App;
