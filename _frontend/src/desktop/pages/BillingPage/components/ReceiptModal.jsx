import React from "react";
import { formatVnd, numberToVietnameseWords } from "../billingUtils.js";

export default function ReceiptModal({
  receiptInvoice,
  clinicConfig,
  loggedInStaffName,
  currentStaffId,
  onClose,
}) {
  if (!receiptInvoice) return null;

  return (
    <div className="receipt-modal-overlay">
      <div className="receipt-modal-card">
        <div className="receipt-header">
          <div className="receipt-clinic-name">
            {clinicConfig.clinicName}
          </div>
          <div className="receipt-clinic-sub">
            Địa chỉ: {clinicConfig.clinicAddress} • Hotline:{" "}
            {clinicConfig.hotline}
          </div>
          <div className="receipt-title">HÓA ĐƠN THU TIỀN VIỆN PHÍ</div>
          <div className="receipt-code">
            Mã HĐ: <b>{receiptInvoice.id}</b> • Bệnh án:{" "}
            <b>{receiptInvoice.medicalRecordId}</b>
          </div>
        </div>

        <div className="receipt-body">
          <div className="receipt-meta-grid">
            <div>
              Họ tên bệnh nhân:{" "}
              <b>
                {receiptInvoice.patientMeta?.patientName || "Nguyễn Văn A"}
              </b>
            </div>
            <div>
              SĐT: <b>{receiptInvoice.patientMeta?.patientPhone || "—"}</b>
            </div>
            <div>
              Bác sĩ khám:{" "}
              <b>{receiptInvoice.patientMeta?.doctorId || "BS001"}</b>
            </div>
            <div>
              Phòng khám:{" "}
              <b>{receiptInvoice.patientMeta?.roomId || "PK01"}</b>
            </div>
            <div>
              Thời gian lập:{" "}
              <b>
                {receiptInvoice.createdAt
                  ? new Date(receiptInvoice.createdAt).toLocaleString(
                      "vi-VN",
                    )
                  : new Date().toLocaleString("vi-VN")}
              </b>
            </div>
            <div>
              Thu ngân:{" "}
              <b>
                {loggedInStaffName
                  ? `${loggedInStaffName} (${currentStaffId})`
                  : currentStaffId || "N/A"}
              </b>
            </div>
          </div>

          {/* Bảng mục thu trên biên lai */}
          <table className="receipt-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Nội Dung Thu</th>
                <th style={{ textAlign: "center" }}>Số Lượng</th>
                <th style={{ textAlign: "right" }}>Đơn Giá</th>
                <th style={{ textAlign: "right" }}>Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              {receiptInvoice.details &&
              receiptInvoice.details.length > 0 ? (
                receiptInvoice.details.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{item.itemName}</td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatVnd(item.unitPrice)}
                    </td>
                    <td style={{ textAlign: "right", fontWeight: "600" }}>
                      {formatVnd(item.totalPrice)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>1</td>
                  <td>Tổng viện phí (Công khám, xét nghiệm & thuốc)</td>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "right" }}>
                    {formatVnd(receiptInvoice.total)}
                  </td>
                  <td style={{ textAlign: "right", fontWeight: "600" }}>
                    {formatVnd(receiptInvoice.total)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="receipt-total-section">
            <div className="receipt-total-row grand">
              <span>TỔNG CỘNG TIỀN PHẢI THU:</span>
              <span>{formatVnd(receiptInvoice.total)}</span>
            </div>
            <div
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "#475569",
              }}
            >
              (Bằng chữ: {numberToVietnameseWords(receiptInvoice.total)})
            </div>
            <div className="receipt-total-row" style={{ marginTop: "4px" }}>
              <span>Phương thức thanh toán:</span>
              <b>
                {receiptInvoice.paymentMethod === "VNPAY"
                  ? "VNPAY-QR"
                  : receiptInvoice.paymentMethod === "MOMO"
                    ? "Ví MoMo"
                    : receiptInvoice.paymentMethod === "ChuyenKhoan" ||
                        receiptInvoice.paymentMethod === "BANK_TRANSFER"
                      ? "Chuyển khoản (VietQR)"
                      : "Tiền mặt"}
              </b>
            </div>
          </div>

          <div className="receipt-stamp-box">
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              * Lưu ý: Quý khách vui lòng giữ lại hóa đơn để tái khám và đối
              chiếu.
            </div>
            <div className="receipt-paid-seal">
              <span>ĐÃ THANH TOÁN</span>
              <span style={{ fontSize: "10px", fontWeight: "normal" }}>
                MEDIGO CLINIC
              </span>
            </div>
          </div>
        </div>

        <div className="receipt-footer-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              window.print();
            }}
          >
            In Hóa Đơn
          </button>
        </div>
      </div>
    </div>
  );
}
