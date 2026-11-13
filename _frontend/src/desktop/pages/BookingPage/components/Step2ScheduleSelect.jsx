import React from "react";

export default function Step2ScheduleSelect({
  today,
  bookingData,
  setBookingData,
  onDateChange,
  loading,
  availableSchedules,
  onBack,
  onNext,
}) {
  return (
    <div>
      <div className="form-group">
        <div>
          <label className="input-label">Ngày Khám Dự Kiến *</label>
          <input
            type="date"
            className="form-control"
            min={today}
            value={bookingData.examinationDate}
            onChange={onDateChange}
          />
        </div>

        <div>
          <label className="input-label">Các Ca Khám Còn Nhận Khách:</label>
          {loading ? (
            <p style={{ color: "#64748b" }}>Đang nạp các ca trực...</p>
          ) : availableSchedules.length === 0 ? (
            <div
              style={{
                padding: "16px",
                background: "#fff3cd",
                borderRadius: "8px",
                color: "#856404",
              }}
            >
              Không có ca trực nào còn mở đăng ký trong ngày này. Vui lòng chọn
              ngày khác!
            </div>
          ) : (
            <div className="schedules-grid">
              {availableSchedules.map((item) => {
                const isSelected =
                  bookingData.selectedSchedule?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`schedule-card ${isSelected ? "selected" : ""}`}
                    onClick={() =>
                      setBookingData((prev) => ({
                        ...prev,
                        selectedSchedule: item,
                      }))
                    }
                  >
                    <h4>
                      Ca: {item.startTime} - {item.endTime}
                    </h4>
                    <p>
                      Mã ca: <b>{item.id}</b>
                    </p>
                    <p>
                      Phòng: <span className="badge-room">{item.roomId}</span>
                    </p>
                    <p>Chỉ tiêu: {item.maxPatients} BN</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="button-row">
        <button className="btn-secondary" onClick={onBack}>
          ⬅ Quay lại
        </button>
        <button
          className="btn-primary"
          disabled={!bookingData.selectedSchedule}
          onClick={onNext}
        >
          Tiếp tục: Điền thông tin BN ➔
        </button>
      </div>
    </div>
  );
}
