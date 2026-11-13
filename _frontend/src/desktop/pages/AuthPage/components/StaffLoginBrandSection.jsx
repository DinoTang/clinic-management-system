import React from "react";
import appIcon from "../../../../assets/IconApp.png";
import { StaffLoginIcon } from "./StaffLoginIcon.jsx";

export function StaffLoginBrandSection() {
  return (
    <section className="staff-login-brand" aria-label="Giới thiệu hệ thống">
      <div className="staff-brand-heading">
        <span className="staff-brand-icon">
          <img src={appIcon} alt="" />
        </span>
        <span className="staff-brand-name">Hệ thống quản lý phòng khám</span>
      </div>

      <div className="staff-brand-copy">
        <span className="staff-brand-eyebrow">CỔNG THÔNG TIN NỘI BỘ</span>
        <h1>Chăm sóc tốt hơn, cùng nhau.</h1>
        <p>
          Không gian làm việc dành riêng cho đội ngũ y tế, kết nối tận tâm trong
          từng bước chăm sóc sức khỏe.
        </p>
      </div>

      <div className="staff-brand-footnote">
        <span className="staff-brand-shield">
          <StaffLoginIcon name="shield" size={19} />
        </span>
        <span>Truy cập dành cho đội ngũ y tế</span>
      </div>
    </section>
  );
}
