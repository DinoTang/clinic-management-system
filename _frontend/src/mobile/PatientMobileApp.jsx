import { useState } from "react";
import "./PatientMobileApp.css";
import Avatar from "./components/Avatar";
import AuthPage from "./screens/AuthPage";
import PatientHomeScreen from "./screens/PatientHomeScreen";

const patientProfile = {
  fullName: "Nguyễn Văn An",
  gender: "MALE",
};

const navigation = [
  { id: "home", label: "Trang chủ", icon: "home" },
  { id: "appointments", label: "Lịch khám", icon: "calendar" },
  { id: "records", label: "Hồ sơ", icon: "records" },
  { id: "profile", label: "Cá nhân", icon: "user" },
];

const sectionContent = {
  appointments: {
    title: "Lịch khám",
    description: "Theo dõi lịch hẹn và đặt lịch khám mới.",
    icon: "calendar",
    items: [
      ["Lịch khám sắp tới", "14/10/2026 · 09:30", "Đã xác nhận"],
      ["Lịch sử khám", "Các lần khám trước sẽ được lưu tại đây."],
    ],
  },
  records: {
    title: "Hồ sơ bệnh án",
    description: "Thông tin khám và điều trị của bạn.",
    icon: "records",
    items: [
      ["Hồ sơ khám", "Kết quả khám sẽ hiển thị sau khi hoàn tất."],
      ["Đơn thuốc", "Xem hướng dẫn dùng thuốc được bác sĩ kê."],
      ["Hóa đơn", "Theo dõi chi phí và trạng thái thanh toán."],
    ],
  },
  profile: {
    title: "Thông tin cá nhân",
    description: "Quản lý thông tin tài khoản bệnh nhân.",
    icon: "user",
    items: [
      ["Nguyễn Văn An", "Bệnh nhân"],
      ["Thông tin liên hệ", "Cập nhật số điện thoại và thông tin cá nhân."],
    ],
  },
  notifications: {
    title: "Thông báo",
    description: "Nhắc nhở lịch khám và cập nhật từ phòng khám.",
    icon: "bell",
    items: [["Nhắc lịch tái khám", "Đừng quên lịch hẹn sắp tới của bạn."]],
  },
  prescription: {
    title: "Đơn thuốc",
    description: "Hướng dẫn sử dụng thuốc theo chỉ định của bác sĩ.",
    icon: "pill",
    items: [["Đơn thuốc gần đây", "Đơn thuốc sẽ hiển thị sau khi bác sĩ hoàn tất khám."]],
  },
  invoices: {
    title: "Hóa đơn",
    description: "Xem hóa đơn và trạng thái thanh toán.",
    icon: "invoice",
    items: [["Hóa đơn khám bệnh", "Hóa đơn sẽ hiển thị sau khi hoàn tất khám."]],
  },
};

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

function SectionPage({ page, Icon, onNavigate }) {
  const content = sectionContent[page];

  return (
    <section className="patient-section">
      <div className="section-page-heading">
        <span className="section-page-icon">
          <Icon name={content.icon} size={28} />
        </span>
        <div>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </div>
      <div className="section-page-list">
        {content.items.map(([title, description, status]) => (
          <article className="section-page-card" key={title}>
            <div>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
            {status && <span className="appointment-status">{status}</span>}
            <Icon name="chevron" size={20} />
          </article>
        ))}
      </div>
      <button
        className="section-home-link"
        onClick={() => onNavigate("home")}
        type="button"
      >
        <Icon name="home" size={18} /> Về trang chủ
      </button>
    </section>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("auth");

  if (currentPage === "auth") {
    return <AuthPage />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="patient-greeting">
          <span>Xin chào,</span>
          <h1>{patientProfile.fullName}</h1>
          <p>Bệnh nhân</p>
        </div>
        <button
          aria-label="Thông báo"
          className="header-icon-button"
          onClick={() => setCurrentPage("notifications")}
          type="button"
        >
          <Icon name="bell" size={23} />
          <span className="notification-dot" />
        </button>
        <button
          aria-label="Thông tin cá nhân"
          className="patient-avatar"
          onClick={() => setCurrentPage("profile")}
          type="button"
        >
          <Avatar gender={patientProfile.gender} />
        </button>
      </header>

      <main className="app-main">
        {currentPage === "home" ? (
          <PatientHomeScreen
            onNavigate={setCurrentPage}
            Icon={Icon}
            doctorGender="MALE"
          />
        ) : (
          <SectionPage
            page={currentPage}
            Icon={Icon}
            onNavigate={setCurrentPage}
          />
        )}
      </main>

      <nav className="bottom-nav" aria-label="Điều hướng chính">
        {navigation.map((item) => (
          <button
            aria-current={currentPage === item.id ? "page" : undefined}
            className={`bottom-nav-item${currentPage === item.id ? " is-active" : ""}`}
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            type="button"
          >
            <span className="bottom-nav-icon">
              <Icon
                name={item.icon}
                size={25}
                filled={currentPage === item.id}
              />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
