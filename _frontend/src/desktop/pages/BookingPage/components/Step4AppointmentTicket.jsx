import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Step4AppointmentTicket({
  bookingSuccessResult,
  bookingData,
  ticketRef,
  onDownloadPdf,
  exportingPdf,
  onResetBooking,
}) {
  if (!bookingSuccessResult) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "48px",
          color: "#2e7d32",
          marginBottom: "8px",
        }}
      >
        ✓
      </div>
      <h2 style={{ color: "#2e7d32", margin: "0 0 8px 0" }}>
        ĐẶT LỊCH KHÁM THÀNH CÔNG!
      </h2>
      <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
        Vui lòng chụp lại màn hình hoặc lưu lại thông tin phiếu hẹn dưới đây:
      </p>

      <div className="ticket-container" ref={ticketRef}>
        <div className="ticket-header">
          <span style={{ fontWeight: 600, color: "#64748b" }}>
            MÃ LỊCH HẸN
          </span>
          <span className="ticket-id">{bookingSuccessResult.id}</span>
        </div>

        <div className="ticket-qr">
          <QRCodeCanvas
            value={bookingSuccessResult.id}
            size={168}
            level="M"
            marginSize={2}
            bgColor="#ffffff"
            fgColor="#1565c0"
            title={`Mã QR lịch hẹn ${bookingSuccessResult.id}`}
          />
          <p>
            Đưa mã QR này cho nhân viên quét tại quầy tiếp đón để
            check-in, không cần đọc mã lịch hẹn.
          </p>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Bệnh nhân:</span>
          <span className="ticket-value">
            {bookingData.patientName} ({bookingSuccessResult.patientId})
          </span>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Bác sĩ phụ trách:</span>
          <span className="ticket-value">
            {bookingSuccessResult.doctorId}
          </span>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Phòng khám chỉ định:</span>
          <span className="ticket-value">
            {bookingData.selectedSchedule?.roomId}
          </span>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Ngày khám:</span>
          <span className="ticket-value">
            {bookingSuccessResult.appointmentDate}
          </span>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Giờ hẹn dự kiến:</span>
          <span className="ticket-value">
            {bookingSuccessResult.appointmentTime}
          </span>
        </div>

        <div className="ticket-row">
          <span className="ticket-label">Trạng thái:</span>
          <span className="badge-status badge-available">
            {bookingSuccessResult.status}
          </span>
        </div>
      </div>

      <div className="button-row" style={{ justifyContent: "center" }}>
        <button
          className="btn-secondary"
          onClick={onDownloadPdf}
          disabled={exportingPdf}
        >
          {exportingPdf ? "Đang tạo PDF..." : "Tải Phiếu Hẹn (PDF)"}
        </button>
        <button className="btn-primary" onClick={onResetBooking}>
          Đặt Thêm Lịch Mới
        </button>
      </div>
    </div>
  );
}
