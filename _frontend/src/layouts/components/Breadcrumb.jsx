import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "@boxicons/react";

function Breadcrumb() {
  const location = useLocation();

  const routes = {
    "/admin": "Tổng quan",
    "/admin/accounts": "Quản lý tài khoản",
    "/admin/doctors": "Quản lý bác sĩ",
    "/admin/patients": "Quản lý bệnh nhân",
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