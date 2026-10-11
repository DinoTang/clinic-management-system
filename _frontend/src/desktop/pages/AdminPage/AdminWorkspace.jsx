import { useMemo, useState } from "react";
import "./admin-workspace.css";

const NAVIGATION = [
  {
    group: "TỔNG QUAN",
    items: [{ id: "overview", label: "Tổng quan", icon: "overview" }],
  },
  {
    group: "DANH MỤC & NHÂN SỰ",
    items: [
      { id: "accounts", label: "Tài khoản & phân quyền", icon: "accounts" },
      { id: "patients", label: "Bệnh nhân", icon: "patients" },
      { id: "doctors", label: "Bác sĩ", icon: "doctors" },
      { id: "specialties", label: "Chuyên khoa", icon: "specialties" },
      { id: "rooms", label: "Phòng khám", icon: "rooms" },
    ],
  },
  {
    group: "VẬN HÀNH KHÁM",
    items: [
      { id: "schedules", label: "Lịch làm việc", icon: "schedules" },
      { id: "appointments", label: "Lịch hẹn", icon: "appointments" },
    ],
  },
  {
    group: "DỊCH VỤ & TÀI CHÍNH",
    items: [
      { id: "medicines", label: "Thuốc & tồn kho", icon: "medicines" },
      { id: "services", label: "Dịch vụ y tế", icon: "services" },
      { id: "invoices", label: "Hóa đơn", icon: "invoices" },
      { id: "reports", label: "Báo cáo", icon: "reports" },
    ],
  },
];

const SEED_DATA = {
  accounts: [
    { id: "ND001", name: "Nguyễn Quản Trị", username: "admin", role: "ADMIN", email: "admin@clinic.vn", phone: "0901000001", status: "ACTIVE", lastActive: "Hôm nay, 08:42" },
    { id: "ND002", name: "Trần Văn Nam", username: "dr_nam", role: "DOCTOR", email: "nam.tv@clinic.vn", phone: "0902000002", status: "ACTIVE", lastActive: "Hôm nay, 08:16" },
    { id: "ND003", name: "Lê Thị Lan", username: "dr_lan", role: "DOCTOR", email: "lan.lt@clinic.vn", phone: "0903000003", status: "ACTIVE", lastActive: "Hôm qua, 16:30" },
    { id: "ND005", name: "Hoàng Tuyết Mai", username: "nv_mai", role: "STAFF", email: "mai.ht@clinic.vn", phone: "0905000005", status: "ACTIVE", lastActive: "Hôm nay, 07:55" },
    { id: "ND007", name: "Nguyễn Văn An", username: "bn_an", role: "PATIENT", email: "an.nguyen@gmail.com", phone: "0912345678", status: "ACTIVE", lastActive: "10/10/2026" },
    { id: "ND010", name: "Phạm Minh Đức", username: "dr_duc", role: "DOCTOR", email: "duc.pm@clinic.vn", phone: "0904000004", status: "LOCKED", lastActive: "03/10/2026" },
  ],
  patients: [
    { id: "BN001", name: "Nguyễn Văn An", phone: "0912345678", gender: "Nam", birthDate: "1988-05-12", bloodType: "O+", appointments: 8, status: "ACTIVE" },
    { id: "BN002", name: "Trần Thị Bình", phone: "0913456789", gender: "Nữ", birthDate: "1995-10-24", bloodType: "A+", appointments: 5, status: "ACTIVE" },
    { id: "BN003", name: "Lê Hùng Cường", phone: "0914567890", gender: "Nam", birthDate: "2018-03-15", bloodType: "B+", appointments: 2, status: "ACTIVE" },
    { id: "BN004", name: "Phạm Thu Hà", phone: "0987654321", gender: "Nữ", birthDate: "1992-06-21", bloodType: "AB+", appointments: 3, status: "ACTIVE" },
  ],
  doctors: [
    { id: "BS001", name: "Trần Văn Nam", specialty: "Tim mạch", degree: "CKII", experience: 15, fee: 250000, status: "ACTIVE" },
    { id: "BS002", name: "Lê Thị Lan", specialty: "Nội khoa", degree: "Thạc sĩ", experience: 8, fee: 180000, status: "ACTIVE" },
    { id: "BS003", name: "Phạm Minh Đức", specialty: "Nhi khoa", degree: "Đa khoa", experience: 5, fee: 150000, status: "ACTIVE" },
    { id: "BS004", name: "Nguyễn Thị Hương", specialty: "Tai Mũi Họng", degree: "CKI", experience: 10, fee: 200000, status: "INACTIVE" },
  ],
  specialties: [
    { id: "CK_TIM", name: "Tim mạch", description: "Chẩn đoán và điều trị bệnh lý tim mạch", fee: 200000, doctors: 3, status: "ACTIVE" },
    { id: "CK_NOI", name: "Nội khoa", description: "Khám và điều trị bệnh nội khoa tổng quát", fee: 150000, doctors: 5, status: "ACTIVE" },
    { id: "CK_NHI", name: "Nhi khoa", description: "Chăm sóc sức khỏe trẻ em", fee: 150000, doctors: 2, status: "ACTIVE" },
    { id: "CK_TMH", name: "Tai Mũi Họng", description: "Khám bệnh lý tai, mũi, họng", fee: 180000, doctors: 2, status: "ACTIVE" },
    { id: "CK_DA", name: "Da liễu", description: "Chuyên khoa da và các phần phụ của da", fee: 180000, doctors: 0, status: "INACTIVE" },
  ],
  rooms: [
    { id: "PK101", name: "Phòng khám Nội 1", specialty: "Nội khoa", floor: "Tầng 1", capacity: 1, status: "ACTIVE" },
    { id: "PK102", name: "Phòng khám Tim mạch", specialty: "Tim mạch", floor: "Tầng 1", capacity: 1, status: "ACTIVE" },
    { id: "PK201", name: "Phòng khám Nhi", specialty: "Nhi khoa", floor: "Tầng 2", capacity: 1, status: "ACTIVE" },
    { id: "PKCL01", name: "Phòng xét nghiệm - Siêu âm", specialty: "Cận lâm sàng", floor: "Tầng trệt", capacity: 2, status: "ACTIVE" },
  ],
  schedules: [
    { id: "LT001", doctor: "Trần Văn Nam", room: "PK102", date: "2026-10-12", time: "07:30–11:30", maxPatients: 25, booked: 18, status: "AVAILABLE" },
    { id: "LT002", doctor: "Lê Thị Lan", room: "PK101", date: "2026-10-12", time: "07:30–11:30", maxPatients: 30, booked: 26, status: "AVAILABLE" },
    { id: "LT003", doctor: "Phạm Minh Đức", room: "PK201", date: "2026-10-12", time: "13:30–17:00", maxPatients: 20, booked: 11, status: "AVAILABLE" },
    { id: "LT004", doctor: "Trần Văn Nam", room: "PK102", date: "2026-10-11", time: "13:30–17:00", maxPatients: 25, booked: 0, status: "CANCELLED" },
  ],
  appointments: [
    { id: "LH20261012001", patient: "Nguyễn Văn An", doctor: "Trần Văn Nam", specialty: "Tim mạch", date: "2026-10-12", time: "08:00", source: "ONLINE", status: "CONFIRMED" },
    { id: "LH20261012002", patient: "Trần Thị Bình", doctor: "Lê Thị Lan", specialty: "Nội khoa", date: "2026-10-12", time: "08:30", source: "ONLINE", status: "PENDING" },
    { id: "LH20261012003", patient: "Lê Hùng Cường", doctor: "Phạm Minh Đức", specialty: "Nhi khoa", date: "2026-10-12", time: "09:00", source: "ONLINE", status: "CONFIRMED" },
    { id: "LH20261011001", patient: "Phạm Thu Hà", doctor: "Lê Thị Lan", specialty: "Nội khoa", date: "2026-10-11", time: "08:30", source: "WALK_IN", status: "COMPLETED" },
    { id: "LH20261011002", patient: "Nguyễn Văn An", doctor: "Trần Văn Nam", specialty: "Tim mạch", date: "2026-10-11", time: "09:00", source: "ONLINE", status: "CHECKED_IN" },
    { id: "LH20261010001", patient: "Trần Thị Bình", doctor: "Lê Thị Lan", specialty: "Nội khoa", date: "2026-10-10", time: "10:00", source: "ONLINE", status: "CANCELLED" },
  ],
  medicines: [
    { id: "TH001", name: "Amlor 5mg", ingredient: "Amlodipine", unit: "Viên", price: 10500, stock: 1500, status: "ACTIVE" },
    { id: "TH002", name: "Lipitor 20mg", ingredient: "Atorvastatin", unit: "Viên", price: 22000, stock: 800, status: "ACTIVE" },
    { id: "TH003", name: "Nexium 40mg", ingredient: "Esomeprazole", unit: "Viên", price: 24000, stock: 1200, status: "ACTIVE" },
    { id: "TH004", name: "Kremil-S", ingredient: "Aluminium hydroxide", unit: "Viên", price: 2500, stock: 18, status: "ACTIVE" },
    { id: "TH005", name: "Amoxicillin 500mg", ingredient: "Amoxicillin", unit: "Viên", price: 4000, stock: 0, status: "INACTIVE" },
  ],
  services: [
    { id: "DV_ECG", name: "Điện tâm đồ ECG 12 chuyển đạo", specialty: "Tim mạch", price: 100000, unit: "Lần", status: "ACTIVE" },
    { id: "DV_ECHO", name: "Siêu âm tim màu Doppler", specialty: "Tim mạch", price: 350000, unit: "Lần", status: "ACTIVE" },
    { id: "DV_NSDD", name: "Nội soi dạ dày gây mê", specialty: "Nội khoa", price: 900000, unit: "Lần", status: "ACTIVE" },
    { id: "DV_XNBL", name: "Test vi khuẩn HP qua hơi thở", specialty: "Nội khoa", price: 450000, unit: "Lần", status: "ACTIVE" },
  ],
  invoices: [
    { id: "HD20261011001", patient: "Phạm Thu Hà", appointment: "LH20261011001", createdAt: "2026-10-11 09:30", total: 430000, method: "Chuyển khoản", status: "PAID" },
    { id: "HD20261011002", patient: "Nguyễn Văn An", appointment: "LH20261011002", createdAt: "2026-10-11 10:15", total: 250000, method: "—", status: "UNPAID" },
    { id: "HD20261010001", patient: "Trần Thị Bình", appointment: "LH20261010002", createdAt: "2026-10-10 11:20", total: 612000, method: "Tiền mặt", status: "PAID" },
    { id: "HD20261010002", patient: "Lê Hùng Cường", appointment: "LH20261010003", createdAt: "2026-10-10 15:45", total: 150000, method: "—", status: "UNPAID" },
  ],
};

