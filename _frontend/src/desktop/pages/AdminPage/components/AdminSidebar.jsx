import React from "react";
import { NAVIGATION } from "../adminConstants.js";
import { AdminIcon } from "./AdminIcon.jsx";

export function AdminSidebar({
  activeModule,
  mobileMenuOpen,
  lowStockCount,
  onNavigate,
  onCloseMobile,
  onLogout,
  onShowHelp,
}) {
  return (
    <aside className={`admin-sidebar${mobileMenuOpen ? " is-open" : ""}`}>
      <div className="admin-brand">
        <span className="admin-brand-mark">
          <AdminIcon name="specialties" size={23} />
        </span>
        <span>
          <b>MedCare</b>
          <small>CLINIC MANAGEMENT</small>
        </span>
        <button
          className="admin-sidebar-close"
          onClick={onCloseMobile}
          aria-label="Đóng menu"
          type="button"
        >
          <AdminIcon name="close" />
        </button>
      </div>

      <div className="admin-clinic-switcher">
        <span className="admin-clinic-avatar">MC</span>
        <span>
          <b>Phòng khám đa khoa</b>
          <small>Cơ sở trung tâm</small>
        </span>
        <AdminIcon name="chevron" size={17} />
      </div>

      <nav className="admin-navigation" aria-label="Điều hướng quản trị">
        {NAVIGATION.map((group) => (
          <div className="admin-nav-group" key={group.group}>
            <p>{group.group}</p>
            {group.items.map((item) => (
              <button
                className={`admin-nav-item${activeModule === item.id ? " is-active" : ""}`}
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                <AdminIcon name={item.icon} size={19} />
                <span>{item.label}</span>
                {item.id === "medicines" && lowStockCount > 0 && (
                  <i>{lowStockCount}</i>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <div className="admin-help-card">
          <span>?</span>
          <b>Cần hỗ trợ?</b>
          <small>Xem hướng dẫn quản trị hệ thống</small>
          <button onClick={onShowHelp} type="button">
            Mở trung tâm trợ giúp <AdminIcon name="arrow" size={15} />
          </button>
        </div>
        <div className="admin-user-profile">
          <span className="admin-profile-avatar">QA</span>
          <span>
            <b>Quản trị viên</b>
            <small>admin@clinic.vn</small>
          </span>
          <button
            onClick={onLogout}
            aria-label="Đăng xuất"
            title="Đăng xuất"
            type="button"
          >
            <AdminIcon name="logout" size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
