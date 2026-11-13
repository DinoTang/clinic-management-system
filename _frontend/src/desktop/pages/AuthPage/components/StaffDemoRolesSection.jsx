import React from "react";
import { StaffLoginIcon } from "./StaffLoginIcon.jsx";

export function StaffDemoRolesSection({ onSelectRole }) {
  return (
    <div className="staff-demo-roles">
      <button
        className="staff-demo-role"
        onClick={() =>
          onSelectRole({ mode: "demo", role: "DOCTOR", doctorId: "BS001" })
        }
        type="button"
      >
        <span className="staff-demo-role-icon">
          <StaffLoginIcon name="doctor" size={25} />
        </span>
        <span className="staff-demo-role-copy">
          <strong>Bác sĩ</strong>
          <span>Khám bệnh và kê đơn</span>
        </span>
        <StaffLoginIcon name="arrow" size={20} />
      </button>

      <button
        className="staff-demo-role"
        onClick={() =>
          onSelectRole({ mode: "demo", role: "STAFF", staffId: "NV001" })
        }
        type="button"
      >
        <span className="staff-demo-role-icon">
          <StaffLoginIcon name="staff" size={25} />
        </span>
        <span className="staff-demo-role-copy">
          <strong>Nhân viên</strong>
          <span>Tiếp đón và thu viện phí</span>
        </span>
        <StaffLoginIcon name="arrow" size={20} />
      </button>

      <button
        className="staff-demo-role"
        onClick={() => onSelectRole({ mode: "demo", role: "ADMIN" })}
        type="button"
      >
        <span className="staff-demo-role-icon">
          <StaffLoginIcon name="admin" size={25} />
        </span>
        <span className="staff-demo-role-copy">
          <strong>Quản trị viên</strong>
          <span>Quản lý và theo dõi toàn hệ thống</span>
        </span>
        <StaffLoginIcon name="arrow" size={20} />
      </button>
    </div>
  );
}
