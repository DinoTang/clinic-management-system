export const ROLE_CONFIG = {
  STAFF: {
    label: "Nhân viên",
    pages: [
      { id: "reception", label: "Tiếp đón & hàng đợi" },
      { id: "billing", label: "Thu ngân & Viện phí" },
    ],
  },
  DOCTOR: {
    label: "Bác sĩ",
    pages: [
      { id: "examination", label: "Khám bệnh" },
    ],
  },
  ADMIN: {
    label: "Quản trị viên",
    pages: [
      { id: "admin", label: "Tổng quan phòng khám" },
      { id: "schedules", label: "Quản lý lịch trực" },
    ],
  },
};

export function normalizeRole(value) {
  const role = String(value ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleUpperCase("vi");

  if (["DOCTOR", "BAC SI", "3"].includes(role)) return "DOCTOR";
  if (["STAFF", "NHAN VIEN", "2"].includes(role)) return "STAFF";
  if (["ADMIN", "QUAN TRI VIEN", "1"].includes(role)) return "ADMIN";
  return null;
}
