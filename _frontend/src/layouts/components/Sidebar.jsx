import { 
  PlusShield, 
  ChevronRight, 
  GridCircleDiagonalRight, 
  Group, 
  User, 
  HeartPlus, 
  BuildingHospital, 
  CalendarPlus, 
  CalendarDetail, 
  Pill, 
  PlusBig, 
  Receipt, 
  ChartLine 
} from '@boxicons/react';
import { NavLink } from 'react-router-dom';

function Sidebar({ className }) {
  const navGroups = [
    {
      title: "TỔNG QUAN",
      items: [
        { path: "/admin", label: "Tổng quan", icon: <GridCircleDiagonalRight /> }
      ]
    },
    {
      title: "DANH MỤC & NHÂN SỰ",
      items: [
        { path: "/admin/accounts", label: "Tài khoản & phân quyền", icon: <Group /> },
        { path: "/admin/patients", label: "Bệnh nhân", icon: <User /> },
        { path: "/admin/doctors", label: "Bác sĩ", icon: <HeartPlus /> },
        { path: "/admin/specialties", label: "Chuyên khoa", icon: <PlusShield /> },
        { path: "/admin/clinics", label: "Phòng khám", icon: <BuildingHospital /> },
      ]
    },
    {
      title: "VẬN HÀNH KHÁM",
      items: [
        { path: "/admin/schedules", label: "Lịch làm việc", icon: <CalendarPlus /> },
        { path: "/admin/appointments", label: "Lịch hẹn", icon: <CalendarDetail /> },
      ]
    },
    {
      title: "DỊCH VỤ & TÀI CHÍNH",
      items: [
        { path: "/admin/inventory", label: "Thuốc & tồn kho", icon: <Pill /> },
        { path: "/admin/services", label: "Dịch vụ y tế", icon: <PlusBig /> },
        { path: "/admin/invoices", label: "Hóa đơn", icon: <Receipt /> },
        { path: "/admin/reports", label: "Báo cáo", icon: <ChartLine /> },
      ]
    }
  ];

  const baseNavItemClass = "flex w-full !min-h-[2.4rem] items-center !gap-[0.6rem] !px-[0.6rem] !py-[0.5rem] border-0 rounded-[0.7rem] text-[0.75rem] text-left transition-colors duration-[140ms] ease-in-out";

  return (
    <div className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-gray-200 bg-white ${className || ''}`}>
        <div className="flex h-[4.5rem] shrink-0 items-center gap-[0.9rem] !px-[1.3rem] border-b border-[#f0f1f3]">
            <div className="grid w-[2.45rem] h-[2.45rem] shrink-0 place-items-center rounded-[0.8rem] text-white bg-gradient-to-br from-[#4098e6] to-[#1766b9] shadow-[0_5px_12px_rgba(40,120,208,0.19)]">
                <PlusShield />
            </div>
            <div className="flex flex-col justify-center gap-1 leading-none">
                <span className="font-bold text-base text-slate-800">ADMIN DASHBOARD</span>
                <small className="text-[10px] text-gray-400 font-medium tracking-wider uppercase block mt-0.5">
                CLINIC MANAGEMENT
                </small>
            </div>
        </div>

        <nav className="flex-1 overflow-auto !pt-1 !px-3 pb-4">
        {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="!mt-4">
                <p className="!mt-0 !mr-0 !mb-[0.4rem] !ml-[0.6rem] text-[#98a2b3] text-[0.5625rem] font-[750] tracking-[0.05rem]">
                {group.title}
                </p>
            
                <div className="flex flex-col gap-1">
                    {group.items.map((item, itemIdx) => (
                    <NavLink
                        key={itemIdx}
                        to={item.path}
                        end
                        className={({ isActive }) => 
                        `${baseNavItemClass} ${
                        isActive 
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-[#667085] bg-transparent hover:bg-slate-800 hover:text-white"
                        }`
                    }
                    >
                    {item.icon}
                    <span>{item.label}</span>
                    </NavLink>
                    ))}
                </div>
            </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