const MODULES = {
  accounts: {
    title: "Tài khoản & phân quyền",
    description: "Quản lý tài khoản đăng nhập, vai trò và trạng thái hoạt động.",
    addLabel: "Tạo tài khoản",
    fields: [
      ["name", "Họ và tên", "text", true],
      ["username", "Tên đăng nhập", "text", true],
      ["role", "Vai trò", "select", true, ["ADMIN", "DOCTOR", "STAFF", "PATIENT"]],
      ["email", "Email", "email"],
      ["phone", "Số điện thoại", "tel"],
      ["status", "Trạng thái", "select", true, ["ACTIVE", "LOCKED"]],
    ],
    columns: [
      ["name", "Tài khoản", "person"],
      ["username", "Tên đăng nhập"],
      ["role", "Vai trò"],
      ["email", "Email"],
      ["phone", "Số điện thoại"],
      ["lastActive", "Hoạt động gần nhất"],
      ["status", "Trạng thái", "status"],
    ],
    mutable: true,
    statusField: "status",
  },
  patients: {
    title: "Danh sách bệnh nhân",
    description: "Tra cứu thông tin hành chính và lịch sử lượt khám.",
    columns: [
      ["name", "Bệnh nhân", "person"],
      ["id", "Mã bệnh nhân"],
      ["phone", "Số điện thoại"],
      ["gender", "Giới tính"],
      ["birthDate", "Ngày sinh"],
      ["bloodType", "Nhóm máu"],
      ["appointments", "Lượt khám"],
      ["status", "Trạng thái", "status"],
    ],
  },
  doctors: {
    title: "Quản lý bác sĩ",
    description: "Danh sách bác sĩ, chuyên khoa phụ trách và phí khám.",
    addLabel: "Thêm bác sĩ",
    fields: [
      ["name", "Họ và tên", "text", true],
      ["specialty", "Chuyên khoa", "text", true],
      ["degree", "Học vị", "text"],
      ["experience", "Số năm kinh nghiệm", "number"],
      ["fee", "Phí khám (₫)", "number"],
      ["status", "Trạng thái", "select", true, ["ACTIVE", "INACTIVE"]],
    ],
    columns: [
      ["name", "Bác sĩ", "person"],
      ["id", "Mã bác sĩ"],
      ["specialty", "Chuyên khoa"],
      ["degree", "Học vị"],
      ["experience", "Kinh nghiệm"],
      ["fee", "Phí khám", "money"],
      ["status", "Trạng thái", "status"],
    ],
    mutable: true,
    statusField: "status",
  },
  specialties: {
    title: "Quản lý chuyên khoa",
    description: "Quản lý danh mục chuyên khoa và trạng thái nhận lịch mới.",
    addLabel: "Thêm chuyên khoa",
    fields: [
      ["name", "Tên chuyên khoa", "text", true],
      ["description", "Mô tả", "textarea"],
      ["fee", "Phí khám chuẩn (₫)", "number"],
      ["status", "Trạng thái", "select", true, ["ACTIVE", "INACTIVE"]],
    ],
    columns: [
      ["name", "Chuyên khoa"],
      ["id", "Mã khoa"],
      ["description", "Mô tả"],
      ["doctors", "Bác sĩ"],
      ["fee", "Phí khám", "money"],
      ["status", "Trạng thái", "status"],
    ],
    mutable: true,
    statusField: "status",
  },
  rooms: {
    title: "Quản lý phòng khám",
    description: "Theo dõi phòng khám và chuyên khoa được phân công.",
    addLabel: "Thêm phòng",
    fields: [
      ["name", "Tên phòng", "text", true],
      ["specialty", "Chuyên khoa", "text", true],
      ["floor", "Tầng", "text"],
      ["capacity", "Số bác sĩ đồng thời", "number"],
      ["status", "Trạng thái", "select", true, ["ACTIVE", "INACTIVE"]],
    ],
    columns: [
      ["name", "Phòng khám"],
      ["id", "Mã phòng"],
      ["specialty", "Chuyên khoa"],
      ["floor", "Vị trí"],
      ["capacity", "Sức chứa"],
      ["status", "Trạng thái", "status"],
    ],
    mutable: true,
    statusField: "status",
  },
  schedules: {
    title: "Lịch làm việc bác sĩ",
    description: "Giám sát khung giờ, phòng khám và số chỗ đã được đặt.",
    columns: [
      ["id", "Mã lịch"],
      ["doctor", "Bác sĩ"],
      ["room", "Phòng"],
      ["date", "Ngày khám"],
      ["time", "Khung giờ"],
      ["capacity", "Đã đặt / tối đa", "capacity"],
      ["status", "Trạng thái", "status"],
    ],
  },
  appointments: {
    title: "Theo dõi lịch hẹn",
    description: "Theo dõi nguồn đặt, bác sĩ phụ trách và tiến độ lượt khám.",
    columns: [
      ["id", "Mã lịch hẹn"],
      ["patient", "Bệnh nhân", "person"],
      ["doctor", "Bác sĩ"],
      ["specialty", "Chuyên khoa"],
      ["date", "Ngày khám"],
      ["time", "Giờ"],
      ["source", "Nguồn"],
      ["status", "Trạng thái", "status"],
    ],
  },
  medicines: {
    title: "Thuốc & tồn kho",
    description: "Quản lý danh mục thuốc, giá bán và tồn kho hiện tại.",
    addLabel: "Thêm thuốc",
    fields: [
      ["name", "Tên thuốc", "text", true],
      ["ingredient", "Hoạt chất", "text"],
      ["unit", "Đơn vị tính", "text"],
      ["price", "Đơn giá (₫)", "number", true],
      ["stock", "Tồn kho", "number", true],
      ["status", "Trạng thái", "select", true, ["ACTIVE", "INACTIVE"]],
    ],
    columns: [
      ["name", "Thuốc"],
      ["id", "Mã thuốc"],
      ["ingredient", "Hoạt chất"],
      ["unit", "Đơn vị"],
      ["price", "Đơn giá", "money"],
      ["stock", "Tồn kho", "stock"],
      ["status", "Trạng thái", "status"],
    ],
    mutable: true,
    statusField: "status",
  },
  services: {
    title: "Dịch vụ y tế",
    description: "Quản lý dịch vụ cận lâm sàng và bảng giá hiện hành.",
    addLabel: "Thêm dịch vụ",
    fields: [
      ["name", "Tên dịch vụ", "text", true],
      ["specialty", "Chuyên khoa", "text"],
      ["price", "Đơn giá (₫)", "number", true],
      ["unit", "Đơn vị tính", "text"],
      ["status", "Trạng thái", "select", true, ["ACTIVE", "INACTIVE"]],
    ],
    columns: [
      ["name", "Dịch vụ y tế"],
      ["id", "Mã dịch vụ"],
      ["specialty", "Chuyên khoa"],
      ["unit", "Đơn vị"],
      ["price", "Đơn giá", "money"],
      ["status", "Trạng thái", "status"],
    ],
    mutable: true,
    statusField: "status",
  },
  invoices: {
    title: "Hóa đơn & thanh toán",
    description: "Theo dõi lịch sử hóa đơn và tình trạng thanh toán.",
    columns: [
      ["id", "Mã hóa đơn"],
      ["patient", "Bệnh nhân", "person"],
      ["appointment", "Mã lượt khám"],
      ["createdAt", "Thời gian"],
      ["total", "Tổng tiền", "money"],
      ["method", "Phương thức"],
      ["status", "Thanh toán", "status"],
    ],
  },
};

