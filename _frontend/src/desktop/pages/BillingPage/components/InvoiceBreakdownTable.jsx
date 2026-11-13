import React from "react";
import { formatVnd } from "../billingUtils.js";

export default function InvoiceBreakdownTable({
  selectedInvoice,
  loadingDetails,
}) {
  if (!selectedInvoice) return null;

  return (
    <>
      {loadingDetails ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>
          Đang nạp chi tiết các mục thu...
        </p>
      ) : (
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Khoản Mục</th>
              <th>Phân Loại</th>
              <th style={{ textAlign: "center" }}>Số Lượng</th>
              <th style={{ textAlign: "right" }}>Đơn Giá</th>
              <th style={{ textAlign: "right" }}>Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            {selectedInvoice.details && selectedInvoice.details.length > 0 ? (
              selectedInvoice.details.map((row, idx) => (
                <tr key={row.id || idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <b>{row.itemName}</b>
                    {row.note && (
                      <div style={{ fontSize: "11px", color: "#64748b" }}>
                        {row.note}
                      </div>
                    )}
                  </td>
                  <td>
                    <span
                      className={`item-type-tag ${
                        row.itemType === "PhiKham"
                          ? "phikham"
                          : row.itemType === "DichVu"
                            ? "dichvu"
                            : "thuoc"
                      }`}
                    >
                      {row.itemType === "PhiKham"
                        ? "Công khám"
                        : row.itemType === "DichVu"
                          ? "Cận lâm sàng"
                          : "Thuốc"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>{row.quantity}</td>
                  <td style={{ textAlign: "right" }}>
                    {formatVnd(row.unitPrice)}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontWeight: "600",
                      color: "#0f766e",
                    }}
                  >
                    {formatVnd(row.totalPrice)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", color: "#94a3b8" }}
                >
                  Chưa có mục thu chi tiết (được tính gộp theo bệnh án).
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Thanh tổng cộng */}
      <div className="grand-total-bar">
        <div className="label">TỔNG TIỀN PHẢI THANH TOÁN:</div>
        <div className="amount">{formatVnd(selectedInvoice.total)}</div>
      </div>
    </>
  );
}
