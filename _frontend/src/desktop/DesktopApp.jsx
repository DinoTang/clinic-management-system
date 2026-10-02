import { useState } from "react";
import PatientBookingPage from "./pages/BookingPage/PatientBookingPage";
import ReceptionPage from "./pages/ReceptionPage/ReceptionPage";
import DesktopSchedulePage from "./pages/SchedulePage/DesktopSchedulePage";
import "./styles/desktop-index.css";
import "./styles/desktop-schedule.css";
import "./styles/reception.css";

function App() {
  const [currentPage, setCurrentPage] = useState("reception"); // Mặc định mở trang Tiếp đón

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
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 16px",
            borderRadius: "6px",
            color: "#475569",
            background: "#f1f5f9",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Giao diện bệnh nhân
        </a>
      </nav>

      {currentPage === "reception" && <ReceptionPage />}
      {currentPage === "booking" && <PatientBookingPage />}
      {currentPage === "schedule" && <DesktopSchedulePage />}
    </div>
  );
}

export default App;
