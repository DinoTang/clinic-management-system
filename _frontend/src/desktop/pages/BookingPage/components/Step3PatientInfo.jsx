import React from "react";

export default function Step3PatientInfo({
  bookingData,
  setBookingData,
  suggestedSymptoms,
  onToggleSymptom,
  loading,
  onBack,
  onConfirm,
}) {
  return (
    <div>
      <div className="form-group">
        <div>
          <label className="input-label">Họ và Tên Bệnh Nhân *</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ví dụ: Nguyễn Văn A"
            value={bookingData.patientName}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                patientName: e.target.value,
              })
            }
          />
        </div>

        <div className="form-row">
          <div>
            <label className="input-label">Số Điện Thoại Liên Hệ *</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Ví dụ: 0912345678"
              value={bookingData.phoneNumber}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="input-label">Mã Bệnh Nhân (Nếu có)</label>
            <input
              type="text"
              className="form-control"
              value={bookingData.patientId}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  patientId: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <label className="input-label" style={{ marginBottom: 0 }}>
              Triệu Chứng / Lý Do Khám
            </label>
            <span
              style={{
                fontSize: "12px",
                color: "#0284c7",
                fontWeight: 500,
              }}
            >
              {bookingData.specialtyId
                ? "Gợi ý triệu chứng theo khoa:"
                : "Gợi ý triệu chứng phổ biến:"}
            </span>
          </div>

          {suggestedSymptoms && suggestedSymptoms.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "8px",
              }}
            >
              {suggestedSymptoms.map((symp, idx) => {
                const currentText = (bookingData.reason || "").toLowerCase();
                const isSelected = currentText.includes(symp.toLowerCase());
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onToggleSymptom(symp)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "16px",
                      fontSize: "12px",
                      border: isSelected
                        ? "1px solid #0284c7"
                        : "1px solid #cbd5e1",
                      backgroundColor: isSelected ? "#e0f2fe" : "#f8fafc",
                      color: isSelected ? "#0369a1" : "#475569",
                      cursor: "pointer",
                      fontWeight: isSelected ? "600" : "normal",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {symp}
                  </button>
                );
              })}
            </div>
          )}

          <textarea
            className="form-control"
            rows="3"
            placeholder="Mô tả tóm tắt tình trạng khó chịu hoặc chọn gợi ý ở trên..."
            value={bookingData.reason}
            onChange={(e) =>
              setBookingData({ ...bookingData, reason: e.target.value })
            }
          ></textarea>
        </div>
      </div>

      <div className="button-row">
        <button className="btn-secondary" onClick={onBack}>
          ⬅ Quay lại
        </button>
        <button
          className="btn-primary"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Đang gửi đăng ký..." : "Xác Nhận Đặt Lịch ➔"}
        </button>
      </div>
    </div>
  );
}
