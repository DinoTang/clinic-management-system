import React from "react";
import { AdminIcon } from "./AdminIcon.jsx";

export function AdminTopbar({
  activeNavItem,
  lowStockCount,
  onOpenMobile,
  onNotificationClick,
  onProfileClick,
}) {
  return (
    <header className="admin-topbar">
      <button
        className="admin-mobile-menu"
        onClick={onOpenMobile}
        aria-label="Mở menu"
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="admin-breadcrumb">
        <span>Phòng khám</span>
        <AdminIcon name="chevron" size={15} />
        <b>{activeNavItem?.label || "Tổng quan"}</b>
      </div>

      <div className="admin-topbar-actions">
        <span className="admin-system-status">
          <i /> Hệ thống hoạt động
        </span>
        <button
          className="admin-notification-button"
          onClick={onNotificationClick}
          aria-label="Thông báo"
          type="button"
        >
          <AdminIcon name="bell" size={19} />
          {lowStockCount > 0 && <i />}
        </button>
        <span className="admin-topbar-divider" />
        <button
          className="admin-topbar-profile"
          onClick={onProfileClick}
          type="button"
        >
          <span className="admin-profile-avatar">QA</span>
          <span>
            <b>Quản trị viên</b>
            <small>Quản trị hệ thống</small>
          </span>
          <AdminIcon name="chevron" size={15} />
        </button>
      </div>
    </header>
  );
}
