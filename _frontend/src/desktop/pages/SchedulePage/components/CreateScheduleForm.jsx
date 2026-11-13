import React from "react";
import { SCHEDULE_STATUS_OPTIONS } from "../scheduleConstants.js";

export function CreateScheduleForm({
  formData,
  errors,
  doctors,
  availableRooms,
  loadingRooms,
  onDoctorChange,
  onChange,
  onSubmit,
}) {
  return (
    <div className="card-box" style={{ height: "fit-content" }}>
      <h2 className="card-title">Tạo Lịch Trực Mới</h2>
      <form className="form-group" onSubmit={onSubmit} noValidate>
        <div>
          <label className="input-label">Bác Sĩ *</label>
          <select
            className={`form-control ${errors.doctorId ? "input-error" : ""}`}
            name="doctorId"
            value={formData.doctorId}
            onChange={onDoctorChange}
          >
            <option value="">-- Chọn bác sĩ --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.id} -{" "}
                {doc.fullName ||
                  doc.name ||
                  (doc.user && doc.user.fullName) ||
                  "Bác sĩ"}
              </option>
            ))}
          </select>
          {errors.doctorId && (
            <span className="error-text">{errors.doctorId}</span>
          )}
        </div>

        <div>
          <label className="input-label">Phòng Khám *</label>
          <select
            className={`form-control ${errors.roomId ? "input-error" : ""}`}
            name="roomId"
            value={formData.roomId}
            onChange={onChange}
            disabled={!formData.doctorId || loadingRooms}
          >
            <option value="">
              {loadingRooms
                ? "-- Đang tải phòng... --"
                : !formData.doctorId
                  ? "-- Vui lòng chọn Bác sĩ trước --"
                  : availableRooms.length === 0
                    ? "-- Không có phòng cùng chuyên khoa --"
                    : "-- Chọn phòng khám --"}
            </option>
            {availableRooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} - {r.roomName}
              </option>
            ))}
          </select>
          {errors.roomId && <span className="error-text">{errors.roomId}</span>}
        </div>

        <div>
          <label className="input-label">Ngày Khám *</label>
          <input
            className={`form-control ${errors.examinationDate ? "input-error" : ""}`}
            type="date"
            name="examinationDate"
            value={formData.examinationDate}
            onChange={onChange}
          />
          {errors.examinationDate && (
            <span className="error-text">{errors.examinationDate}</span>
          )}
        </div>

        <div className="form-row">
          <div>
            <label className="input-label">Giờ Bắt Đầu *</label>
            <input
              className={`form-control ${errors.startTime ? "input-error" : ""}`}
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={onChange}
            />
            {errors.startTime && (
              <span className="error-text">{errors.startTime}</span>
            )}
          </div>
          <div>
            <label className="input-label">Giờ Kết Thúc *</label>
            <input
              className={`form-control ${errors.endTime ? "input-error" : ""}`}
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={onChange}
            />
            {errors.endTime && (
              <span className="error-text">{errors.endTime}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div>
            <label className="input-label">BN Tối Đa *</label>
            <input
              className={`form-control ${errors.maxPatients ? "input-error" : ""}`}
              type="number"
              name="maxPatients"
              min="1"
              max="100"
              value={formData.maxPatients}
              onChange={onChange}
            />
            {errors.maxPatients && (
              <span className="error-text">{errors.maxPatients}</span>
            )}
          </div>
          <div>
            <label className="input-label">Trạng Thái</label>
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={onChange}
            >
              {SCHEDULE_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          + Thêm Lịch Trực
        </button>
      </form>
    </div>
  );
}