const MODULE_DATA_KEY = {
  accounts: "accounts",
  patients: "patients",
  doctors: "doctors",
  specialties: "specialties",
  rooms: "rooms",
  schedules: "schedules",
  appointments: "appointments",
  medicines: "medicines",
  services: "services",
  invoices: "invoices",
};

const EMPTY_ROWS = [];

const STATUS_LABELS = {
  ACTIVE: "Đang hoạt động",
  LOCKED: "Đã khóa",
  INACTIVE: "Ngừng sử dụng",
  AVAILABLE: "Đang mở",
  CANCELLED: "Đã hủy",
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  CHECKED_IN: "Đã tiếp đón",
  IN_PROGRESS: "Đang khám",
  COMPLETED: "Hoàn tất",
  REJECTED: "Từ chối",
  NO_SHOW: "Không đến",
  PAID: "Đã thanh toán",
  UNPAID: "Chưa thanh toán",
  ONLINE: "Đặt online",
  WALK_IN: "Walk-in",
};

const CHART_VALUES = [42, 55, 47, 72, 60, 82, 68, 91, 74, 62, 86, 100];
const CURRENCY = new Intl.NumberFormat("vi-VN");

function formatMoney(value) {
  return `${CURRENCY.format(Number(value) || 0)} ₫`;
}

