import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { getAppointments } from "./services/patientApi";
import "./PatientMobileApp.css";
import "./PatientWorkspace.css";
import Avatar from "./components/Avatar";
import AuthPage from "./screens/AuthPage";
import PatientHomeScreen from "./screens/PatientHomeScreen";
import PatientWorkspace from "./screens/PatientWorkspace";

const navigation = [
  { id: "home", label: "Trang chủ", icon: "home" },
  { id: "appointments", label: "Lịch khám", icon: "calendar" },
  { id: "records", label: "Hồ sơ", icon: "records" },
  { id: "profile", label: "Cá nhân", icon: "user" },
];

function Icon({ name, size = 24, filled = false }) {
  const paths = {
    home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M8 14h3v3H8z" />
      </>
    ),
    records: (
      <>
        <path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M8 12h8M8 16h6" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2z" />
      </>
    ),
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    back: <path d="m15 18-6-6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    doctor: (
      <>
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2M9 15l3 3 3-3" />
      </>
    ),
    pill: (
      <>
        <path d="M4.9 19.1a5 5 0 0 1 0-7.1l7.1-7.1a5 5 0 0 1 7.1 7.1L12 19.1a5 5 0 0 1-7.1 0Z" />
        <path d="m8.4 8.4 7.1 7.1" />
      </>
    ),
    invoice: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    heart: (
      <>
        <path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
        <path d="M4 12h4l2-3 3.5 7 2-4H20" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
      </>
    ),
    plus: <path d="M12 5v14m-7-7h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    chat: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
        <path d="M8 12h8M8 8h5" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled && name === "home" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function readPatientSession() {
  const savedSession =
    sessionStorage.getItem("clinic-patient-session") ||
    localStorage.getItem("clinic-patient-session");

  if (!savedSession) return null;

  try {
    const session = JSON.parse(savedSession);
    return session.patient
      ? { ...session.patient, token: session.token }
      : null;
  } catch (error) {
    console.error("Không thể đọc phiên bệnh nhân đã lưu.", error);
    return null;
  }
}

