import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { formatVnd } from "../billingUtils.js";

export default function PaymentMethodsSection({
  selectedInvoice,
  paymentMethod,
  setPaymentMethod,
  totalAmount,
  amountGiven,
  setAmountGiven,
  isCashInsufficient,
  changeAmount,
  vnpayQrPayload,
  momoQrMode,
  setMomoQrMode,
  momoNativeQrPayload,
  momoVietQrPayload,
  cleanMomoOwner,
  vietQrPayload,
  clinicConfig,
  onEditPaymentConfig,
  isSubmitting,
  onPayment,
  onOpenReceipt,
}) {
  if (!selectedInvoice) return null;

  if (selectedInvoice.paymentStatus === "DaThanhToan") {
    return (
      <div
        style={{
          background: "#d1fae5",
          border: "1px solid #6ee7b7",
          borderRadius: "10px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h4 style={{ margin: "0 0 4px 0", color: "#065f46" }}>
            HÓA ĐƠN NÀY ĐÃ ĐƯỢC THANH TOÁN
          </h4>
          <div style={{ fontSize: "13px", color: "#047857" }}>
            Phương thức:{" "}
            <b>{selectedInvoice.paymentMethod || "Tiền mặt"}</b> • Thời gian:{" "}
            {selectedInvoice.paidAt
              ? new Date(selectedInvoice.paidAt).toLocaleString("vi-VN")
              : "Vừa xong"}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenReceipt}
          style={{ background: "#059669", borderColor: "#059669" }}
        >
          In Lại Biên Lai
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="payment-methods-title">
        <span>Phương Thức Thanh Toán:</span>
      </div>

      <div className="payment-methods-grid">
        {/* TIỀN MẶT */}
        <div
          className={`payment-method-card ${
            paymentMethod === "CASH" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("CASH")}
        >
          <div
            className="icon-wrap"
            style={{ background: "#dcfce7", color: "#15803d" }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
          </div>
          <span className="method-name">Tiền Mặt</span>
        </div>

        {/* VNPAY */}
        <div
          className={`payment-method-card vnpay ${
            paymentMethod === "VNPAY" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("VNPAY")}
        >
          <div
            className="icon-wrap"
            style={{ background: "#e0f2fe", color: "#005baa" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect width="24" height="24" rx="4" fill="#005baa" />
              <path
                d="M4 8l4 8 4-8"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 8h4a3 3 0 0 1 0 6h-4v2"
                stroke="#e11b22"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="method-name" style={{ color: "#005baa" }}>
            VNPAY-QR
          </span>
        </div>

        {/* VÍ MOMO */}
        <div
          className={`payment-method-card momo ${
            paymentMethod === "MOMO" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("MOMO")}
        >
          <div
            className="icon-wrap"
            style={{ background: "#fce7f3", color: "#a50064" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect width="24" height="24" rx="4" fill="#a50064" />
              <circle
                cx="12"
                cy="12"
                r="6"
                stroke="#fff"
                strokeWidth="2"
              />
              <path d="M9 12h6" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>
          <span className="method-name" style={{ color: "#a50064" }}>
            Ví MoMo
          </span>
        </div>

        {/* CHUYỂN KHOẢN (VIETQR) */}
        <div
          className={`payment-method-card ${
            paymentMethod === "BANK_TRANSFER" ? "active" : ""
          }`}
          onClick={() => setPaymentMethod("BANK_TRANSFER")}
        >
          <div
            className="icon-wrap"
            style={{ background: "#fef3c7", color: "#b45309" }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
            </svg>
          </div>
          <span className="method-name">VietQR / Bank</span>
        </div>
      </div>

      {/* NỘI DUNG CHI TIẾT TỪNG PHƯƠNG THỨC */}
      <div className="payment-detail-box">
        {/* 1. Tiền mặt */}
        {paymentMethod === "CASH" && (
          <div className="cash-calculator">
            <div className="cash-row">
              <label htmlFor="cash-given">Khách đưa:</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  id="cash-given"
                  type="number"
                  className="cash-input"
                  value={amountGiven}
                  onChange={(e) => setAmountGiven(e.target.value)}
                  min={totalAmount}
                />
                <span style={{ fontWeight: "700" }}>₫</span>
              </div>
            </div>

            <div className="quick-amount-chips">
              <span
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  alignSelf: "center",
                }}
              >
                Gợi ý nhanh:
              </span>
              <button
                type="button"
                className="chip-btn"
                onClick={() => setAmountGiven(String(totalAmount))}
              >
                Đúng số tiền ({formatVnd(totalAmount)})
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() =>
                  setAmountGiven(String(totalAmount + 50000))
                }
              >
                +50.000 ₫
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() =>
                  setAmountGiven(String(totalAmount + 100000))
                }
              >
                +100.000 ₫
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() =>
                  setAmountGiven(String(totalAmount + 200000))
                }
              >
                +200.000 ₫
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() =>
                  setAmountGiven(String(totalAmount + 500000))
                }
              >
                +500.000 ₫
              </button>
            </div>

            <div
              className="cash-row"
              style={{
                borderTop: "1px dashed #e2e8f0",
                paddingTop: "8px",
              }}
            >
              <label>Tiền thừa trả khách:</label>
              <span
                className={`change-amount-badge ${
                  isCashInsufficient ? "insufficient" : ""
                }`}
              >
                {isCashInsufficient
                  ? "Khách đưa chưa đủ tiền!"
                  : formatVnd(changeAmount)}
              </span>
            </div>
          </div>
        )}

        {/* 2. VNPay-QR */}
        {paymentMethod === "VNPAY" && (
          <div className="vnpay-payment-card">
            <div className="vnpay-qr-wrap">
              <QRCodeCanvas
                value={vnpayQrPayload}
                size={140}
                level="H"
                includeMargin
              />
              <span className="vnpay-qr-label">VNPAY-QR DYNAMIC</span>
            </div>

            <div className="vnpay-info">
              <div className="vnpay-header-logo">
                VN<span>PAY</span> <span>QR</span>
              </div>
              <div>
                <b>Điểm chấp nhận thanh toán:</b> PHÒNG KHÁM MEDIGO
              </div>
              <div>
                <b>Mã hóa đơn:</b> {selectedInvoice.id}
              </div>
              <div>
                <b>Số tiền:</b>{" "}
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    color: "#e11b22",
                  }}
                >
                  {formatVnd(totalAmount)}
                </span>
              </div>
              <div>
                <b>Nội dung chuyển khoản:</b>{" "}
                <span
                  style={{
                    background: "#ffffff",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  VNPAY {selectedInvoice.id}
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#0369a1",
                  marginTop: "4px",
                }}
              >
                Hướng dẫn: Bệnh nhân mở ứng dụng Ngân hàng (VCB,
                BIDV, Agribank, VietinBank...) hoặc Ví VNPAY, chọn
                "Quét QR" để thanh toán.
              </div>
            </div>
          </div>
        )}

        {/* 3. Ví MoMo */}
        {paymentMethod === "MOMO" && (
          <div className="momo-payment-card">
            <div className="momo-qr-wrap" style={{ padding: "8px" }}>
              {momoQrMode === "app" ? (
                <QRCodeCanvas
                  value={momoNativeQrPayload}
                  size={160}
                  level="M"
                  includeMargin
                  style={{ borderRadius: "6px", display: "block" }}
                />
              ) : (
                <img
                  src={momoVietQrPayload}
                  alt="Ví MoMo VietQR"
                  style={{
                    width: "160px",
                    height: "auto",
                    borderRadius: "6px",
                    display: "block",
                  }}
                />
              )}
              <span
                className="momo-qr-label"
                style={{ marginTop: "6px" }}
              >
                {momoQrMode === "app"
                  ? "VÍ MOMO • CHUYỂN TIỀN NHANH"
                  : "VÍ MOMO • NAPAS 24/7"}
              </span>
            </div>

            <div className="momo-info">
              <div className="momo-header-logo">
                ví <span>MoMo</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#059669",
                    background: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}
                >
                  Sẵn sàng nhận tiền
                </span>
                <button
                  type="button"
                  onClick={onEditPaymentConfig}
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 600,
                    color: "#a50064",
                    background: "#ffffff",
                    border: "1px solid #fbcfe8",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    marginLeft: "auto",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                  title="Thay đổi số điện thoại MoMo nhận tiền"
                >
                  Đổi số MoMo
                </button>
              </div>

              {/* Switch giữa App MoMo và App Ngân hàng */}
              <div className="momo-mode-switch">
                <button
                  type="button"
                  className={`momo-mode-btn ${momoQrMode === "app" ? "active" : ""}`}
                  onClick={() => setMomoQrMode("app")}
                >
                  Quét bằng App MoMo (Khuyên dùng)
                </button>
                <button
                  type="button"
                  className={`momo-mode-btn ${momoQrMode === "vietqr" ? "active" : ""}`}
                  onClick={() => setMomoQrMode("vietqr")}
                >
                  Quét bằng App Ngân hàng (VietQR)
                </button>
              </div>

              <div>
                <b>Tài khoản thụ hưởng:</b>{" "}
                {clinicConfig.momoOwnerName} ({cleanMomoOwner})
              </div>
              <div>
                <b>Số điện thoại MoMo:</b> {clinicConfig.momoPhone}
              </div>
              <div>
                <b>Số tiền:</b>{" "}
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    color: "#a50064",
                  }}
                >
                  {formatVnd(totalAmount)}
                </span>
              </div>
              <div>
                <b>Lời nhắn chuyển tiền:</b>{" "}
                <span
                  style={{
                    background: "#ffffff",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "1px solid #fbcfe8",
                    fontWeight: "700",
                  }}
                >
                  MOMO {selectedInvoice.id}
                </span>
              </div>
              <div
                style={{
                  fontSize: "11.5px",
                  color: "#831843",
                  marginTop: "4px",
                  lineHeight: "1.4",
                }}
              >
                {momoQrMode === "app" ? (
                  <>
                    <b>Hướng dẫn:</b> Bệnh nhân mở ứng dụng{" "}
                    <b>Ví MoMo</b> trên điện thoại &gt; chọn{" "}
                    <b>&quot;Quét mã&quot;</b> ở góc trên màn hình để
                    chuyển viện phí trực tiếp (chuẩn ví-sang-ví không
                    lỗi).
                  </>
                ) : (
                  <>
                    <b>Hướng dẫn:</b> Bệnh nhân mở{" "}
                    <b>App Ngân hàng bất kỳ</b> (VCB, MB, BIDV,
                    Agribank...) &gt; chọn <b>&quot;Quét QR&quot;</b>{" "}
                    để chuyển liên ngân hàng Napas 24/7 vào Ví MoMo.
                  </>
                )}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  marginTop: "2px",
                  background: "#ffffff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px dashed #fbcfe8",
                  lineHeight: "1.4",
                }}
              >
                <b>Lưu ý:</b> Nếu app MoMo thông báo <i>&quot;Ví chưa xác thực&quot;</i>, bấm nút <b>&quot;Đổi số MoMo&quot;</b> ở góc trên để đổi sang số MoMo chính chủ đã hoàn thành eKYC/CCCD.
              </div>
            </div>
          </div>
        )}

        {/* 4. Chuyển khoản VietQR */}
        {paymentMethod === "BANK_TRANSFER" && (
          <div
            className="vnpay-payment-card"
            style={{ background: "#f8fafc", borderColor: "#cbd5e1" }}
          >
            <div className="vnpay-qr-wrap" style={{ padding: "6px" }}>
              <img
                src={vietQrPayload}
                alt="VietQR Napas 24/7"
                style={{
                  width: "160px",
                  height: "auto",
                  borderRadius: "6px",
                  display: "block",
                }}
              />
              <span
                className="vnpay-qr-label"
                style={{ color: "#1e3a8a", marginTop: "4px" }}
              >
                NAPAS 24/7 • VIETQR
              </span>
            </div>
            <div className="vnpay-info" style={{ color: "#1e293b" }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#1e3a8a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Chuyển khoản Ngân Hàng (Napas 24/7)</span>
                <button
                  type="button"
                  onClick={onEditPaymentConfig}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#1e3a8a",
                    background: "#ffffff",
                    border: "1px solid #bfdbfe",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Đổi tài khoản
                </button>
              </div>
              <div>
                <b>Ngân hàng:</b> {clinicConfig.bankName}
              </div>
              <div>
                <b>Số tài khoản:</b> {clinicConfig.bankAccount}
              </div>
              <div>
                <b>Chủ tài khoản:</b> {clinicConfig.bankOwnerName}
              </div>
              <div>
                <b>Số tiền:</b>{" "}
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    color: "#0f766e",
                  }}
                >
                  {formatVnd(totalAmount)}
                </span>
              </div>
              <div>
                <b>Nội dung:</b> MEDIGO {selectedInvoice.id}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NÚT HOÀN TẤT THANH TOÁN */}
      <button
        type="button"
        className="btn-pay-submit"
        onClick={onPayment}
        disabled={
          isSubmitting ||
          (paymentMethod === "CASH" && isCashInsufficient)
        }
      >
        {isSubmitting ? (
          "Đang xử lý giao dịch..."
        ) : (
          <>
            Xác Nhận Đã Thu {formatVnd(totalAmount)} (
            {paymentMethod === "VNPAY"
              ? "VNPAY"
              : paymentMethod === "MOMO"
                ? "MoMo"
                : paymentMethod === "BANK_TRANSFER"
                  ? "VietQR"
                  : "Tiền mặt"}
            )
          </>
        )}
      </button>
    </>
  );
}
