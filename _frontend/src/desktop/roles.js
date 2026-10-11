export const ROLE_CONFIG = {
  STAFF: {
    label: "Nhân viên",
    pages: [
      { id: "reception", label: "Tiếp đón & hàng đợi" },
      { id: "booking", label: "Đặt lịch bệnh nhân" },
    ],
  },
  DOCTOR: {
    label: "Bác sĩ",
    pages: [
      { id: "schedule", label: "Quản lý lịch trực" },
      { id: "examination", label: "Khám bệnh" },
    ],
  },
  ADMIN: {
    label: "Quản trị viên",
    pages: [{ id: "admin", label: "Quản trị hệ thống" }],
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
