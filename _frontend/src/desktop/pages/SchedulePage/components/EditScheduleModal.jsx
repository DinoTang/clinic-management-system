import React from "react";
import { SCHEDULE_STATUS_OPTIONS } from "../scheduleConstants.js";

export function EditScheduleModal({
  isOpen,
  editingScheduleId,
  editFormData,
  editErrors,
  doctors,
  editAvailableRooms,
  editLoadingRooms,
  onClose,
  onDoctorChange,
  onChange,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Chỉnh Sửa Lịch Trực ({editingScheduleId})</h3>
          <button className="btn-close-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="form-group" onSubmit={onSave} noValidate>
          <div>
            <label className="input-label">Bác Sĩ *</label>
            <select
              className={`form-control ${editErrors.doctorId ? "input-error" : ""}`}
              name="doctorId"
              value={editFormData.doctorId}
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
            {editErrors.doctorId && (
              <span className="error-text">{editErrors.doctorId}</span>
            )}
          </div>

          <div>
            <label className="input-label">Phòng Khám *</label>
            <select
              className={`form-control ${editErrors.roomId ? "input-error" : ""}`}
              name="roomId"
              value={editFormData.roomId}
              onChange={onChange}
              disabled={!editFormData.doctorId || editLoadingRooms}
            >
              <option value="">
                {editLoadingRooms
                  ? "-- Đang tải phòng... --"
                  : !editFormData.doctorId
                    ? "-- Vui lòng chọn Bác sĩ trước --"
                    : editAvailableRooms.length === 0
                      ? "-- Không có phòng cùng chuyên khoa --"
                      : "-- Chọn phòng khám --"}
              </option>
              {editAvailableRooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} - {r.roomName}
                </option>
              ))}
            </select>
            {editErrors.roomId && (
              <span className="error-text">{editErrors.roomId}</span>
            )}
          </div>

          <div>
            <label className="input-label">Ngày Khám *</label>
            <input
              className={`form-control ${editErrors.examinationDate ? "input-error" : ""}`}
              type="date"
              name="examinationDate"
              value={editFormData.examinationDate}
              onChange={onChange}
            />
            {editErrors.examinationDate && (
              <span className="error-text">{editErrors.examinationDate}</span>
            )}
          </div>

          <div className="form-row">
            <div>
              <label className="input-label">Giờ Bắt Đầu *</label>
              <input
                className={`form-control ${editErrors.startTime ? "input-error" : ""}`}
                type="time"
                name="startTime"
                value={editFormData.startTime}
                onChange={onChange}
              />
              {editErrors.startTime && (
                <span className="error-text">{editErrors.startTime}</span>
              )}
            </div>
            <div>
              <label className="input-label">Giờ Kết Thúc *</label>
              <input
                className={`form-control ${editErrors.endTime ? "input-error" : ""}`}
                type="time"
                name="endTime"
                value={editFormData.endTime}
                onChange={onChange}
              />
              {editErrors.endTime && (
                <span className="error-text">{editErrors.endTime}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div>
              <label className="input-label">BN Tối Đa *</label>
              <input
                className={`form-control ${editErrors.maxPatients ? "input-error" : ""}`}
                type="number"
                name="maxPatients"
                min="1"
                max="100"
                value={editFormData.maxPatients}
                onChange={onChange}
              />
              {editErrors.maxPatients && (
                <span className="error-text">{editErrors.maxPatients}</span>
              )}
            </div>
            <div>
              <label className="input-label">Trạng Thái</label>
              <select
                className="form-control"
                name="status"
                value={editFormData.status}
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

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className="btn-save">
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
