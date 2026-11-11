import React from "react";

export default function Step1DoctorSelect({
  specialties,
  bookingData,
  onSpecialtyChange,
  filteredDoctors,
  onDoctorChange,
  onNext,
}) {
  return (
    <div>
      <div className="form-group">
        <div>
          <label className="input-label">Chuyên Khoa Khám *</label>
          <select
            className="form-control"
            value={bookingData.specialtyId}
            onChange={onSpecialtyChange}
          >
            <option value="">-- Chọn chuyên khoa --</option>
            {specialties.map((s) => (
              <option key={s.id} value={s.id}>
                {s.specialtyName || s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="input-label">Bác Sĩ Điều Trị *</label>
          <select
            className="form-control"
            value={bookingData.doctorId}
            onChange={onDoctorChange}
            disabled={!bookingData.specialtyId}
          >
            <option value="">
              {!bookingData.specialtyId
                ? "-- Vui lòng chọn chuyên khoa trước --"
                : filteredDoctors.length === 0
                  ? "-- Không có bác sĩ trực thuộc khoa này --"
                  : "-- Chọn bác sĩ --"}
            </option>
            {filteredDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.fullName ||
                  doc.name ||
                  (doc.user && doc.user.fullName) ||
                  "Bác sĩ"}{" "}
                ({doc.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="button-row" style={{ justifyContent: "flex-end" }}>
        <button
          className="btn-primary"
          disabled={!bookingData.doctorId}
          onClick={onNext}
        >
          Tiếp tục: Chọn ngày & ca trực ➔
        </button>
      </div>
    </div>
  );
}
