import React from "react";

export default function AppointmentLookupBox({
  lookupAppointmentId,
  setLookupAppointmentId,
  lookupLoading,
  onLookupAppointment,
  onOpenScan,
  scanNotice,
  setScanNotice,
}) {
  return (
    <>
      <div className="lookup-box">
        <label
          style={{ fontSize: "13px", fontWeight: "700", color: "#1e40af" }}
        >
          Tra Cứu Lịch Hẹn Đặt Trước:
        </label>
        <div className="lookup-input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập mã lịch hẹn (Ví dụ: LH002)"
            value={lookupAppointmentId}
            onChange={(e) => setLookupAppointmentId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLookupAppointment()}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onLookupAppointment}
            disabled={lookupLoading}
          >
            {lookupLoading ? "Đang tìm..." : "Tìm kiếm"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenScan}
            disabled={lookupLoading}
          >
            Quét QR
          </button>
        </div>
        <p className="lookup-hint">
          Nhập mã lịch hẹn (ví dụ LH003) hoặc bấm “Quét QR” để quét phiếu
          hẹn bằng webcam — không cần nhớ mã.
        </p>
      </div>

      {scanNotice && (
        <div
          className={`scan-notice scan-notice-${scanNotice.tone}`}
          role="status"
        >
          <span>{scanNotice.text}</span>
          <button
            type="button"
            aria-label="Đóng thông báo"
            onClick={() => setScanNotice(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