function Icon({ name, size = 20 }) {
  const paths = {
    overview: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="5" rx="2" /><rect x="13" y="10" width="8" height="11" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /></>,
    accounts: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 21v-1.5a6.5 6.5 0 0 1 13 0V21zM16 11a3.5 3.5 0 1 0 0-7M18 14a6 6 0 0 1 3.5 5.5V21" /></>,
    patients: <><circle cx="12" cy="8" r="3.5" /><path d="M4 21v-2a8 8 0 0 1 16 0v2z" /></>,
    doctors: <><path d="M12 3v5m-4-5h8" /><circle cx="12" cy="14" r="7" /><path d="M9 14h6m-3-3v6" /></>,
    specialties: <><path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /><path d="M12 8v8m-4-4h8" /></>,
    rooms: <><path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M2 21h20M8 7h2m4 0h2m-8 4h2m4 0h2m-6 10v-5h4v5" /></>,
    schedules: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18m2 3h.01M8 14h3v3H8z" /></>,
    appointments: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18m4 5 2 2 4-4" /></>,
    medicines: <><path d="M4.9 19.1a5 5 0 0 1 0-7.1l7.1-7.1a5 5 0 0 1 7.1 7.1L12 19.1a5 5 0 0 1-7.1 0Z" /><path d="m8.4 8.4 7.1 7.1" /></>,
    services: <><path d="M12 3v18m-9-9h18" /><circle cx="12" cy="12" r="9" /></>,
    invoices: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6m-6 4h6m-6 4h3" /></>,
    reports: <><path d="M4 19V5m0 14h17M7 15l4-4 3 2 5-6" /><path d="M16 7h3v3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <path d="M12 5v14m-7-7h14" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" /></>,
    edit: <><path d="m14 5 5 5M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16z" /></>,
    dots: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    filter: <><path d="M4 7h16M7 12h10m-7 5h4" /><circle cx="8" cy="7" r="2" /><circle cx="15" cy="12" r="2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function getInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase("vi");
}

function getStatusClass(value) {
  if (["ACTIVE", "AVAILABLE", "CONFIRMED", "COMPLETED", "PAID"].includes(value)) {
    return "is-positive";
  }
  if (["PENDING", "CHECKED_IN", "UNPAID"].includes(value)) return "is-warning";
  if (["LOCKED", "INACTIVE", "CANCELLED", "REJECTED", "NO_SHOW"].includes(value)) {
    return "is-muted";
  }
  if (value === "IN_PROGRESS") return "is-info";
  return "";
}

function AdminWorkspace({ onLogout }) {
  const [activeModule, setActiveModule] = useState("overview");
  const [data, setData] = useState(SEED_DATA);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [period, setPeriod] = useState("Tháng này");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allAppointments = data.appointments;
  const revenue = data.invoices
    .filter((invoice) => invoice.status === "PAID")
    .reduce((sum, invoice) => sum + invoice.total, 0);
  const todayAppointments = allAppointments.filter(
    (appointment) => appointment.date === "2026-10-11",
  ).length;
  const activeDoctors = data.doctors.filter(
    (doctor) => doctor.status === "ACTIVE",
  ).length;
  const lowStock = data.medicines.filter(
    (medicine) => medicine.status === "ACTIVE" && medicine.stock < 30,
  );
  const currentModule = MODULES[activeModule];
  const moduleRows = currentModule
    ? data[MODULE_DATA_KEY[activeModule]]
    : EMPTY_ROWS;

  const filteredRows = useMemo(() => {
    if (!currentModule) return [];
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return moduleRows.filter((row) => {
      const matchesQuery =
        !normalizedQuery ||
        Object.values(row).some((value) =>
          String(value).toLocaleLowerCase("vi").includes(normalizedQuery),
        );
      const matchesStatus =
        statusFilter === "ALL" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [currentModule, moduleRows, query, statusFilter]);

  const activeNavItem = NAVIGATION.flatMap((group) => group.items).find(
    (item) => item.id === activeModule,
  );

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const navigate = (moduleId) => {
    setActiveModule(moduleId);
    setQuery("");
    setStatusFilter("ALL");
    setMobileMenuOpen(false);
  };

  const startCreate = () => {
    const config = MODULES[activeModule];
    const values = Object.fromEntries(
      config.fields.map(([key, , type, , options]) => [
        key,
        type === "select" ? options[0] : "",
      ]),
    );
    setModal({ mode: "create", moduleId: activeModule, values });
  };

  const startEdit = (row) => {
    setModal({
      mode: "edit",
      moduleId: activeModule,
      id: row.id,
      values: Object.fromEntries(
        MODULES[activeModule].fields.map(([key]) => [key, row[key] ?? ""]),
      ),
    });
  };

  const saveModal = (event) => {
    event.preventDefault();
    const { moduleId, mode, id, values } = modal;
    const config = MODULES[moduleId];
    const missingRequired = config.fields.find(
      ([key, , , required]) =>
        required && String(values[key] ?? "").trim() === "" && key !== config.statusField,
    );
    if (missingRequired) {
      showToast(`Vui lòng nhập ${missingRequired[1].toLocaleLowerCase("vi")}.`);
      return;
    }

    if (
      moduleId === "specialties" &&
      data.specialties.some(
        (item) =>
          item.id !== id &&
          item.name.trim().toLocaleLowerCase("vi") ===
            String(values.name).trim().toLocaleLowerCase("vi"),
      )
    ) {
      showToast("Tên chuyên khoa đang bị trùng.");
      return;
    }

    if (moduleId === "medicines" && Number(values.stock) < 0) {
      showToast("Tồn kho không được nhỏ hơn 0.");
      return;
    }

    const collectionKey = MODULE_DATA_KEY[moduleId];
    setData((previous) => {
      const rows = previous[collectionKey];
      if (mode === "edit") {
        return {
          ...previous,
          [collectionKey]: rows.map((row) =>
            row.id === id
              ? {
                  ...row,
                  ...values,
                  ...(values.price !== undefined ? { price: Number(values.price) } : {}),
                  ...(values.fee !== undefined ? { fee: Number(values.fee) } : {}),
                  ...(values.stock !== undefined ? { stock: Number(values.stock) } : {}),
                  ...(values.experience !== undefined
                    ? { experience: Number(values.experience) }
                    : {}),
                }
              : row,
          ),
        };
      }
      return {
        ...previous,
        [collectionKey]: [
          {
            id: `${moduleId === "accounts" ? "ND" : moduleId === "doctors" ? "BS" : moduleId === "specialties" ? "CK" : moduleId === "rooms" ? "PK" : moduleId === "medicines" ? "TH" : "DV"}${String(Date.now()).slice(-4)}`,
            ...values,
            ...(values.price !== undefined ? { price: Number(values.price) } : {}),
            ...(values.fee !== undefined ? { fee: Number(values.fee) } : {}),
            ...(values.stock !== undefined ? { stock: Number(values.stock) } : {}),
            ...(values.experience !== undefined
              ? { experience: Number(values.experience) }
              : {}),
          },
          ...rows,
        ],
      };
    });
    setModal(null);
    showToast(mode === "edit" ? "Đã cập nhật dữ liệu demo." : "Đã thêm dữ liệu demo.");
  };

  const toggleStatus = (row) => {
    const config = MODULES[activeModule];
    if (
      activeModule === "specialties" &&
      row.status !== "ACTIVE" &&
      row.doctors === 0
    ) {
      showToast("Chưa thể mở chuyên khoa chưa có bác sĩ được phân công.");
      return;
    }
    const nextStatus =
      row[config.statusField] === "ACTIVE"
        ? activeModule === "accounts"
          ? "LOCKED"
          : "INACTIVE"
        : "ACTIVE";
    const safeStatus =
      row[config.statusField] === "AVAILABLE" ? "CANCELLED" : nextStatus;
    const collectionKey = MODULE_DATA_KEY[activeModule];
    setData((previous) => ({
      ...previous,
      [collectionKey]: previous[collectionKey].map((item) =>
        item.id === row.id ? { ...item, [config.statusField]: safeStatus } : item,
      ),
    }));
    showToast(
      safeStatus === "LOCKED" || safeStatus === "CANCELLED"
        ? "Đã tạm ngưng trong dữ liệu demo."
        : "Đã kích hoạt lại trong dữ liệu demo.",
    );
  };

  const renderCell = (row, [key, , type]) => {
    const value = row[key];
    if (type === "person") {
      return (
        <div className="admin-person-cell">
          <span className="admin-avatar">{getInitials(row.name || row.patient)}</span>
          <span>{value}</span>
        </div>
      );
    }
    if (type === "status") {
      return (
        <span className={`admin-status ${getStatusClass(value)}`}>
          <i />
          {STATUS_LABELS[value] || value}
        </span>
      );
    }
    if (type === "money" || key === "price" || key === "fee" || key === "total") {
      return formatMoney(value);
    }
    if (type === "capacity") {
      return (
        <div className="admin-capacity-cell">
          <span>{row.booked} / {row.maxPatients}</span>
          <span className="admin-capacity-track">
            <i style={{ width: `${Math.min((row.booked / row.maxPatients) * 100, 100)}%` }} />
          </span>
        </div>
      );
    }
    if (type === "stock") {
      return (
        <span className={value < 30 ? "admin-stock-low" : ""}>
          {CURRENCY.format(value)} {value < 30 && <b>Sắp hết</b>}
        </span>
      );
    }
    if (key === "role") {
      return <span className="admin-role-tag">{({ ADMIN: "Quản trị", DOCTOR: "Bác sĩ", STAFF: "Nhân viên", PATIENT: "Bệnh nhân" })[value] || value}</span>;
    }
    if (key === "source") {
      return <span className="admin-source-tag">{STATUS_LABELS[value] || value}</span>;
    }
    if (key === "experience") return `${value} năm`;
    if (key === "birthDate" && value) {
      const [year, month, day] = value.split("-");
      return `${day}/${month}/${year}`;
    }
    return value || "—";
  };

  const renderOverview = () => (
    <>
      <div className="admin-welcome-row">
        <div>
          <p className="admin-eyebrow">TRUNG TÂM ĐIỀU HÀNH</p>
          <h1>Tổng quan phòng khám</h1>
          <p className="admin-page-subtitle">
            Theo dõi hoạt động và các chỉ số vận hành trong ngày.
          </p>
        </div>
        <button className="admin-date-button" type="button">
          <Icon name="calendar" size={18} />
          Chủ nhật, 11 tháng 10, 2026
        </button>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <div className="admin-stat-icon is-blue"><Icon name="appointments" /></div>
          <span className="admin-stat-label">Lịch hẹn hôm nay</span>
          <strong>{todayAppointments + 18}</strong>
          <span className="admin-stat-foot"><b>+12%</b> so với hôm qua</span>
          <span className="admin-stat-sparkline is-blue-line">▂▄▃▅▄▆▅▇</span>
        </article>
        <article className="admin-stat-card">
          <div className="admin-stat-icon is-green"><Icon name="patients" /></div>
          <span className="admin-stat-label">Lượt khám trong ngày</span>
          <strong>32</strong>
          <span className="admin-stat-foot"><b>24</b> hoàn tất · <b>8</b> đang chờ</span>
          <span className="admin-stat-sparkline is-green-line">▃▅▄▆▅▇▆█</span>
        </article>
        <article className="admin-stat-card">
          <div className="admin-stat-icon is-violet"><Icon name="reports" /></div>
          <span className="admin-stat-label">Doanh thu đã thu</span>
          <strong className="admin-stat-money">{formatMoney(revenue)}</strong>
          <span className="admin-stat-foot"><b>+8,4%</b> so với kỳ trước</span>
          <span className="admin-stat-sparkline is-violet-line">▂▃▅▄▆▅▇█</span>
        </article>
        <article className="admin-stat-card">
          <div className="admin-stat-icon is-amber"><Icon name="doctors" /></div>
          <span className="admin-stat-label">Bác sĩ đang hoạt động</span>
          <strong>{activeDoctors}<small> / {data.doctors.length}</small></strong>
          <span className="admin-stat-foot"><b>5</b> chuyên khoa đang mở</span>
          <span className="admin-stat-sparkline is-amber-line">▅▅▆▆▇▆▇█</span>
        </article>
      </div>

      <div className="admin-overview-grid">
        <section className="admin-panel admin-revenue-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Doanh thu phòng khám</h2>
              <p>Tổng doanh thu hóa đơn đã thanh toán</p>
            </div>
            <select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Chọn kỳ báo cáo">
              <option>Tháng này</option>
              <option>Quý này</option>
              <option>Năm nay</option>
            </select>
          </div>
          <div className="admin-revenue-total">
            <strong>{formatMoney(revenue + 12400000)}</strong>
            <span><b>↗ 8,4%</b> so với kỳ trước</span>
          </div>
          <div className="admin-chart">
            <div className="admin-chart-grid">
              <span>20tr</span><span>15tr</span><span>10tr</span><span>5tr</span><span>0</span>
            </div>
            <div className="admin-chart-bars">
              {CHART_VALUES.map((value, index) => (
                <div className="admin-chart-column" key={index}>
                  <span className="admin-chart-bar" style={{ height: `${value}%` }} />
                  <small>{["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23"][index]}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="admin-chart-legend"><i /> Doanh thu <span>Đơn vị: đồng</span></div>
        </section>

        <section className="admin-panel admin-operations-panel">
          <div className="admin-panel-heading">
            <div><h2>Tình hình vận hành</h2><p>Cập nhật theo dữ liệu mẫu</p></div>
            <button className="admin-icon-button" aria-label="Tùy chọn" type="button"><Icon name="dots" /></button>
          </div>
          <div className="admin-operation-list">
            <div><span className="admin-operation-icon is-blue"><Icon name="appointments" size={18} /></span><span><b>Lịch hẹn chờ xác nhận</b><small>Đang cần bác sĩ xử lý</small></span><strong>06</strong></div>
            <div><span className="admin-operation-icon is-green"><Icon name="patients" size={18} /></span><span><b>Bệnh nhân đang chờ</b><small>Trong hàng đợi khám</small></span><strong>08</strong></div>
            <div><span className="admin-operation-icon is-violet"><Icon name="invoices" size={18} /></span><span><b>Hóa đơn chưa thanh toán</b><small>Cần được thu ngân xử lý</small></span><strong>{data.invoices.filter((item) => item.status === "UNPAID").length.toString().padStart(2, "0")}</strong></div>
            <div><span className="admin-operation-icon is-amber"><Icon name="medicines" size={18} /></span><span><b>Thuốc sắp hết hàng</b><small>Tồn kho dưới 30 đơn vị</small></span><strong>{lowStock.length.toString().padStart(2, "0")}</strong></div>
          </div>
          <button className="admin-text-link" onClick={() => navigate("medicines")} type="button">Xem danh mục thuốc <Icon name="arrow" size={16} /></button>
        </section>
      </div>

      <div className="admin-lower-grid">
        <section className="admin-panel admin-recent-panel">
          <div className="admin-panel-heading">
            <div><h2>Lịch hẹn gần đây</h2><p>Các lượt khám mới nhất trong hệ thống</p></div>
            <button className="admin-text-link" onClick={() => navigate("appointments")} type="button">Tất cả lịch hẹn <Icon name="arrow" size={16} /></button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table admin-compact-table">
              <thead><tr><th>Bệnh nhân</th><th>Bác sĩ</th><th>Thời gian</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {allAppointments.slice(0, 4).map((appointment) => (
                  <tr key={appointment.id}>
                    <td><div className="admin-person-cell"><span className="admin-avatar">{getInitials(appointment.patient)}</span><span>{appointment.patient}<small>{appointment.id}</small></span></div></td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.date.slice(5).replace("-", "/")} · {appointment.time}</td>
                    <td><span className={`admin-status ${getStatusClass(appointment.status)}`}><i />{STATUS_LABELS[appointment.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="admin-panel admin-specialty-panel">
          <div className="admin-panel-heading"><div><h2>Lượt khám theo chuyên khoa</h2><p>Phân bố lượt khám trong tháng</p></div></div>
          <div className="admin-specialty-bars">
            {[["Nội khoa", 78, "blue"], ["Tim mạch", 62, "violet"], ["Nhi khoa", 48, "green"], ["Tai Mũi Họng", 34, "amber"]].map(([label, value, color]) => (
              <div className="admin-specialty-bar-row" key={label}><span>{label}</span><div><i className={`is-${color}`} style={{ width: `${value}%` }} /></div><b>{Math.round(value * 1.4)}</b></div>
            ))}
          </div>
          <button className="admin-text-link" onClick={() => navigate("specialties")} type="button">Quản lý chuyên khoa <Icon name="arrow" size={16} /></button>
        </section>
      </div>
    </>
  );

  const renderModule = () => {
    if (activeModule === "reports") return renderReports();
    const config = MODULES[activeModule];
    if (!config) return null;
    return (
      <>
        <div className="admin-welcome-row admin-module-welcome">
          <div>
            <p className="admin-eyebrow">QUẢN TRỊ HỆ THỐNG / {config.title.toLocaleUpperCase("vi")}</p>
            <h1>{config.title}</h1>
            <p className="admin-page-subtitle">{config.description}</p>
          </div>
          {config.mutable && (
            <button className="admin-primary-button" onClick={startCreate} type="button">
              <Icon name="plus" size={18} /> {config.addLabel}
            </button>
          )}
        </div>
        <section className="admin-panel admin-data-panel">
          <div className="admin-data-toolbar">
            <label className="admin-search">
              <Icon name="search" size={18} />
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm theo tên, mã hoặc thông tin..."
                value={query}
              />
            </label>
            <label className="admin-filter">
              <Icon name="filter" size={17} />
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Lọc trạng thái">
                <option value="ALL">Tất cả trạng thái</option>
                {[...new Set(moduleRows.map((row) => row.status).filter(Boolean))].map((status) => (
                  <option key={status} value={status}>{STATUS_LABELS[status] || status}</option>
                ))}
              </select>
            </label>
            <span className="admin-row-count">{filteredRows.length} bản ghi</span>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr>{config.columns.map((column) => <th key={column[0]}>{column[1]}</th>)}{(config.mutable || config.statusField) && <th className="admin-actions-heading">Thao tác</th>}</tr></thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    {config.columns.map((column) => <td key={column[0]}>{renderCell(row, column)}</td>)}
                    {(config.mutable || config.statusField) && (
                      <td className="admin-row-actions">
                        {config.mutable && <button className="admin-icon-button" onClick={() => startEdit(row)} title="Chỉnh sửa" type="button"><Icon name="edit" size={17} /></button>}
                        {config.statusField && (
                          <button
                            className="admin-row-action-link"
                            onClick={() => toggleStatus(row)}
                            type="button"
                          >
                            {row[config.statusField] === "ACTIVE" || row[config.statusField] === "AVAILABLE" ? "Ngừng" : "Kích hoạt"}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {filteredRows.length === 0 && <tr><td className="admin-empty-cell" colSpan={config.columns.length + 1}>Không tìm thấy dữ liệu phù hợp.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="admin-table-footer"><span>Đang hiển thị <b>{filteredRows.length}</b> trên <b>{moduleRows.length}</b> bản ghi</span><div><button disabled type="button">Trước</button><button className="is-current" type="button">1</button><button disabled type="button">Sau</button></div></div>
        </section>
        <div className="admin-demo-callout">
          <span>i</span>
          <p><b>Chế độ giao diện thử nghiệm.</b> Thay đổi trên màn hình chỉ lưu tạm trong bộ nhớ của trang và không ghi vào database.</p>
        </div>
      </>
    );
  };

  const renderReports = () => {
    const doctorRanking = data.doctors
      .map((doctor) => ({
        ...doctor,
        visitCount: allAppointments.filter(
          (appointment) => appointment.doctor === doctor.name,
        ).length,
      }))
      .sort((left, right) => right.visitCount - left.visitCount);
    const completedAppointments = allAppointments.filter(
      (appointment) => appointment.status === "COMPLETED",
    ).length;
    const onlineAppointments = allAppointments.filter(
      (appointment) => appointment.source === "ONLINE",
    ).length;
    const walkInAppointments = allAppointments.filter(
      (appointment) => appointment.source === "WALK_IN",
    ).length;

    return (
      <>
        <div className="admin-welcome-row admin-module-welcome">
          <div>
            <p className="admin-eyebrow">QUẢN TRỊ HỆ THỐNG / BÁO CÁO</p>
            <h1>Báo cáo & thống kê</h1>
            <p className="admin-page-subtitle">
              Tổng hợp doanh thu, lượt khám và hiệu suất bác sĩ.
            </p>
          </div>
          <div className="admin-report-actions">
            <select
              aria-label="Chọn kỳ báo cáo"
              onChange={(event) => setPeriod(event.target.value)}
              value={period}
            >
              <option>Tháng này</option>
              <option>Quý này</option>
              <option>Năm nay</option>
            </select>
            <button className="admin-primary-button" onClick={startExport} type="button">
              <Icon name="download" size={17} /> Xuất báo cáo
            </button>
          </div>
        </div>
        <div className="admin-report-stat-grid">
          <article><span>Doanh thu đã thu</span><strong>{formatMoney(revenue)}</strong><small className="is-up">↗ 8,4% so với kỳ trước</small></article>
          <article><span>Tổng lượt khám</span><strong>{allAppointments.length + 124}</strong><small className="is-up">↗ 12,6% so với kỳ trước</small></article>
          <article><span>Đặt lịch online</span><strong>{onlineAppointments + 93}</strong><small>{Math.round(((onlineAppointments + 93) / (onlineAppointments + walkInAppointments + 124)) * 100)}% tổng lượt</small></article>
          <article><span>Walk-in</span><strong>{walkInAppointments + 31}</strong><small>{Math.round(((walkInAppointments + 31) / (onlineAppointments + walkInAppointments + 124)) * 100)}% tổng lượt</small></article>
        </div>
        <div className="admin-report-grid">
          <section className="admin-panel admin-report-chart">
            <div className="admin-panel-heading"><div><h2>Doanh thu theo thời gian</h2><p>Doanh thu hóa đơn đã thanh toán · {period.toLocaleLowerCase("vi")}</p></div><span className="admin-report-chart-total">{formatMoney(revenue + 12400000)}</span></div>
            <div className="admin-chart admin-chart-large">
              <div className="admin-chart-grid"><span>20tr</span><span>15tr</span><span>10tr</span><span>5tr</span><span>0</span></div>
              <div className="admin-chart-bars">
                {CHART_VALUES.map((value, index) => (
                  <div className="admin-chart-column" key={index}><span className="admin-chart-bar" style={{ height: `${value}%` }} /><small>{["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23"][index]}</small></div>
                ))}
              </div>
            </div>
            <div className="admin-chart-legend"><i /> Doanh thu <span>Đơn vị: đồng</span></div>
          </section>
          <section className="admin-panel admin-report-source">
            <div className="admin-panel-heading"><div><h2>Nguồn bệnh nhân</h2><p>Phân loại lượt khám</p></div></div>
            <div className="admin-source-summary">
              <div className="admin-source-donut"><strong>{onlineAppointments + walkInAppointments + 124}</strong><small>lượt khám</small></div>
              <div className="admin-source-legend">
                <div><i className="is-online" /><span>Đặt lịch online</span><b>{onlineAppointments + 93}</b></div>
                <div><i className="is-walkin" /><span>Khám trực tiếp</span><b>{walkInAppointments + 31}</b></div>
              </div>
            </div>
            <div className="admin-source-foot"><span>Đã hoàn thành trong dữ liệu hiện có</span><b>{completedAppointments} lượt</b></div>
          </section>
        </div>
        <section className="admin-panel admin-ranking-panel">
          <div className="admin-panel-heading"><div><h2>Lượt khám theo bác sĩ</h2><p>Xếp hạng theo số lượt khám được tiếp nhận</p></div><span className="admin-ranking-period">{period}</span></div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Hạng</th><th>Bác sĩ</th><th>Chuyên khoa</th><th>Lượt khám</th><th>Trạng thái</th></tr></thead>
              <tbody>{doctorRanking.map((doctor, index) => (
                <tr key={doctor.id}><td><span className={`admin-rank-number${index === 0 ? " is-first" : ""}`}>{String(index + 1).padStart(2, "0")}</span></td><td><div className="admin-person-cell"><span className="admin-avatar">{getInitials(doctor.name)}</span><span>{doctor.name}<small>{doctor.id} · {doctor.degree}</small></span></div></td><td>{doctor.specialty}</td><td><b>{doctor.visitCount + [38, 31, 24, 17][index % 4]}</b> lượt</td><td><span className={`admin-status ${getStatusClass(doctor.status)}`}><i />{STATUS_LABELS[doctor.status] || doctor.status}</span></td></tr>
              ))}</tbody>
            </table>
          </div>
          <p className="admin-report-footnote">Số liệu hiển thị là dữ liệu minh họa cho giao diện, chưa được lấy từ hệ thống backend.</p>
        </section>
      </>
    );
  };

  const startExport = () => {
    const reportRows = data.doctors
      .map((doctor) => ({
        name: doctor.name,
        visits: allAppointments.filter(
          (appointment) => appointment.doctor === doctor.name,
        ).length,
      }))
      .sort((left, right) => right.visits - left.visits)
      .map((doctor, index) => [
        "Lượt khám theo bác sĩ",
        doctor.name,
        doctor.visits + [38, 31, 24, 17][index % 4],
      ]);
    const csvRows = currentModule
      ? [
          currentModule.columns.map((column) => column[1]),
          ...filteredRows.map((row) =>
            currentModule.columns.map(([key]) => row[key] ?? ""),
          ),
        ]
      : [
          ["Chỉ số", "Giá trị"],
          ["Kỳ báo cáo", period],
          ["Doanh thu đã thu", revenue],
          ["Tổng lượt khám", allAppointments.length + 124],
          ["Đặt lịch online", allAppointments.filter((item) => item.source === "ONLINE").length + 93],
          ["Walk-in", allAppointments.filter((item) => item.source === "WALK_IN").length + 31],
          ...reportRows,
        ];
    const csv = csvRows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `clinic-${activeModule}-demo.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
    showToast("Đã xuất báo cáo CSV dữ liệu demo.");
  };

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${mobileMenuOpen ? " is-open" : ""}`}>
        <div className="admin-brand">
          <span className="admin-brand-mark"><Icon name="specialties" size={23} /></span>
          <span><b>MedCare</b><small>CLINIC MANAGEMENT</small></span>
          <button className="admin-sidebar-close" onClick={() => setMobileMenuOpen(false)} aria-label="Đóng menu" type="button"><Icon name="close" /></button>
        </div>
        <div className="admin-clinic-switcher">
          <span className="admin-clinic-avatar">MC</span>
          <span><b>Phòng khám đa khoa</b><small>Cơ sở trung tâm</small></span>
          <Icon name="chevron" size={17} />
        </div>
        <nav className="admin-navigation" aria-label="Điều hướng quản trị">
          {NAVIGATION.map((group) => (
            <div className="admin-nav-group" key={group.group}>
              <p>{group.group}</p>
              {group.items.map((item) => (
                <button
                  className={`admin-nav-item${activeModule === item.id ? " is-active" : ""}`}
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  type="button"
                >
                  <Icon name={item.icon} size={19} />
                  <span>{item.label}</span>
                  {item.id === "medicines" && lowStock.length > 0 && <i>{lowStock.length}</i>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-help-card"><span>?</span><b>Cần hỗ trợ?</b><small>Xem hướng dẫn quản trị hệ thống</small><button onClick={() => showToast("Trung tâm trợ giúp đang ở chế độ demo.")} type="button">Mở trung tâm trợ giúp <Icon name="arrow" size={15} /></button></div>
          <div className="admin-user-profile">
            <span className="admin-profile-avatar">QA</span>
            <span><b>Quản trị viên</b><small>admin@clinic.vn</small></span>
            <button onClick={onLogout} aria-label="Đăng xuất" title="Đăng xuất" type="button"><Icon name="logout" size={18} /></button>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && <button className="admin-mobile-scrim" onClick={() => setMobileMenuOpen(false)} aria-label="Đóng menu" type="button" />}
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-mobile-menu" onClick={() => setMobileMenuOpen(true)} aria-label="Mở menu" type="button"><span /><span /><span /></button>
          <div className="admin-breadcrumb"><span>Phòng khám</span><Icon name="chevron" size={15} /><b>{activeNavItem?.label || "Tổng quan"}</b></div>
          <div className="admin-topbar-actions">
            <span className="admin-system-status"><i /> Hệ thống hoạt động</span>
            <button className="admin-notification-button" onClick={() => showToast(`${lowStock.length} thuốc cần kiểm tra tồn kho.`)} aria-label="Thông báo" type="button"><Icon name="bell" size={19} /><i /></button>
            <span className="admin-topbar-divider" />
            <button className="admin-topbar-profile" onClick={() => showToast("Đang sử dụng tài khoản quản trị demo.")} type="button"><span className="admin-profile-avatar">QA</span><span><b>Quản trị viên</b><small>Quản trị hệ thống</small></span><Icon name="chevron" size={15} /></button>
          </div>
        </header>
        <div className="admin-content">
          {activeModule === "overview" ? renderOverview() : renderModule()}
          <footer className="admin-footer"><span>© 2026 MedCare Clinic Management</span><span>Dữ liệu minh họa · Chưa kết nối backend</span></footer>
        </div>
      </main>

      {modal && (
        <div className="admin-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}>
          <section className="admin-modal" aria-labelledby="admin-modal-title" aria-modal="true" role="dialog">
            <div className="admin-modal-header"><div><p className="admin-eyebrow">{modal.mode === "create" ? "THÊM MỚI" : "CẬP NHẬT"}</p><h2 id="admin-modal-title">{modal.mode === "create" ? MODULES[modal.moduleId].addLabel : `Chỉnh sửa ${MODULES[modal.moduleId].title.toLocaleLowerCase("vi")}`}</h2></div><button className="admin-icon-button" onClick={() => setModal(null)} aria-label="Đóng" type="button"><Icon name="close" /></button></div>
            <form onSubmit={saveModal}>
              <div className="admin-form-grid">
                {MODULES[modal.moduleId].fields.map(([key, label, type = "text", required, options]) => (
                  <label className={type === "textarea" ? "is-full" : ""} key={key}>
                    <span>{label}{required && <i> *</i>}</span>
                    {type === "select" ? (
                      <select required={required} onChange={(event) => setModal((previous) => ({ ...previous, values: { ...previous.values, [key]: event.target.value } }))} value={modal.values[key]}>
                        {options.map((option) => <option key={option} value={option}>{STATUS_LABELS[option] || ({ ADMIN: "Quản trị viên", DOCTOR: "Bác sĩ", STAFF: "Nhân viên", PATIENT: "Bệnh nhân" })[option] || option}</option>)}
                      </select>
                    ) : type === "textarea" ? (
                      <textarea onChange={(event) => setModal((previous) => ({ ...previous, values: { ...previous.values, [key]: event.target.value } }))} rows={3} value={modal.values[key]} />
                    ) : (
                      <input
                        min={type === "number" ? 0 : undefined}
                        required={required}
                        type={type}
                        onChange={(event) => setModal((previous) => ({ ...previous, values: { ...previous.values, [key]: event.target.value } }))}
                        value={modal.values[key]}
                      />
                    )}
                  </label>
                ))}
              </div>
              <div className="admin-modal-note">Bản ghi này chỉ được thêm/cập nhật trong dữ liệu demo của giao diện.</div>
              <div className="admin-modal-actions"><button className="admin-secondary-button" onClick={() => setModal(null)} type="button">Hủy</button><button className="admin-primary-button" type="submit">{modal.mode === "create" ? "Thêm vào danh sách" : "Lưu thay đổi"}</button></div>
            </form>
          </section>
        </div>
      )}

      {toast && <div className="admin-toast" role="status">{toast}</div>}
    </div>
  );
}

export default AdminWorkspace;
