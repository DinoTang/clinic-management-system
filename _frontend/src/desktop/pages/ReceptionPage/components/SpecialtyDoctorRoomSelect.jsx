import React from "react";

export default function SpecialtyDoctorRoomSelect({
  specialties,
  selectedSpecialtyId,
  onSpecialtyChange,
  doctors,
  rooms,
  formData,
  setFormData,
  onDoctorChange,
  isDoctorOnDuty,
  today,
}) {
  return (
    <>
      {/* DÒNG: CHỌN CHUYÊN KHOA KHÁM */}
      <div style={{ marginBottom: "12px" }}>
        <label className="input-label">Chuyên Khoa Khám *</label>
        <select
          className="form-control"
          value={selectedSpecialtyId}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          required
        >
          <option value="">-- Chọn chuyên khoa khám bệnh --</option>
          {specialties.length > 0 ? (
            specialties.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name || spec.specialtyName || spec.departmentName} (
                {spec.id})
              </option>
            ))
          ) : (
            <>
              <option value="CK_NOI">Chuyên Khoa Nội Tổng Quát</option>
              <option value="CK_NHI">Chuyên Khoa Nhi</option>
              <option value="CK_TIM">Chuyên Khoa Tim Mạch</option>
              <option value="CK_RHM">Chuyên Khoa Răng Hàm Mặt</option>
              <option value="CK_MAT">Chuyên Khoa Mắt</option>
            </>
          )}
        </select>
      </div>

      {/* DÒNG: BÁC SĨ & PHÒNG KHÁM (LỌC THEO CHUYÊN KHOA) */}
      <div className="form-row">
        <div>
          <label className="input-label">Bác Sĩ Phụ Trách *</label>
          <select
            className="form-control"
            value={formData.doctorId}
            onChange={(e) => onDoctorChange(e.target.value)}
            disabled={!selectedSpecialtyId}
            required
          >
            <option value="">
              {selectedSpecialtyId
                ? "-- Chọn bác sĩ --"
                : "-- Chọn chuyên khoa trước --"}
            </option>
            {doctors
              .filter((d) => {
                if (!selectedSpecialtyId) return false;
                const docSpec =
                  d.departmentId || d.specialtyId || d.specialty?.id;
                return String(docSpec) === String(selectedSpecialtyId);
              })
              .map((d) => {
                const onDuty = isDoctorOnDuty(d.id);
                return (
                  <option key={d.id} value={d.id}>
                    {d.user?.fullName || d.fullName || d.name || "Bác sĩ"} ({d.id}){" "}
                    {onDuty ? "✓ [Có lịch trực]" : "✗ [Không có lịch trực]"}
                  </option>
                );
              })}
          </select>
          {formData.doctorId && !isDoctorOnDuty(formData.doctorId) && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "12px",
                marginTop: "4px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ⚠️ Bác sĩ này KHÔNG CÓ lịch trực ngày {formData.receptionDate || today}! Hệ thống sẽ chặn lưu.
            </div>
          )}
        </div>

        <div>
          <label className="input-label">Phòng Khám Chỉ Định *</label>
          <select
            className="form-control"
            value={formData.roomId}
            onChange={(e) =>
              setFormData({ ...formData, roomId: e.target.value })
            }
            disabled={!selectedSpecialtyId}
            required
          >
            <option value="">
              {selectedSpecialtyId
                ? "-- Chọn phòng khám --"
                : "-- Chọn chuyên khoa trước --"}
            </option>
            {rooms
              .filter((r) => {
                if (!selectedSpecialtyId) return false;
                const roomDept =
                  r.departmentId ||
                  r.specialtyId ||
                  r.machuyenkhoa ||
                  r.specialty?.id;
                return String(roomDept) === String(selectedSpecialtyId);
              })
              .map((r) => (
                <option key={r.id} value={r.id}>
                  {r.roomName || r.name} ({r.id})
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
}
