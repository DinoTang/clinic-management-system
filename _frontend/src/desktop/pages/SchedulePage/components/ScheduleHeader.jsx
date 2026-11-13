import React from "react";

export function ScheduleHeader({ onRefresh }) {
  return (
    <div className="schedule-header">
      <div>
        <h1>PHÒNG KHÁM ĐA KHOA</h1>
        <p>Quản lý lịch trực khám bệnh</p>
      </div>
      <button className="btn-refresh" onClick={onRefresh}>
        Làm mới
      </button>
    </div>
  );
}
