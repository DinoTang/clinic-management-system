import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "@boxicons/react";

function Breadcrumb() {
  const location = useLocation();

  const routes = {
    // TỔNG QUAN
    "/admin": "Tổng quan",
    "/admin/notifications": "Thông báo & Nhắc lịch",

    // DANH MỤC & NHÂN SỰ
    "/admin/accounts": "Quản lý tài khoản & phân quyền",
    "/admin/staffs": "Quản lý nhân viên & lễ tân",
    "/admin/patients": "Quản lý bệnh nhân",
    "/admin/doctors": "Quản lý bác sĩ",
    "/admin/specialties": "Quản lý chuyên khoa",
    "/admin/clinics": "Quản lý phòng khám",
    "/admin/rooms": "Quản lý phòng chức năng & giường",

    // VẬN HÀNH KHÁM
    "/admin/schedules": "Quản lý lịch làm việc",
    "/admin/appointments": "Quản lý lịch hẹn",
    "/admin/queue": "Điều phối & Hàng đợi",
    "/admin/medical-records": "Hồ sơ bệnh án",
    "/admin/prescriptions": "Quản lý đơn thuốc",
    "/admin/lab-tests": "Xét nghiệm & Cận lâm sàng",

    // DỊCH VỤ & TÀI CHÍNH
    "/admin/medicines": "Quản lý thuốc & tồn kho",
    "/admin/supplies": "Vật tư & Thiết bị y tế",
    "/admin/services": "Quản lý dịch vụ y tế",
    "/admin/promotions": "Gói khám & Khuyến mãi",
    "/admin/invoices": "Quản lý hóa đơn",
    "/admin/insurance": "Bảo hiểm y tế",
    "/admin/reports": "Báo cáo & Thống kê",

    // CHĂM SÓC & NỘI DUNG
    "/admin/reviews": "Đánh giá & Phản hồi",
    "/admin/articles": "Tin tức & Cẩm nang y tế",
    "/admin/banners": "Quản lý Banner",

    // HỆ THỐNG
    "/admin/settings": "Cấu hình phòng khám",
    "/admin/audit-logs": "Nhật ký hệ thống",
  };

  const currentPage = routes[location.pathname] || "Trang hiện tại";

  return (
    <div className="flex flex-row items-center gap-[0.5rem] text-[#98a2b3] text-[0.75rem]">
      <Link to="/admin">Phòng khám</Link>
      <ChevronRight />
      <b className="text-black">{currentPage}</b>
    </div>
  );
}

export default Breadcrumb;