function App() {
  const [patientProfile, setPatientProfile] = useState(readPatientSession);
  const [currentPage, setCurrentPage] = useState(() =>
    patientProfile ? "home" : "auth",
  );
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: "LH20261014001",
      specialty: "Nội khoa",
      doctor: "BS. Trần Minh Tuấn",
      date: "2026-10-14",
      time: "09:30",
      reason: "Khám định kỳ",
      symptoms: "Mệt mỏi nhẹ",
      status: "CONFIRMED",
      room: "Phòng khám 1",
    },
  ]);
  const [profileDetails, setProfileDetails] = useState({
    fullName: patientProfile?.fullName || "Nguyễn Văn An",
    patientId: patientProfile?.patientId || "",
    birthDate: "",
    gender: patientProfile?.gender || "Nam",
    phone: patientProfile?.phone || "",
    email: patientProfile?.email || "",
    address: "",
    medicalHistory: "",
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (patientProfile?.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${patientProfile.token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }

    return () => {
      delete axios.defaults.headers.common.Authorization;
    };
  }, [patientProfile?.token]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };

  const handleLoginSuccess = (session) => {
    const profile = {
      ...session.patient,
      token: session.token,
    };
    setPatientProfile(profile);
    setProfileDetails((current) => ({
      ...current,
      fullName: profile?.fullName || current.fullName,
      patientId: profile?.patientId || current.patientId,
      gender: profile?.gender || current.gender,
      phone: profile?.phone || current.phone,
      email: profile?.email || current.email,
    }));
    setCurrentPage("home");
  };

  const requestLogout = () => setShowLogoutConfirmation(true);

  const confirmLogout = () => {
    localStorage.removeItem("clinic-patient-session");
    sessionStorage.removeItem("clinic-patient-session");
    delete axios.defaults.headers.common.Authorization;
    setShowLogoutConfirmation(false);
    setPatientProfile(null);
    setCurrentPage("auth");
  };

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = sessionStorage.getItem("clinic-patient-notifications");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      try {
        sessionStorage.setItem("clinic-patient-notifications", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addNotification = (notif) => {
    setNotifications((prev) => {
      const updated = [notif, ...prev];
      try {
        sessionStorage.setItem("clinic-patient-notifications", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const prevQueueStatusRef = useRef({});
  const initialFetchDoneRef = useRef(false);

  useEffect(() => {
    const patientId = patientProfile?.patientId;
    if (!patientId) return undefined;

    let cancelled = false;

    const checkQueueChanges = () => {
      getAppointments(patientId)
        .then((data) => {
          if (cancelled || !Array.isArray(data)) return;

          const now = new Date();
          const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10);

          const todayAppointments = data.filter((apt) => apt.date >= today);

          todayAppointments.forEach((apt) => {
            const aptId = apt.id;
            const prev = prevQueueStatusRef.current[aptId];
            const currentQueueStatus = apt.queueStatus;
            const currentStatus = apt.status;

            if (initialFetchDoneRef.current && prev) {
              // Bác sĩ Gọi khám
              if (prev.queueStatus !== "DangKham" && currentQueueStatus === "DangKham") {
                Swal.fire({
                  icon: "info",
                  title: "ĐẾN LƯỢT KHÁM CỦA BẠN!",
                  html: `Bác sĩ <b>${apt.doctorName || "phụ trách"}</b> đang gọi số <b>#${apt.queueNumber != null ? String(apt.queueNumber).padStart(2, "0") : ""}</b> vào <b>${apt.roomName || "phòng khám"}</b>.<br/><br/><span style="color:#d9363e; font-weight:700;">Vui lòng chuẩn bị và tiến vào phòng khám!</span>`,
                  confirmButtonText: "Tôi đã hiểu",
                  confirmButtonColor: "#1677ff",
                  timer: 20000,
                  timerProgressBar: true,
                });
                addNotification({
                  id: "notif_" + Date.now(),
                  type: "calling",
                  title: "Bác sĩ đang gọi vào khám",
                  content: `Bác sĩ ${apt.doctorName || "phụ trách"} đang gọi số #${apt.queueNumber} vào ${apt.roomName || "phòng khám"}.`,
                  time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                  read: false,
                });
              }

              // Bác sĩ Đưa về chờ
              if (prev.queueStatus === "DangKham" && currentQueueStatus === "ChoKham") {
                Swal.fire({
                  icon: "warning",
                  title: "Chuyển về hàng chờ",
                  html: `Lượt khám số <b>#${apt.queueNumber != null ? String(apt.queueNumber).padStart(2, "0") : ""}</b> của bạn đã được chuyển về trạng thái chờ.<br/>Vui lòng tiếp tục theo dõi loa và màn hình thông báo.`,
                  confirmButtonText: "Đã rõ",
                  confirmButtonColor: "#faad14",
                });
                addNotification({
                  id: "notif_" + Date.now(),
                  type: "waiting",
                  title: "Chuyển về hàng chờ khám",
                  content: `Số thứ tự #${apt.queueNumber} đã được chuyển về trạng thái chờ tại ${apt.roomName || "phòng khám"}.`,
                  time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                  read: false,
                });
              }

              // Hoàn tất khám
              const wasCompleted = prev.status === "HoanTat" || prev.queueStatus === "DaKham";
              const isNowCompleted = currentStatus === "HoanTat" || currentQueueStatus === "DaKham";
              if (!wasCompleted && isNowCompleted) {
                Swal.fire({
                  icon: "success",
                  title: "Hoàn tất lượt khám",
                  html: `Lượt khám với bác sĩ <b>${apt.doctorName || ""}</b> đã hoàn tất.<br/>Kết quả và đơn thuốc đã được cập nhật vào hồ sơ sức khỏe.`,
                  confirmButtonText: "Xem hồ sơ",
                  confirmButtonColor: "#52c41a",
                }).then((res) => {
                  if (res.isConfirmed) {
                    setCurrentPage("records");
                  }
                });
                addNotification({
                  id: "notif_" + Date.now(),
                  type: "completed",
                  title: "Hoàn tất lượt khám",
                  content: `Bạn đã hoàn tất khám với bác sĩ ${apt.doctorName || ""}. Kết quả đã sẵn sàng trong Hồ sơ sức khỏe.`,
                  time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                  read: false,
                });
              }
            }

            prevQueueStatusRef.current[aptId] = {
              queueStatus: currentQueueStatus,
              status: currentStatus,
            };
          });

          initialFetchDoneRef.current = true;
        })
        .catch(() => {});
    };

    checkQueueChanges();
    const interval = setInterval(checkQueueChanges, 4000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [patientProfile?.patientId]);

  if (currentPage === "auth") {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  const visibleTab =
    ["home", "appointments", "records", "profile"].includes(currentPage)
      ? currentPage
      : currentPage === "booking"
        ? "appointments"
        : currentPage === "notifications" || currentPage === "assistant"
          ? "home"
          : "records";

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="patient-greeting">
          <span>Xin chào,</span>
          <h1>{profileDetails.fullName || "Bệnh nhân"}</h1>
          <p>Bệnh nhân</p>
        </div>
        <button
          aria-label="Thông báo"
          className="header-icon-button"
          onClick={() => setCurrentPage("notifications")}
          type="button"
        >
          <Icon name="bell" size={23} />
          {unreadNotifications > 0 && <span className="notification-dot" />}
        </button>
        <button
          aria-label="Thông tin cá nhân"
          className="patient-avatar"
          onClick={() => setCurrentPage("profile")}
          type="button"
        >
          <Avatar gender={patientProfile?.gender} />
        </button>
      </header>

      <main className="app-main">
        {currentPage === "home" ? (
          <PatientHomeScreen
            onNavigate={setCurrentPage}
            Icon={Icon}
            doctorGender="MALE"
            patientId={patientProfile?.patientId}
          />
        ) : (
          <PatientWorkspace
            page={currentPage}
            onNavigate={setCurrentPage}
            Icon={Icon}
            appointments={appointments}
            setAppointments={setAppointments}
            profile={profileDetails}
            setProfile={setProfileDetails}
            showToast={showToast}
            notifications={notifications}
            onMarkNotificationsRead={markAllNotificationsRead}
            onLogout={requestLogout}
          />
        )}
      </main>

      <nav className="bottom-nav" aria-label="Điều hướng chính">
        {navigation.map((item) => (
          <button
            aria-current={visibleTab === item.id ? "page" : undefined}
            className={`bottom-nav-item${visibleTab === item.id ? " is-active" : ""}`}
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            type="button"
          >
            <span className="bottom-nav-icon">
              <Icon
                name={item.icon}
                size={25}
                filled={visibleTab === item.id}
              />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {toast && (
        <div className="patient-toast" role="status">
          <Icon name="check" size={19} />
          {toast}
        </div>
      )}

      {showLogoutConfirmation && (
        <div
          className="logout-dialog-backdrop"
          onClick={() => setShowLogoutConfirmation(false)}
        >
          <section
            aria-labelledby="logout-dialog-title"
            aria-modal="true"
            className="logout-dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <span className="logout-dialog-icon">
              <Icon name="logout" size={25} />
            </span>
            <h2 id="logout-dialog-title">Đăng xuất?</h2>
            <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này không?</p>
            <div className="logout-dialog-actions">
              <button
                className="logout-cancel-button"
                onClick={() => setShowLogoutConfirmation(false)}
                type="button"
              >
                Ở lại
              </button>
              <button
                className="logout-confirm-button"
                onClick={confirmLogout}
                type="button"
              >
                Đăng xuất
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
